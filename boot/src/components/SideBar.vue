<script>
    import Vue from 'vue';

    export default {
        functional: true,
        render(createElement, context) {

            let searchBar = createElement('div', {
                'class': 'search-box-container'
            }, [
                createElement('b-input', {
                    props: {
                        placeholder: 'Filter'
                    }
                })
            ]);

            //Currently, we have no nav items, so we need to kick it off.
            //The reference to this object is in the `navbar.children` variable
            //Thus allowing us to build its children.
            let nav = createElement('ul', { 
                    'class': [ 'nav', 'flex-column', 'left-navbar' ]
                }, []
            );

            let navbar = createElement('nav', { 'class': [ 'col-md-2', 'd-none', 'd-md-block', 'bg-light', 'sidebar' ] }, [ searchBar, nav ]);
            
            //Depth First Search.
            let parent = null;
            let stack = [ ...Vue.prototype.NAV_ITEMS, null ];

            while(stack.length > 0) {
                let currentNode = stack.shift();

                //We use a null to indicate we've finished at this depth (i.e. this <ul>)
                if (currentNode == null) {
                    //now we're at the previous <ul>
                    nav = parent;
                    continue;
                }
                    
                let selectedItem = createElement('li', { 'class': ['nav-item'] }, [ 
                    createElement('router-link', { 'class': ['nav-link'], props: { to: currentNode.link }, } , [ currentNode.text ]) 
                ]);

                //add the <li> to the selected <ul>
                nav.children.push(selectedItem);

                //We use a single null to let us know when we need to reduce depth
                if (currentNode.children && currentNode.children.length > 0) {

                    //Since we have children, put the children first, separated by a null, then the existing stack.
                    //This essentially allows us to use a depth first search.
                    stack  = [...currentNode.children, null, ...stack];

                    //Because we have children, we need to assign what their parent is.
                    //This allows us to go back to the previous <ul> (as above) and continue where we left off.
                    parent = nav;

                    //Next, we need to add a new <ul>, and add it to the current <li>, in effect, making another nested list.
                    nav = createElement('ul', { 'class': [ 'nav', 'flex-column', 'ml-3' ] }, []);  
                    selectedItem.children.push(nav);
                }
            }

            return navbar;
        }
    }
</script>


<style lang="scss">
    $navHeight: 56px;

    .search-box-container {
        padding: 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        border-right: 1px solid rgba(0, 0, 0, 0.05);
    }

    .left-navbar {
        position:sticky;
        top: $navHeight;
        min-height: calc(100vh - #{$navHeight});
        border-right: 1px solid rgba(0, 0, 0, 0.05);
    }
</style>
