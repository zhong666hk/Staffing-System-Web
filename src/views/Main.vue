<template>
  <a-layout>
    <the-side-view></the-side-view>
    <a-layout>
      <the-head-view></the-head-view>
      <the-contain-view></the-contain-view>
      <the-footer-view></the-footer-view>
    </a-layout>
  </a-layout>
</template>
<script>

/**
 * useRouter --全局路由的管理--》路由的管理者
 * useRoute --当前路由  -->获取当前路由的信息
 */
import {defineComponent,ref} from "vue";
import TheSideView from "@/components/the-side.vue";
import TheHeadView from "@/components/the-head.vue";
import TheFooterView from "@/components/the-footer.vue";
import TheContainView from "@/components/the-contain.vue";
export default defineComponent({
  name: "login-view",
  components: {TheContainView, TheFooterView, TheHeadView, TheSideView},
  setup() {
    const onCollapse = (collapsed, type) => {
      console.log(collapsed, type);
    };
    const onBreakpoint = broken => {
      console.log(broken);
    };
    const selectedKeys = ref(['4']);
    return {
      selectedKeys,
      onCollapse,
      onBreakpoint,
    };
  },
});
</script>
<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
