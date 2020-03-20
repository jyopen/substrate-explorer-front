import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

import Home from '../views/Home.vue';

Vue.use(VueRouter);
const routes = [
    {path: '/', component: Home},
    {path: '/blocks', component: () => import('../views/Blocks.vue')},
    {path: '/block/:id', component: () => import('../views/Block.vue')},
    {path: '/validators', component: () => import('../views/Validators.vue')},
    {path: '/transactions', component: () => import('../views/Transactions.vue')},
    {path: '/accounts', component: () => import('../views/Accounts.vue')},
    {path: '/404', component: () => import('../views/Page404.vue')},
    {path: '*', redirect: '/404'},
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

NProgress.configure({showSpinner: false});

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
    NProgress.done();
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});


export default router;
