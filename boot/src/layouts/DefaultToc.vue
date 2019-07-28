<template>
	<div id="app">
		<nav-bar />

		<b-container fluid class="p-0 site-container">
			<b-row no-gutters>
				<side-bar />


				<b-col lg="8" class="p-3 content-container" ref="content">
					<slot />
				</b-col>
				

				<!-- <toc-bar :content="tocItems"/> -->
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
		},
		async mounted() {
			//We don't get the refs instantly... wait for the next tick and we will have it
			await this.$nextTick();
			let content = this.$refs.content;

			//Get all the headers:
			let headers = content.querySelectorAll('h1, h2, h3, h4, h5, h6');

			//Map their id's and text in to an array of objects:
			headers = [...headers].map(x => ({
				id: x.id,
				text: x.innerText,
				tag: Number(x.tagName.toLowerCase().slice(1)) //tag is a number now
			}));

			this.createTocItems(headers);
		},
		methods: {
			createTocItems(arr) {
				//Set all children to be a blank array.
				arr.forEach(x => { x.children = [] });

				//We assume the first elements tag is the parent.
				//I.e. if it is h1, then we can have h1(sibling)...h6(children)
				//However a first element with a number higher (e.g. h4) followed by a lower (e.g. h1) will not work.
				let offset = -arr[0].tag;

				//Our final array.
				let result = [];

				//levels is a helper array. it is unused except for temporary mapping.
				//`levels[0].children` is a reference to `result`
				let levels = [{ children: result }];

				arr.forEach(o => {
					//Assign next, levels can only contain maximum 7 elements (assuming root of h1):
					//First element, which `children` property is a reference to our result array.
					//Second through 7th element is essentially h1,h2,h3,h4,h5,h6.
					levels[o.tag + offset + 1] = o;

					//Assign children,
					//We are basically assigning the children of an element,
					//which currently is referenced as `result` array, or any element within `result[n].children` (or their children)
					//If we have a tag the same as what already exists in `levels`, the reference in `levels` will be overwritten
					//but the reference is still in tact in `result`. 
					levels[o.tag + offset].children.push(o);
				});
				
				console.log(result);
				return result;
			}
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
