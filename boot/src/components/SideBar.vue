<script>
    import Vue from 'vue';

    export default {
        render(createElement) {
            let searchBar = createElement('div', {
                'class': 'search-box-container'
            }, [
                createElement('b-input', {
                    props: {
                        placeholder: 'Search'
                    }
                })
            ]);

            //Currently, we have no nav items, so we need to kick it off.
            let nav = createElement('ul', { 
                attrs: {
                    class: 'nav flex-column left-navbar' }
                }, []
            );

            let selectedList = nav;

            //Depth First Search.
            let stack = [ ...Vue.prototype.NAV_ITEMS, null ];

            let depth = 0;
            while(stack.length > 0) {
                let currentNode = stack.shift();

                if (currentNode == null) {
                    selectedList = selectedList.parent;
                    continue;
                }
            
                // let link = createElement('a', { attrs: { class: 'nav-link', href: currentNode.link } }, [ currentNode.text ]);            
                let link = createElement('router-link', { 'class': 'nav-link', props: { to: currentNode.link }, } , [ currentNode.text ]);
                let selectedItem = createElement('li', { 'class': 'nav-item' }, [ link ]);
                selectedItem.parent = selectedList;
                selectedList.children.push(selectedItem);

                //If we are pushing to the stack, then depth goes up
                //We use a single null to let us know when we need to reduce depth
                if (currentNode.children && currentNode.children.length > 0) {
                    stack  = [...currentNode.children, null, ...stack];
                    selectedList = createElement('ul', { attrs: { class: 'nav flex-column ml-3' } }, []);  
                    selectedList.parent = selectedItem;
                    selectedItem.children.push(selectedList);
                }
            }

            return createElement('nav', { attrs: { class: 'col-md-2 d-none d-md-block bg-light sidebar' } }, [ searchBar, nav ]);
        }
    }
</script>


<style lang="scss" scoped>
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

    .left-navbar-item {
    }

    .left-navbar-item a{
    }
</style>
