import Vue from 'vue'
import VueRouter from 'vue-router'

// 1.安装插件
Vue.use(VueRouter);

// 2.创建路由对象

// 配置路由和组件之间的映射关系
const routes = [];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

//全局导航守卫
// router.beforeEach((to, from, next) => {
//   document.title = to.matched[0].meta.title;
//   next();
// });

// 3.将router对象传入到Vue实例
export default router