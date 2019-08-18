<template>
	<default-toc :hideToc="true">
		<slot />
	</default-toc>
</template>


<script>
	import DefaultToc from '../layouts/DefaultToc';

	export default {
		components: {
			DefaultToc
		}
	};
</script>


<style lang="scss">
</style>
