<template>
    <b-col lg="2">
        <b-nav type="light" variant="light" class="flex-column left-navbar">
            <div class="search-box-container">
                <b-input placeholder="Search"></b-input>
            </div>
            <b-nav-item :href="item.path" v-for="(item, index) in $router.options.routes" :key="index">
                {{item.name}}
            </b-nav-item>
        </b-nav>
    </b-col>
</template>


<script>
</script>


<style lang="scss">
    $navHeight: 56px;

    .search-box-container {
        padding: 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .left-navbar {
        position:sticky;
        top: $navHeight;
        min-height: calc(100vh - #{$navHeight});
        border-right: 1px solid rgba(0, 0, 0, 0.05);
    }
</style>
