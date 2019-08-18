<template>
    <li class="menu-tree">
        <router-link class="menu-link" :to="node.link">{{ node.text }}</router-link>

        <ul v-if="node.children && node.children.length" class="sub-node-tree">
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
    .menu-tree {
        width: 100%;
    }

    .menu-tree ul {
        padding-left: 20px;
    }

    .menu-link {
        padding: .125rem 1.5rem;
        color: #99979c;
    }
</style>