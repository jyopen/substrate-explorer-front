import Vue from 'vue';
import './plugins/element';
import './plugins/hook';
import './css/normal.styl';
import './css/base.styl';
import App from './App.vue';
import router from './router';
import {i18n} from './i18n';

Vue.config.productionTip = false;

new Vue({
    router,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
