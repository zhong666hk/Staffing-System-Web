<script>
import {defineComponent, ref, watch} from "vue";
import router from "@/router";
export default defineComponent({
  name: "the-side-view",
  setup() {
    const onCollapse = (collapsed, type) => {
      console.log(collapsed, type);
    };
    const onBreakpoint = broken => {
      console.log(broken);
    };
    const selectedKeys = ref(['4']);
    watch(()=>router.currentRoute.value.path,(newValue)=>{
      console.log('watch',newValue);
      selectedKeys.value=[];
      selectedKeys.value.push(newValue);
    },{immediate:true})
    return {
      selectedKeys,
      onCollapse,
      onBreakpoint,
    };
  },
})
</script>

<template>
  <div>
    <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        :style="{ height: '100%', borderRight: 0 }"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="/welcome">
          <user-outlined />
          <router-link to="/welcome">
            <HomeOutlined />&nbsp;欢迎页
          </router-link>
        </a-menu-item>


        <a-sub-menu key="base">
          <template #title>
          <span>
            <UnorderedListOutlined />基本信息
          </span>
          </template>
          <a-menu-item key="/employee">
            <video-camera-outlined />
            <router-link to="/employee">
              <span class="nav-text">员工账户</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="/nation">
            <video-camera-outlined />
            <router-link to="/nation">
              <span class="nav-text">民族</span>
            </router-link>
          </a-menu-item>


          <a-menu-item key="/position">
            <video-camera-outlined />
            <router-link to="/position">
              <span class="nav-text">职位</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="/department">
            <video-camera-outlined />
            <router-link to="/department">
              <span class="nav-text">部门</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="/job_level">
            <video-camera-outlined />
            <router-link to="/job_level">
              <span class="nav-text">职位级别</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="employee">
          <template #title>
          <span>
            <UnorderedListOutlined />人事管理
          </span>
          </template>
          <a-menu-item key="/employee_information">
            <video-camera-outlined />
            <router-link to="/employee_information">
              <span class="nav-text">员工详细信息</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="/resume">
            <video-camera-outlined />
            <router-link to="/resume">
              <span class="nav-text">简历</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>


        <a-sub-menu key="notice">
          <template #title>
          <span>
            <UnorderedListOutlined />公告管理
          </span>
          </template>
          <a-menu-item key="/message_notification">
            <video-camera-outlined />
            <router-link to="/message_notification">
              <span class="nav-text">消息通知</span>
            </router-link>
          </a-menu-item>

        </a-sub-menu>

        <a-sub-menu key="salary">
          <template #title>
          <span>
            <UnorderedListOutlined />薪资管理
          </span>
          </template>
          <a-menu-item key="/salary">
            <video-camera-outlined />
            <router-link to="/salary">
              <span class="nav-text">员工薪资</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="train">
          <template #title>
          <span>
            <UnorderedListOutlined />培训管理
          </span>
          </template>
          <a-menu-item key="/employee_train">
            <video-camera-outlined />
            <router-link to="/employee_train">
              <span class="nav-text">员工培训</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>

      </a-menu>
    </a-layout-sider>
  </div>
</template>

<style scoped>

</style>
