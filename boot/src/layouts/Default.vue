<template>
	<div id="app">
		<nav-bar />

		<b-container fluid class="p-0 site-container">
			<b-row no-gutters>
				<side-bar />


				<b-col lg="8" class="p-3 content-container">
					<slot />
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>


<script>
	import NavBar from "../components/NavBar";
	import SideBar from '../components/SideBar';
	import TocBar from '../components/TocBar';

	export default {
		components: {
			NavBar,
			SideBar,
			TocBar
		}
	};
</script>


<style lang="scss">
	$navHeight: 56px;

	html, body {
		height: 100vh;
	}

	.site-container {
		min-height: calc(100vh - #{$navHeight});
		margin-top: $navHeight;
	}

	.content-container {
		min-height: calc(100vh - #{$navHeight});
	}
</style>
