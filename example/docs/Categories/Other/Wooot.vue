<template>
    <div>
        <h1 id="welcome">Steamboat Docs</h1>
        <p>
            This project is inspired by the need to generate documentation pages
            for our own projects, as well as for companies to create living style guides based on their
            own internal developments, like vue components, css classes, html snippets, and javascript snippets.
        </p>
        <p>
            <h2>Getting started</h2>
            <hr>
            To get started, follow these instructions:
            <ol>
                <li>Add a folder called 'docs' in the root of your repository.</li>
                <li>Add a file called Home.vue to override this home page.</li>
                <li>Add any amount of .vue files you wish, and they will appear on the sidebar.</li>
                <li>For categories, use folders, and place the .vue file inside the category folder.</li>        
            </ol>
        </p>
    </div>
</template>



<script>
    export default {
        name: "Woot",
        layout: "Default-Toc"
    }
</script>



<style>

</style>