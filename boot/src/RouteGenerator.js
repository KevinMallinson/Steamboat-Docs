import Vue from 'vue';

export default class {
	constructor() {
		this.home = null;
		this.components = [];
        this.paths = [];
        this.routes = [];
		this.findFiles();

		this.routes.unshift({
			text: 'Home',
			link: '/',
			children: []
		})
		Vue.prototype.NAV_ITEMS = this.routes;
    }
    
    getRoutes() {
        return this.components;
    }

	formRouteTree(accumulator, currentValue) {
		if(accumulator[currentValue.key]) {
			return accumulator[currentValue.key];
		}
	
		accumulator[currentValue.key] = {
			result: []
		};
	
		let el = this.components.find(x => x.path == '/' + currentValue.path);
		if(el) {
			accumulator.result.push({ 
				text: el.name,
				link: el.path,
				children: accumulator[currentValue.key].result
			});
		}
	
		return accumulator[currentValue.key];
	};

	findFiles() {
        //create a webpack context to search for vue files.
		let req = require.context(process.env.VUE_APP_DOCS_DIRECTORY, true, /\.vue$/);
		req.keys().forEach((file) => {

            let path = file.replace('./', '').toLowerCase();
			if (file.toLowerCase().endsWith('index.vue')) {

                // remove '/index.vue'
                this.paths.push(path.slice(0, -10));
                path = path.slice(0, -10);

			} else {

                // remove '.vue'
                this.paths.push(path);
                path = path.slice(0, -4);

			}
    
            let component = (req(file)).default;
			let route = {
				name: component.name || file.split("/").pop().replace(/\.vue$/, ''),
				meta: { layout: component.layout || 'default' },
				path: '/' + path,
				component
			};

			if (component.name.toLowerCase() == 'home') {
				route.path = '/';
				this.home = route;
			} else {
				this.components.push(route);
			}
		});
		
		//If we don't sort the array alphabetically, the resulting tree is messed up.
		this.paths = this.paths.sort();	
		
		//'level' is a helper object to help us compose our resultant route array (which resides in this.routes)
		//it acts as our initial value, and stores the result of each operation
		let level = { result: this.routes };
		this.paths.forEach(item => {
			let pathParts = item.split('/').map(part => ({
				key: part.toLowerCase().endsWith('.vue') ? part.toLowerCase().slice(0, -4) : part.toLowerCase(),
				path: item.toLowerCase().endsWith('.vue') ? item.toLowerCase().slice(0, -4) : item.toLowerCase(),
			}));

			//formRouteTree needs access to `this`, hence arrow function
			pathParts.reduce((x, y) => this.formRouteTree(x, y), level)
		})

	}
}
