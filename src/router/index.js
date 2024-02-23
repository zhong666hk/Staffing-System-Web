import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
import {notification} from "ant-design-vue";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    //登录拦截
    meta: {
      loginRequire: true
    },
    children:[
        {
          path: '/welcome',
          name: 'welcome',
          component: () => import('../views/main/Welcome.vue')
        },
      {
        path: '/employee',
        name: 'employee',
        component: () => import('../views/employee/employee.vue')
      },
      {
        path: '/employee_information',
        name: 'employee_information',
        component: () => import('../views/employee/employee_information.vue')
      },
      {
        path: '/nation',
        name: 'nation',
        component: () => import('../views/employee/nation.vue')
      },
      {
        path: '/position',
        name: 'position',
        component: () => import('../views/employee/position.vue')
      },
      {
        path: '/department',
        name: 'department',
        component: () => import('../views/employee/department.vue')
      },
      {
        path: '/job_level',
        name: 'job_level',
        component: () => import('../views/employee/job_level.vue')
      },
      {
        path: '/resume',
        name: 'resume',
        component: () => import('../views/employee/resume.vue')
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由登录拦截
router.beforeEach((to, from, next) => {
  // 要不要对meta.loginRequire属性做监控拦截
  if (to.matched.some(function (item) {
    console.log(item, "是否需要登录校验：", item.meta.loginRequire || false);
    return item.meta.loginRequire
  })) {
    const _employee = store.state.employee;
    console.log("页面登录校验开始：", _employee);
    if (!_employee.token) {
      console.log("用户未登录或登录超时！");
      notification.error({ description: "未登录或登录超时" });
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
