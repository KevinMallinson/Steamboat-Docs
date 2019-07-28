<template>
    <b-col lg="2">
        {{content}}

        <b-nav type="light" variant="light" class="flex-column right-navbar">
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Another Link</b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
    </b-col>
</template>

<script>
    export default {
        props: {
            content: {
                required: true
            }
        }
    }
</script>

<style lang="scss">
    $navHeight: 56px;

    .right-navbar {
        position:sticky;
        top: $navHeight;
        min-height: calc(100vh - #{$navHeight});
        border-left: 1px solid rgba(0, 0, 0, 0.05);
    }
</style>
