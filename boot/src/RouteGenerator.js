export default class {
	constructor() {
		this.components = [];
        this.paths = [];
        this.routes = [];
		this.findFiles();

		//If we don't sort the array alphabetically, the resulting tree is messed up.
		this.paths = this.paths.sort();	
    }
    
    getRoutes() {
        return this.routes;
    }

	formRouteTree(accumulator, currentValue) {
	
		if(accumulator[currentValue.key]) {
			return accumulator[currentValue.key];
		}
	
		accumulator[currentValue.key] = {
			result: []
		};
	
		let el = this.components.find(x => x.path == currentValue.path);
	
		if(el) {
			//since its a nested route, we can safely discard all parts of the path except the last
			el.path = el.path.split('/').pop();
			accumulator.result.push({ 
				...el,
				children: accumulator[currentValue.key].result
			});
		}
	
		return accumulator[currentValue.key];
	};

	findFiles() {
        //create a webpack context using the docs directory via steamdocs.
        //search for vue files, including in subdirectories.
		let req = require.context(process.env.VUE_APP_DOCS_DIRECTORY, true, /\.vue$/);
		req.keys().forEach((file) => {

            let route = file.replace('./', '').toLowerCase();
            let routePath = '';

			if (file.toLowerCase().endsWith('index.vue')) {

                // remove '/index.vue'
                this.paths.push(route.slice(0, -10));
                routePath = route.slice(0, -10);

			} else {

                // remove '.vue'
                this.paths.push(route);
                routePath = route.slice(0, -4);

			}
    
            //each component is 'export default', so require that file, and don't forget to assign to the property 'default'.
            //if we had used 'import' it wouldn't be necessary to specify '.default', but for require, we must specify it.
            let component = (req(file)).default;
            
            //create an object compatiable with vue router, and push it to this.components for use later in 'formRouteTree'
			let el = {
				name: component.name || file.split("/").pop().replace(/\.vue$/, ''),
				meta: { layout: component.layout || 'default' },
				path: routePath,
				component
			};

			this.components.push(el);
        });
        
        //'level' is used only to hold the reference, the object property 'result' is pointing to the array 'this.routes'
        //which means after finishing, 'this.routes' will contain our final array
        //and 'level' will be discarded.
		let level = { result: this.routes };
    
        //loop for each path and split it in to its individual parts
        //then call a reducer function on the resultant array of path parts
        //using 'level' as an initial value, which will eventually build up to be our final route array.
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
