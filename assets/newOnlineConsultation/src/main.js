import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import SDK,{init} from 'bh-mobile-sdk';
import App from './app.vue';
import route from './router';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.credentials = true;
const router = new VueRouter(route);

let Init = () => {
    new Vue({
        el: '#app',
        router: router,
        render: h => h(App)
    });
}
if (process.env.NODE_ENV === 'production') {
    init(() => {
    	BH_MOBILE_SDK.UI.toggleNavBar(false);
    	global.HOST = location.origin;
        Init()
    })
} else {
    init(() => {
    	BH_MOBILE_SDK.UI.toggleNavBar(false);
    	global.HOST = 'http://amptest.wisedu.com';
        Init()
    })
}