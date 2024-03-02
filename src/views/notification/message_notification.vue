<template>
  <p>
    <a-space>
      <a-button type="primary" @click="handleQuery()">刷新</a-button>
      <a-button type="primary" @click="onAdd">新增</a-button>
    </a-space>
  </p>
  <a-table :columns="columns"
           :dataSource="messageNotifications"
           :loading="loading"
           :pagination="pagination"
           @change="handleTableChange">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <a-space>
          <a-popconfirm
              cancel-text="取消"
              ok-text="确认"
              title="删除后不可恢复，确认删除?" @confirm="onDelete(record)">
            <a style="color: red">删除</a>
          </a-popconfirm>
          <a @click="onEdit(record)">编辑</a>
        </a-space>
      </template>
    </template>
  </a-table>
  <a-modal v-model:visible="visible" cancel-text="取消" ok-text="确认"
           title="" @ok="handleOk">
    <a-form :label-col="{span: 4}" :model="messageNotification" :wrapper-col="{ span: 20 }">
      <a-form-item label="群发/个人">
        <a-radio-group v-model:value="messageNotification.type" name="workState">
          <a-radio value="0">群发</a-radio>
          <a-radio value="1">个人</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="接收者" v-show="messageNotification.type === '1'">
        <Employee-select-view width="200px" v-model="messageNotification.acceptName"></Employee-select-view>
      </a-form-item>
      <a-form-item label="标题">
        <a-input v-model:value="messageNotification.title"/>
      </a-form-item>
      <a-form-item label="内容">
        <a-textarea v-model:value="messageNotification.message" :rows="4" placeholder="通知内容"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue';
import {notification} from "ant-design-vue";
import {deleteMessageNotification, getMessageNotification, saveMessageNotification} from "@/API/notification";
import EmployeeSelectView from "@/components/Employee-select-view.vue";
export default defineComponent({
  name: "messageNotification-view",
  components: {EmployeeSelectView},
  setup() {
    const visible = ref(false);
    let messageNotification = ref({
      id: undefined,
      mid: undefined,
      type: "1",
      acceptName: undefined,
      sendName: undefined,
      title: undefined,
      message: undefined,
      state: undefined,
    });
    const messageNotifications = ref([]);
    // 分页的三个属性名是固定的
    const pagination = ref({
      total: 0,
      current: 1,
      pageSize: 10,
    });
    let loading = ref(false);
    const columns = [
      {
        title: '消息id',
        dataIndex: 'mid',
        key: 'mid',
      },
      {
        title: '消息类型(群发/个人)',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '接受者',
        dataIndex: 'acceptId',
        key: 'acceptId',
      },
      {
        title: '发送者',
        dataIndex: 'sendId',
        key: 'sendId',
      },
      {
        title: '0 未读 1 已读',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '操作',
        dataIndex: 'operation'
      }
    ];

    const onAdd = () => {
      messageNotification.value = {};
      visible.value = true;
    };

    const onEdit = (record) => {
      messageNotification.value = window.Tool.copy(record);
      visible.value = true;
    };

    const onDelete = (record) => {
      deleteMessageNotification(record).then((response) => {
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

    const handleOk = () => {
      saveMessageNotification(messageNotification.value).then((response) => {
        if (response.code === 200) {
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
      getMessageNotification(param.page, param.size).then((response) => {
        loading.value = false;
        if (response.code === 200) {
          messageNotifications.value = response.data.records;
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
      messageNotification,
      visible,
      messageNotifications,
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
