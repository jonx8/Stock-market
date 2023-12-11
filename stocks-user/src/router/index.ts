import {createRouter, createWebHistory, Router} from 'vue-router'
import store from "@/store";


const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                redirect: 'profile'
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/views/Profile.vue'),
            },
            {
                path: 'login',
                name: 'Login',
                component: () => import('@/views/Login.vue')
            },
            {
                path: 'bidding',
                name: 'Bidding',
                component: () => import('@/views/Admin.vue')
            }
        ],
    },

]

const router: Router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to) => {
    if (!store.state.isAuthenticated && to.name !== 'Login') {
        return {name: 'Login'}
    }
})


export default router
