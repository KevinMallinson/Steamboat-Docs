<template>
    <div class="row">
        <div class="col-lg-7">
            <h1 id="canitwork2">second title</h1>
            <h2 id="welcome">Welcome</h2>
            <hr>
            <p>
                This project is inspired by the need to generate documentation pages
                for our own projects, as well as for companies to create living style guides based on their
                own internal developments, like vue components, css classes, html snippets, and javascript snippets.
            </p>
            <p>
                To get started, simply add a file called Home.vue in the custom/pages folder, 
                with a property called 'name' equal to 'Home'. This will override this page, and you can get started!
            </p><br>
            <h2 id="walkthrough">Quick Walkthrough</h2>
            <hr>
            <div class="row ml-1">
                <div class="col-lg-12">
                    <h3 id="left-sidebar-walkthrough">Sidebar</h3>
                    <p>
                        As you can see on the left sidebar, there is one menu item called 'Home'. That is this page!
                        Click it, and you will return here.
                    </p>
                    <h3 id="right-sidebar-walkthrough">Table of Contents</h3>
                    <p>
                        In addition to the sidebar, there is also a table of contents on the right.
                        That's because the layout of this page is 'default-toc'. If you don't want the table of contents
                        you can use the 'default' layout.
                    </p>
                        <h4>blah</h4>
                        <h5>eyy</h5>
                        <h6>hmm</h6>
                    <p>
                        By default, the table of contents will look for h2 through h5 elements in the current page.
                        It will append those to the table of contents so you can keep track of where you are on the page.
                    </p>
                    <p>
                        Don't forget to set an ID on your headers! Without that, it can't be navigated to.
                    </p>
                    <h4>test</h4>
                </div>
            </div>
            <h2 id="other-stuff">Other stuff</h2>
            <h2 id="more-stuff">More stuff</h2>
            <h2 id="yet-stuff">Yet More stuff</h2>
            <h3 id="wot">Lol</h3>
            <h4 id="yeee">yeee</h4>
            <h5 id="ayyy">ayyy</h5>
            <p> //TODO </p>
        </div>
    </div>
</template>



<script>
    export default {
        name: "Home"
    }
</script>



<style>

</style>