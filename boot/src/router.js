import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home';
import RouteGenerator from './RouteGenerator';
Vue.use(Router);

let rg = new RouteGenerator();
let routes = rg.getRoutes();
if (rg.home) {
	routes.unshift(rg.home);
} else {
	routes.unshift({
		path: '/',
		component: Home,
		meta: { layout: 'default-toc' },
		name: 'Home',
	})
}

export default new Router({
	mode: 'history',
  	base: process.env.BASE_URL,
  	routes: [
		...routes
  	]
})
