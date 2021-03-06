import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import { store } from './store.js'
import VuePaginate from 'vue-paginate';
const fb = require('./firebaseConfig.js');
import VueSwal from 'vue-swal';

Vue.use(VueSwal)
Vue.use(VuePaginate);

Vue.config.productionTip = false;

let app
fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})