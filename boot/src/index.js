import Vue from 'vue';

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import "font-awesome/css/font-awesome.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import router from './router';
import DefaultToc from  './layouts/DefaultToc';
import Default from  './layouts/Default';
Vue.component('default-toc-layout', DefaultToc);
Vue.component('default-layout', Default);

import App from './App.vue';

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
