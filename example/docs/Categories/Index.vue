<template>
  <div id="categories">
    <h1 id="categories-header">Categories</h1>
    <hr>
    <p>
      In this example, we have a folder in docs called 'categories'. This is being displayed by creating an 'Index.vue' inside that folder.<br>
      If we don't provide a 'name' property in the Index.vue component, it will default to the name of the folder.
    </p>
    <p>
      Also, inside the 'categories' 'folder', we have `Demo.vue`, and as you will notice, it is displayed as a subcategory, since it's in the parent folder.
    </p>
  </div>
</template>

<script>


export default {
  components: {
  },
  name: 'Category',
  data() {
    return {

    }
  }
}
</script>
