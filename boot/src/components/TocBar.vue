<template>
    <div class="toc-bar">
        <nav>
            <ul class="nav">
                <template v-for="(item, index) in content">
                    <toc-tree :node="item" :key="index"></toc-tree>
                </template>
            </ul>
        </nav>
    </div>
</template>


<script>
    import TocTree from "./TocTree";  

    export default {
        components: {
            TocTree
        },
        props: {
            content: {
                required: true
            },
            activeHeader: {
                required: true,
                type: String
            }
        },
        watch: {
            activeHeader: function (val) {
                console.log('watched');
            }
        }
    }
</script>

<style lang="scss">
    .toc-bar li {
        list-style: none;
    }

    .toc-bar {
        border-left: 1px solid rgba(0, 0, 0, 0.05);
    }
</style>
