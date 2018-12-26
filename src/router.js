import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/menu',
            name: 'menu',
            component: () => import('./views/Menu.vue')
        },
        {
            path: '/sign-in',
            name: 'signin',
            component: () => import('./views/Signin.vue')
        },
        {
            path: '/dokter',
            name: 'dokter',
            component: () => import('./views/Dokter.vue')
        },
        {
            path: '/informasi',
            name: 'informasi',
            component: () => import('./views/Informasi.vue')
        },
        {
            path: '/kontak-kami',
            name: 'kontak',
            component: () => import('./views/Kontak.vue')
        }
    ]
});