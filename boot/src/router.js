import Vue from 'vue';
import Router from 'vue-router';
import DefaultHome from './pages/Home';

Vue.use(Router);

//Take those .vue files in the 'pages' folder, and add a route for them automatically.
//That way, users can add as many pages as they want, without messing with the router.\
var dynamicRoutes = [];
let req = require.context(process.env.VUE_APP_DOCS_DIRECTORY, true, /\.vue$/);
let foundHome = false;

req.keys().forEach((key) => {
	// Remove the dot at the start, and the extension
	let route = key.slice(1).slice(0, -4);
	
	//Require the component, in this case since not using `import` we have to use property `default`.
	let component = (req(key)).default;

	let toImport = {
		path: route,
		component,
		meta: { layout: component.layout || 'default' },
		name: component.name
	}

	//If it's the home, add it to the start. Add anything else to the end.
	if (component.name.toLowerCase().trim() == "home" || route.toLowerCase().trim() == "home") {
		foundHome = true;
		toImport.route = "/";
		dynamicRoutes.unshift(toImport)
	} else {
		dynamicRoutes.push(toImport);
	}
})

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
