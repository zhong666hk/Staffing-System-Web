<template>
  <p>
    <a-space>
      <a-button type="primary" @click="handleQuery()">刷新</a-button>
      <a-button type="primary" @click="onAdd">新增</a-button>
    </a-space>
  </p>
  <a-table :dataSource="resumes"
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
          <a @click="approve(record)">审批入职</a>
        </a-space>
      </template>
    </template>
  </a-table>
  <a-modal v-model:visible="visible" title="简历" @ok="handleOk"
           ok-text="确认" cancel-text="取消">
    <a-form :model="resume" :label-col="{span: 4}" :wrapper-col="{ span: 20 }">
      <a-form-item label="员工姓名">
        <a-input v-model:value="resume.name" />
      </a-form-item>
      <a-form-item label="性别:">
        <a-radio-group v-model:value="resume.gender" name="genderGroup">
          <a-radio value="1">男</a-radio>
          <a-radio value="2">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="出生日期">
        <a-date-picker v-model:value="resume.birthday" valueFormat="YYYY-MM-DD" placeholder="请选择日期" />
      </a-form-item>
      <a-form-item label="身份证号">
        <a-input v-model:value="resume.idCard" />
      </a-form-item>
      <a-form-item label="民族">
        <nation-select-view v-model="resume.nationName"></nation-select-view>
      </a-form-item>
      <a-form-item label="籍贯">
        <a-input v-model:value="resume.nativePlace" />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model:value="resume.email" />
      </a-form-item>
      <a-form-item label="电话号码">
        <a-input v-model:value="resume.phone" />
      </a-form-item>
      <a-form-item label="联系地址">
        <a-input v-model:value="resume.address" />
      </a-form-item>
      <a-form-item label="投递部门">
        <DepartmentSelectView width="200px" v-model="resume.departmentName"></DepartmentSelectView>
      </a-form-item>
      <a-form-item label="职称ID">
        <JobLevelSelectView width="200px" v-model="resume.jobLevelName"></JobLevelSelectView>
      </a-form-item>
      <a-form-item label="职位ID">
        <PositionSelectView width="200px" v-model="resume.posName"></PositionSelectView>
      </a-form-item>
      <a-form-item label="最高学历">
        <a-input v-model:value="resume.tiptopDegree" />
      </a-form-item>
      <a-form-item label="所属专业">
        <a-input v-model:value="resume.specialty" />
      </a-form-item>
      <a-form-item label="毕业院校">
        <a-input v-model:value="resume.school" />
      </a-form-item>
      <a-form-item label="职业技能描述">
        <a-textarea v-model:value="resume.vocationalSkills" :rows="4" placeholder="技能描述" :maxlength="255" />
      </a-form-item>
      <a-form-item label="自我描述">
        <a-textarea v-model:value="resume.introduction" :rows="4" placeholder="自我描述" :maxlength="255" />
      </a-form-item>
      <a-form-item label="期待薪资">
        <a-input v-model:value="resume.salary" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import {notification} from "ant-design-vue";
import {approveResume, deleteResume, getResume, saveResume} from "@/API";
import NationSelectView from "@/components/Nation-select-view.vue";
import DepartmentSelectView from "@/components/Department-select-view.vue";
import PositionSelectView from "@/components/Position-select-view.vue";
import JobLevelSelectView from "@/components/JobLevel-select-view.vue";

export default defineComponent({
  name: "resume-view",
  components: {JobLevelSelectView, PositionSelectView, DepartmentSelectView, NationSelectView},
  setup() {
    const visible = ref(false);
    let resume = ref({
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
      vocationalSkills: undefined,
      introduction: undefined,
      createTime: undefined,
      updateTime: undefined,
      salary: undefined,
    });
    const resumes = ref([]);
    // 分页的三个属性名是固定的
    const pagination = ref({
      total: 0,
      current: 1,
      pageSize: 10,
    });
    let loading = ref(false);
    const columns = [
    {
      title: '员工姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
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
      title: '出生日期',
      dataIndex: 'birthday',
      key: 'birthday',
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
      title: '意向部门',
      dataIndex: 'departmentName',
      key: 'departmentName',
    },
    {
      title: '职称ID',
      dataIndex: 'jobLevelName',
      key: 'jobLevelName',
    },
    {
      title: '职位ID',
      dataIndex: 'posName',
      key: 'posName',
    },
    {
      title: '最高学历',
      dataIndex: 'tiptopDegree',
      key: 'tiptopDegree',
    },
    {
      title: '所属专业',
      dataIndex: 'specialty',
      key: 'specialty',
    },
    {
      title: '毕业院校',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: '职业技能描述',
      dataIndex: 'vocationalSkills',
      key: 'vocationalSkills',
    },
    {
      title: '期待薪资',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: '自我描述',
      dataIndex: 'introduction',
      key: 'introduction',
    },
    {
      title: '操作',
      dataIndex: 'operation'
    }
    ];

    const onAdd = () => {
      resume.value = {};
      visible.value = true;
    };

    const onEdit = (record) => {
      resume.value = window.Tool.copy(record);
      visible.value = true;
    };

    const onDelete = (record) => {
      deleteResume(record).then((response) => {
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
    const approve = (record) => {
      approveResume(record).then((response) => {
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
      saveResume( resume.value).then((response) => {
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
      getResume(param.page,param.size).then((response) => {
        loading.value = false;
        if (response.code===200) {
          resumes.value = response.data.records;
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
      resume,
      visible,
      resumes,
      pagination,
      columns,
      handleTableChange,
      handleQuery,
      loading,
      onAdd,
      handleOk,
      onEdit,
      onDelete,
      approve
    };
  },
});
</script>
