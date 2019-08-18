<template>
    <li class="toc-tree">
        <a class="toc-link" :href="'#' + node.id">{{ node.text }}</a>

        <ul v-if="node.children && node.children.length">
            <node v-for="(child, index) in node.children" :node="child" :key="index"></node>
        </ul>
    </li>
</template>

<script>
    export default {
        name: "node",
        props: {
            node: Object
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
</style>