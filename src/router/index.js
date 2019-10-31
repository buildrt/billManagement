import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

const Bill = () => import('../views/bill/Bill');
const Retailer = () => import('../views/retailer/Retailer');
const Profile = () => import('../views/profile/Profile');
const PassEdit = () => import('../views/passEdit/PassEdit');

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
    path: '/profile',
    component: Profile,
    meta: {
      title: '用户管理'
    }
  },
  {
    path: '/passEdit',
    component: PassEdit,
    meta: {
      title: '密码修改'
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

// 监听浏览器刷新
if (window.localStorage.getItem('isLogin') === 'true') {
  console.log('isLogin:'+Boolean(window.localStorage.getItem('isLogin')));
  console.log('loginUserName:'+window.localStorage.getItem('loginUserName'));
  console.log('loginPassWord:'+window.localStorage.getItem('loginPassWord'));
  store.commit('setIsLogin',Boolean(window.localStorage.getItem('isLogin')));
  store.commit('setLoginUserName',window.localStorage.getItem('loginUserName'));
  store.commit('setLoginPassWord',window.localStorage.getItem('loginPassWord'));
  store.commit('setLoginUserID', window.localStorage.getItem('loginUserID'));
}
if (window.localStorage.getItem('isAdmin') === 'true') {
  console.log(Boolean(window.localStorage.getItem('isAdmin')));
  store.commit('setIsAdmin',Boolean(window.localStorage.getItem('isAdmin')));
}

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