<template>
  <p>
    <a-space>
      <a-button type="primary" @click="handleQuery()">刷新</a-button>
      <a-button type="primary" @click="onAdd">新增</a-button>
    </a-space>
  </p>
  <a-table :dataSource="employeeInformations"
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
          <a @click="onEdit(record)">查看详细信息</a>
        </a-space>
      </template>

    </template>
  </a-table>
  <a-modal v-model:visible="visible" title="" @ok="handleOk"
           ok-text="确认" cancel-text="取消">
    <a-form :model="employeeInformation" :label-col="{span: 4}" :wrapper-col="{ span: 18 }">
      <a-form-item label="员工姓名" name="name">
        <span>{{employeeInformation.name}}</span>
      </a-form-item>
      <a-form-item label="性别" name="gender">
        <span v-if="employeeInformation.gender==='1'">男</span>
        <span v-else>女</span>
      </a-form-item>
      <a-form-item label="出生日期" name="birthday">
        <a-date-picker v-model:value="employeeInformation.birthday" valueFormat="YYYY-MM-DD" placeholder="请选择日期" />
      </a-form-item>
      <a-form-item label="身份证号" name="idCard"
                   :rules="[{ required: true, message: '请输入正确的身份证号!', pattern:/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,trigger: 'blur'}]"
      >
        <a-input v-model:value="employeeInformation.idCard" :bordered="false" />
      </a-form-item>
      <a-form-item label="民族" name="nationName">
<!--        <a-input v-model:value="employeeInformation.nationId" />-->
        <NationSelectView width="200px" v-model="employeeInformation.nationName"></NationSelectView>
      </a-form-item>
      <a-form-item label="籍贯" name="nativePlace">
        <a-input v-model:value="employeeInformation.nativePlace" />
      </a-form-item>
      <a-form-item label="邮箱" name="email"
                   :rules="[{ required: true, message: '请输入正确的邮箱!', pattern:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,trigger: 'blur'}]"
      >
        <a-input v-model:value="employeeInformation.email" :bordered="false" />
      </a-form-item>
      <a-form-item label="电话号码" name="phone"
                   :rules="[{ required: true, message: '请输入正确的手机号!', pattern:/^(^\d{11}$)$/,trigger: 'blur'}]"
      >
        <a-input v-model:value="employeeInformation.phone" :bordered="false" />
      </a-form-item>
      <a-form-item label="联系地址" name="address">
        <a-input v-model:value="employeeInformation.address" :bordered="false" />
      </a-form-item>
      <a-form-item label="所属部门" name="departmentName">
<!--        <a-input v-model:value="employeeInformation.departmentId" />-->
        <DepartmentSelectView width="200px" v-model="employeeInformation.departmentName"></DepartmentSelectView>
      </a-form-item>
      <a-form-item label="职称级别" name="jobLevelName">
<!--        <a-input v-model:value="employeeInformation.jobLevelId" />-->
        <JobLevelSelectView width="200px" v-model="employeeInformation.jobLevelName"></JobLevelSelectView>
      </a-form-item>
      <a-form-item label="职位ID" name="posName">
<!--        <a-input v-model:value="employeeInformation.posId" />-->
        <PositionSelectView width="200px" v-model="employeeInformation.posName"></PositionSelectView>
      </a-form-item>
      <a-form-item label="最高学历" name="tiptopDegree">
        <a-input v-model:value="employeeInformation.tiptopDegree" :bordered="false" />
      </a-form-item>
      <a-form-item label="所属专业" name="specialty">
        <a-input v-model:value="employeeInformation.specialty" :bordered="false" />
      </a-form-item>
      <a-form-item label="毕业院校" name="school">
        <a-input v-model:value="employeeInformation.school" :bordered="false" />
      </a-form-item>
      <a-form-item label="入职日期" name="beginDate">
        <a-date-picker v-model:value="employeeInformation.beginDate" valueFormat="YYYY-MM-DD" placeholder="请选择日期" />
      </a-form-item>
      <a-form-item label="在职状态" name="workState">
        <a-radio-group v-model:value="employeeInformation.workState" name="workState">
          <a-radio value="1">在职</a-radio>
          <a-radio value="2">离职</a-radio>
        </a-radio-group>
      </a-form-item>
