<template>
    <div class="left-bar">
        <div class="search-box-container">
            <input type="text" class="form-control fa-helper" :placeholder="searchPlaceholder" />
        </div>
        <nav>
            <ul class="nav">
                <template v-for="(item, index) in items">
                    <node-tree :node="item" :key="index"></node-tree>
                </template>
            </ul>
        </nav>
    </div>
</template>


<script>
    import Vue from 'vue';
    import NodeTree from "./NodeTree";  

    export default {
        components: {
            NodeTree
        },
        data() {
            return {
                filterValue: '',
                items: null,
                searchPlaceholder: '\uf0b0 Filter'
            }
        },
        created() {
            this.items = Vue.prototype.NAV_ITEMS;
        }
    }
</script>


<style lang="scss">
    .search-box-container {
        padding: 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        border-right: 1px solid rgba(0, 0, 0, 0.05);
    }

    .left-bar {
        border-right: 1px solid rgba(0, 0, 0, 0.05);
    }

    .left-bar li {
        list-style: none;
    }

    .fa-helper {
        font-family: "Arial", "FontAwesome";
    }
    
</style>
