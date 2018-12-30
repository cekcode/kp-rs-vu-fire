import Vue from 'vue';
import firebase from 'firebase'
import Router from 'vue-router';
import Home from './views/Home.vue';
Vue.use(Router);
const router = new Router({
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
        },
        {
            path: '/karir',
            name: 'karir',
            component: () => import('./views/Karir.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/join',
            name: 'join',
            component: () => import('./views/Join.vue')
        },
        {
            path: '/admin/dashboard',
            name: 'admin-dashboard',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/admin/Dashboard.vue')
        },
        {
            path: '/admin/profile',
            name: 'admin-profile',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/admin/Profile.vue')
        },
        {
            path: '/admin/daftar-dokter',
            name: 'admin-daftar-dokter',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/admin/DaftarDokter.vue')
        },
        {
            path: '/admin/jadwal-dokter',
            name: 'admin-jadwal-dokter',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/admin/JadwalDokter.vue')
        },
        {
            path: '/admin/peran-dan-kategori',
            name: 'peran-dan-kategori',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/admin/PeranDanKategori.vue')
        },
        {
            path: '/admin/post',
            name: 'post',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/admin/Post.vue')
        },
        {
            path: '/admin/post/new',
            name: 'post-new',
            meta: {
                requiresAuth: true
            },
            component: () => import('./components/admin/PostNew.vue')
        },
        {
            path: '/admin/post/edit/:id',
            name: 'post-edit',
            meta: {
                requiresAuth: true
            },
            component: () => import('./components/admin/PostEdit.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    const currentUser = firebase.auth().currentUser;

    if (requiresAuth && !currentUser) {
        next('/login');
    } else if (!requiresAuth && currentUser) {
        next('/admin/dashboard');
    } else {
        next();
    }
})

export default router;
