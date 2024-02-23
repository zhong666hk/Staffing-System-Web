<template>
  <p>
    <a-space>
      <a-button type="primary" @click="handleQuery()">刷新</a-button>
      <a-button type="primary" @click="onAdd">新增</a-button>
    </a-space>
  </p>
  <a-table :columns="columns"
           :dataSource="employees"
           :loading="loading"
           :pagination="pagination"
           @change="handleTableChange">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'isDelete'">
        <a-space>
          <span v-if="record.isDelete===0">在岗</span>
          <span v-else>离职</span>
        </a-space>
      </template>

      <template v-if="column.dataIndex === 'operation'">
        <a-space>
          <a-popconfirm
              cancel-text="取消"
              ok-text="确认"
              title="删除后不可恢复，确认删除?" @confirm="onDelete(record)">
            <a style="color: red">删除</a>
          </a-popconfirm>
          <a @click="onEdit(record)">编辑</a>
          <a @click="changePassword(record)">修改密码</a>

        </a-space>
      </template>
    </template>
  </a-table>
  <a-modal v-model:open="open" cancel-text="取消" ok-text="确认"
           title="员工" @ok="handleOk">
    <a-form :label-col="{span: 4}" :model="employee" :wrapper-col="{ span: 20 }">
      <a-form-item label="工号">
        <a-input v-model:value="employee.workId" />
      </a-form-item>
      <a-form-item label="姓名">
        <a-input v-model:value="employee.name" />
      </a-form-item>
      <a-form-item label="手机号">
        <a-input v-model:value="employee.mobile"/>
      </a-form-item>
      <a-form-item label="是否离职">
        <a-radio-group v-model:value="employee.isDelete">
          <a-radio :value=0>在岗</a-radio>
          <a-radio :value=1>离职</a-radio>
        </a-radio-group>
      </a-form-item>

    </a-form>
  </a-modal>

  <a-modal v-model:open="open2" cancel-text="取消" ok-text="确认"
           title="修改密码" @ok="handleOk2">
    <a-form :label-col="{span: 4}" :model="employee" :wrapper-col="{ span: 20 }"
            @validate="handleValidate"
            autocomplete="off">
      <a-form-item label="旧密码"
                   name="oldPassword">
        <a-input-password v-model:value="resetPassword.oldPassword"/>
      </a-form-item>
      <a-form-item label="新密码"
                   name="newPassword">
        <a-input-password v-model:value="resetPassword.newPassword"/>
      </a-form-item>
      <a-form-item label="确认新密码"
                   name="newPasswordAgain">
        <a-input-password v-model:value="resetPassword.newPasswordAgain"/>
      </a-form-item>
    </a-form>
  </a-modal>

</template>

<script>
import {defineComponent, onMounted, ref} from 'vue';
import {notification} from "ant-design-vue";
import {deleteEmployee, getEmployee, resetEmployeePassword, saveEmployee} from "@/API";

export default defineComponent({
  name: "employee-view",
  setup() {
    const open = ref(false);
    const open2 = ref(false);
    let employee = ref({
      id: undefined,
      mobile: undefined,
      password: undefined,
      createTime: undefined,
      isDelete: undefined,
      name: undefined,
      workId: undefined,
    });
    const resetPassword=ref({
      id: undefined,
      newPassword: undefined,
      newPasswordAgain: undefined,
      oldPassword: undefined,
    })
    const employees = ref([]);
    // 分页的三个属性名是固定的
    const pagination = ref({
      total: 0,
      current: 1,
      pageSize: 10,
    });
    let loading = ref(false);
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '工号',
        dataIndex: 'workId',
        key: 'workId',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
      },
      {
        title: '状态',
        dataIndex: 'isDelete',
        key: 'isDelete',
      },
      {
        title: '操作',
        dataIndex: 'operation'
      }
    ];

    const onAdd = () => {
      employee.value = {};
      open.value = true;
    };

    const onEdit = (record) => {
      employee.value = window.Tool.copy(record);
      open.value = true;
    };
    const changePassword=(record) =>{
      employee.value = window.Tool.copy(record);
      resetPassword.value.id=employee.value.id;
      open2.value=true;
    }

    const onDelete = (record) => {
      deleteEmployee(record).then((response) => {
        if (response.code === 200) {
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
    //编辑信息确认
    const handleOk = () => {
      saveEmployee(employee.value).then((response) => {
        if (response.code === 200) {
          notification.success({description: response.message});
          open.value = false;
          handleQuery({
            page: pagination.value.current,
            size: pagination.value.pageSize
          });
        } else {
          notification.error({description: response.message});
        }
      });
    };
    //修改密码确认
    const handleOk2 = () => {
      resetEmployeePassword(resetPassword.value).then((response) => {
        if (response.code === 200) {
          notification.success({description: response.message});
          open2.value = false;
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
      getEmployee(param.page, param.size).then((response) => {
        loading.value = false;
        if (response.code === 200) {
          employees.value = response.data.records;
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
    const isUsable=ref(false);

    /**
     * 每次 校验都会触发一次
     * @param name
     * @param status
     * @param errorMsgs
     */
    const handleValidate = (name,status,errorMsgs) => {
      console.log("检查对象",name,status,errorMsgs)
      if (status){
        isUsable.value=false;
      }else {
        isUsable.value=true;
      }
    };

    return {
      employee,
      open,
      open2,
      employees,
      pagination,
      columns,
      handleTableChange,
      handleQuery,
      loading,
      onAdd,
      handleOk,
      handleOk2,
      onEdit,
      changePassword,
      onDelete,
      resetPassword,
      handleValidate,
      isUsable,
    };
  },
});
</script>
