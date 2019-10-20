import Vue from 'vue'
import VueRouter from 'vue-router'

const Bill = () => import('../views/bill/Bill');

const Retailer = () => import('../views/retailer/Retailer');

const Login = () => import('../views/login/Login');

// 1.安装插件
Vue.use(VueRouter);

// 2.创建路由对象

// 配置路由和组件之间的映射关系
const routes = [
  {
    path: '',
    redirect: './login'
  },
  {
    path: '/bill',
    component: Bill,
    meta: {
      title: '账单管理'
    }
  },
  {
    path: '/retailer',
    component: Retailer,
    meta: {
      title: '供应商管理'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

//全局导航守卫
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  next();
});

// 3.将router对象传入到Vue实例
export default router