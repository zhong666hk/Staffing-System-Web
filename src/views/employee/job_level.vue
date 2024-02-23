<template>
  <p>
    <a-space>
      <a-button type="primary" @click="handleQuery()">刷新</a-button>
      <a-button type="primary" @click="onAdd">新增</a-button>
    </a-space>
  </p>
  <a-table :dataSource="jobLevels"
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
    <a-form :model="jobLevel" :label-col="{span: 4}" :wrapper-col="{ span: 20 }">
      <a-form-item label="职位名称">
        <position-select-view width="200px" v-model="jobLevel.name"></position-select-view>
      </a-form-item>
      <a-form-item label="职位等级">
        <a-input v-model:value="jobLevel.titleLevel" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import {notification} from "ant-design-vue";
import {deleteJobLevel, getJobLevel, saveJobLevel} from "@/API";
import PositionSelectView from "@/components/Position-select-view.vue";

export default defineComponent({
  name: "jobLevel-view",
  components: {PositionSelectView},
  setup() {
    const visible = ref(false);
    let jobLevel = ref({
      id: undefined,
      name: undefined,
      titleLevel: undefined,
      createTime: undefined,
    });
    const jobLevels = ref([]);
    // 分页的三个属性名是固定的
    const pagination = ref({
      total: 0,
      current: 1,
      pageSize: 10,
    });
    let loading = ref(false);
    const columns = [
    {
      title: '职位名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '级别(\'正高级\', \'副高级\', \'中级\', \'初级\', \'员级\')',
      dataIndex: 'titleLevel',
      key: 'titleLevel',
    },
    {
      title: '操作',
      dataIndex: 'operation'
    }
    ];

    const onAdd = () => {
      jobLevel.value = {};
      visible.value = true;
    };

    const onEdit = (record) => {
      jobLevel.value = window.Tool.copy(record);
      visible.value = true;
    };

    const onDelete = (record) => {
      deleteJobLevel(record).then((response) => {
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
      saveJobLevel(jobLevel.value).then((response) => {
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
      getJobLevel(param.page, param.size).then((response) => {
        loading.value = false;
        if (response.code===200) {
          jobLevels.value = response.data.records;
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
      jobLevel,
      visible,
      jobLevels,
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
