import {
    createRouter,
    createWebHistory,
    type NavigationGuardNext,
    type RouteLocationNormalized,
    type RouteRecordRaw
} from 'vue-router';
import Login from '../views/Login.vue';
import Deposit from '../views/Deposit.vue';
import store from '../stores';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: { title: 'Login Page' }
    },
    {
        path: '/deposit',
        name: 'Deposit',
        component: Deposit,
        meta: { title: 'Deposit Page' },
        beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            if (store.getters.isAuthenticated) {
                next();
            } else {
                next({ name: 'Login' });
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = 'Assignment';
    }
    next();
});


export default router;