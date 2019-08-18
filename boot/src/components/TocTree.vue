<template>
    <li class="toc-tree">
        <a class="toc-link" :href="'#' + node.id" :class="{ 'active-item': node.id == activeHeader }">{{ node.text }}</a>

        <ul v-if="node.children && node.children.length">
            <node v-for="(child, index) in node.children" :node="child" :key="index" :activeHeader="activeHeader"></node>
        </ul>
    </li>
</template>

<script>
    export default {
        name: "node",
        props: {
            node: {
                required: true,
                type: Object
            },
            activeHeader: {
                required: true,
                type: String
            }
        }
    };
</script>

<style lang="scss" scoped>
    .toc-tree {
        width: 100%;
    }
    .toc-tree ul {
        padding-left: 20px;
    }

    .toc-link {
        padding: .125rem 1.5rem;
        color: #99979c;
    }

    .active-item {
        color: #68508c;
        text-decoration: underline;
    }
</style>