import Vue from 'vue';
import Router from 'vue-router';
import DefaultHome from './pages/Home';
import RouteGenerator from './RouteGenerator';
Vue.use(Router);

let rg = new RouteGenerator();
let routes = rg.getRoutes();
console.log(routes);
debugger;

//result has been continuously built upon - using the reference in the initial `level`.


	// //If it's the home, add it to the start. Add anything else to the end.
	// if (component.name.toLowerCase().trim() == "home" || route.toLowerCase().trim() == "home") {
	// 	foundHome = true;
	// 	toImport.route = "/";
	// 	dynamicRoutes.unshift(toImport)
	// } else {
	// 	dynamicRoutes.push(toImport);
	// }

//If we didn't override the home component, we use the default.
if (!foundHome) {
	dynamicRoutes.unshift({
		path: '/',
		component: DefaultHome,
		meta: { layout: 'default-toc' },
		name: 'Home',
	})
}

//Spread the routes in with the existing routes. This gives us the opportunity to also add manual routes.
export default new Router({
	mode: 'history',
  	base: process.env.BASE_URL,
  	routes: [
		...dynamicRoutes
  	]
})
