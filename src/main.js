import Vue from 'vue';
import App from './App.vue';
import store from './store/store.js';

Vue.config.productionTip = false;

Vue.filter('toUSD',(value) => {
	return Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(value);
});

new Vue({
	store,
	render: (h) => h(App),
}).$mount('#app');
