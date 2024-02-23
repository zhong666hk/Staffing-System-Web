<template>
  <p>
    <a-space>
      <a-button type="primary" @click="handleQuery()">刷新</a-button>
      <a-button type="primary" @click="onAdd">新增</a-button>
    </a-space>
  </p>
  <a-table :dataSource="departments"
           :columns="columns"
           :pagination="pagination"
           @change="handleTableChange"
           :loading="loading">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <a-space>
          <a-popconfirm
              title="删除后不可恢复，确认删除?"
              @confirm="onDelete(record)"
              ok-text="确认" cancel-text="取消">
            <a style="color: red">删除</a>
          </a-popconfirm>
          <a @click="onEdit(record)">编辑</a>
        </a-space>
      </template>
    </template>
  </a-table>
  <a-modal v-model:visible="visible" title="" @ok="handleOk"
           ok-text="确认" cancel-text="取消">
    <a-form :model="department" :label-col="{span: 6}" :wrapper-col="{ span: 16 }">
      <a-form-item label="部门名称">
        <a-input v-model:value="department.name" />
      </a-form-item>
      <a-form-item label="上司部门名称">
        <department-select-view width="200px" v-model="department.parentDepartment"></department-select-view>
      </a-form-item>
      <a-form-item label="是否是父部门">
        <a-radio-group v-model:value="department.isparent">
          <a-radio :value=0>是</a-radio>
          <a-radio :value=1>否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="部门总人数">
        <a-input v-model:value="department.count" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import {notification} from "ant-design-vue";
import {deleteDepartment, getDepartment, saveDepartment} from "@/API";
import DepartmentSelectView from "@/components/Department-select-view.vue";

export default defineComponent({
  name: "department-view",
  components: { DepartmentSelectView},
  setup() {
    const visible = ref(false);
    let department = ref({
      id: undefined,
      updateTime: undefined,
      createTime: undefined,
      name: undefined,
      parentDepartment: undefined,
      isparent: undefined,
      count: undefined,
    });
    const departments = ref([]);
    // 分页的三个属性名是固定的
    const pagination = ref({
      total: 0,
      current: 1,
      pageSize: 10,
    });
    let loading = ref(false);
    const columns = [
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '上司部门',
      dataIndex: 'parentDepartment',
      key: 'parentDepartment',
    },
    {
      title: '是否是父部门',
      dataIndex: 'isparent',
      key: 'isparent',
    },
    {
      title: '部门总人数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '操作',
      dataIndex: 'operation'
    }
    ];

    const onAdd = () => {
      department.value = {};
      visible.value = true;
    };

    const onEdit = (record) => {
      department.value = window.Tool.copy(record);
      visible.value = true;
    };

    const onDelete = (record) => {
      deleteDepartment(record).then((response) => {
        if (response.code===200) {
          notification.success({description: response.message});
          handleQuery({
            page: pagination.value.current,
            size: pagination.value.pageSize,
          });
        } else {
          notification.error({description: response.message});
        }
      });
    };

    const handleOk = () => {
      saveDepartment(department.value).then((response) => {
        if (response.code===200) {
          notification.success({description: response.message});
          visible.value = false;
          handleQuery({
            page: pagination.value.current,
            size: pagination.value.pageSize
          });
        } else {
          notification.error({description: response.message});
        }
      });
    };

    const handleQuery = (param) => {
      if (!param) {
        param = {
          page: 1,
          size: pagination.value.pageSize
        };
      }
      loading.value = true;
      getDepartment(param.page, param.size).then((response) => {
        loading.value = false;
        if (response.code===200) {
          departments.value = response.data.records;
          // 设置分页控件的值
          pagination.value.current = param.page;
          pagination.value.total = response.data.total;
        } else {
          notification.error({description: response.message});
        }
      });
    };

    const handleTableChange = (page) => {
      // console.log("看看自带的分页参数都有啥：" + JSON.stringify(page));
      pagination.value.pageSize = page.pageSize;
      handleQuery({
        page: page.current,
        size: page.pageSize
      });
    };

    onMounted(() => {
      handleQuery({
        page: 1,
        size: pagination.value.pageSize
      });
    });

    return {
      department,
      visible,
      departments,
      pagination,
      columns,
      handleTableChange,
      handleQuery,
      loading,
      onAdd,
      handleOk,
      onEdit,
      onDelete
    };
  },
});
</script>