<!--      <a-form-item label="工号" name="workId">-->
<!--        <a-input v-model:value="employeeInformation.workId" />-->
<!--      </a-form-item>-->
      <a-form-item label="合同期限" name="contractTerm">
        <a-input v-model:value="employeeInformation.contractTerm" :bordered="false" />
      </a-form-item>
      <a-form-item label="转正日期" name="conversionTime">
        <a-date-picker v-model:value="employeeInformation.conversionTime" valueFormat="YYYY-MM-DD" placeholder="请选择日期" />
      </a-form-item>
      <a-form-item label="离职日期" name="notWorkDate">
        <a-date-picker v-model:value="employeeInformation.notWorkDate" valueFormat="YYYY-MM-DD" placeholder="请选择日期" />
      </a-form-item>
      <a-form-item label="合同起始日期" name="beginContract">
        <a-date-picker v-model:value="employeeInformation.beginContract" valueFormat="YYYY-MM-DD" placeholder="请选择日期" />
      </a-form-item>
      <a-form-item label="合同终止日期" name="endContract">
        <a-date-picker v-model:value="employeeInformation.endContract" valueFormat="YYYY-MM-DD" placeholder="请选择日期" />
      </a-form-item>
      <a-form-item label="工龄" name="workAge">
        <a-input v-model:value="employeeInformation.workAge" :bordered="false"/>
      </a-form-item>
<!--      <a-form-item label="员工id" name="employeeId">-->
<!--        <a-input v-model:value="employeeInformation.employeeId" />-->
<!--      </a-form-item>-->
    </a-form>
  </a-modal>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import {notification} from "ant-design-vue";
import {deleteEmployeeInformation, getEmployeeInformation, saveEmployeeInformation} from "@/API";
import DepartmentSelectView from "@/components/Department-select-view.vue";
import NationSelectView from "@/components/Nation-select-view.vue";
import PositionSelectView from "@/components/Position-select-view.vue";
import JobLevelSelectView from "@/components/JobLevel-select-view.vue";
export default defineComponent({
  name: "employeeInformation-view",
  components: {JobLevelSelectView, PositionSelectView, NationSelectView, DepartmentSelectView},
  setup() {
    const visible = ref(false);
    let employeeInformation = ref({
      id: undefined,
      name: undefined,
      gender: undefined,
      birthday: undefined,
      idCard: undefined,
      nationName: undefined,
      nativePlace: undefined,
      email: undefined,
      phone: undefined,
      address: undefined,
      departmentName: undefined,
      jobLevelName: undefined,
      posName: undefined,
      tiptopDegree: undefined,
      specialty: undefined,
      school: undefined,
      beginDate: undefined,
      workState: undefined,
      workId: undefined,
      contractTerm: undefined,
      conversionTime: undefined,
      notWorkDate: undefined,
      beginContract: undefined,
      endContract: undefined,
      workAge: undefined,
      employeeId: undefined,
      createTime: undefined,
      updateTime: undefined,
    });
    const employeeInformations = ref([]);
    // 分页的三个属性名是固定的
    const pagination = ref({
      total: 0,
      current: 1,
      pageSize: 10,
    });
    let loading = ref(false);
    const columns = [
    {
      title: '工号',
      dataIndex: 'workId',
      key: 'workId',
    },
    {
      title: '员工姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别 1为男 2为女',
      dataIndex: 'gender',
      key: 'gender',
      customRender:function (text){
        if(text.value ==='1'){
          return "男";
        }else{
          return "女";
        }
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '联系地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '所属部门',
      dataIndex: 'departmentName',
      key: 'departmentName',
    },
    {
      title: '工龄',
      dataIndex: 'workAge',
      key: 'workAge',
    },
    {
      title: '操作',
      dataIndex: 'operation'
    }
    ];

    const onAdd = () => {
      employeeInformation.value = {};
      visible.value = true;
    };

    const onEdit = (record) => {
      employeeInformation.value = window.Tool.copy(record);
      visible.value = true;
    };

    const onDelete = (record) => {
      deleteEmployeeInformation(record).then((response) => {
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
      saveEmployeeInformation( employeeInformation.value).then((response) => {
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
      getEmployeeInformation(param.page, param.size).then((response) => {
        loading.value = false;
        if (response.code===200) {
          employeeInformations.value = response.data.records;
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
      employeeInformation,
      visible,
      employeeInformations,
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
