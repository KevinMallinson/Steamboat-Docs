<template>
	<div id="app">
		<nav-bar />

		<b-container fluid class="p-0 site-container">

			<b-row no-gutters>
				<b-col lg="2">
					<div class="sidebar-top-offset sticky-top">
						<side-bar />
					</div>
				</b-col>

				<b-col lg="8" class="p-3 content-container" ref="content">
					<slot />
				</b-col>	
				
				<b-col lg="2" v-if="!hideToc">
					<div class="sidebar-top-offset sticky-top">
						<toc-bar v-if="tocItems" :content="tocItems" :activeHeader="activeElement"/>
					</div>
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
		},
		data() {
			return {
				tocItems: [],
				contentRef: null,
				activeElement: ''
			}
		},
		props: {
			hideToc: {
				required: false,
				type: Boolean
			}
		},
		created() {
			window.addEventListener('scroll', this.handleScroll);
		},
		destroyed() {
			window.removeEventListener('scroll', this.handleScroll);
		},
		async mounted() {
			await this.$nextTick();
			this.contentRef = this.$refs.content;

			let headers = this.contentRef.querySelectorAll('h1, h2, h3, h4, h5, h6');
			headers = [...headers].map(x => ({
				id: x.id,
				text: x.innerText,
				tag: Number(x.tagName.toLowerCase().slice(1))
			}));

			this.tocItems = this.createTocItems(headers);
		},
		methods: {
			//This is voodoo.
			createTocItems(arr) {
				arr.forEach(x => { x.children = [] });
				let offset = -arr[0].tag;
				let result = [];
				let levels = [{ children: result }];
				arr.forEach(o => {
					levels[o.tag + offset + 1] = o;
					levels[o.tag + offset].children.push(o);
				});
				return result;
			},
			handleScroll() {
				const els = document.querySelectorAll('.content-container h1, .content-container h2, .content-container h3, .content-container h4, .content-container h5, .content-container h6')
				els.forEach((el) => {
					//Give the matched elements an offset, to compensate for the topbar. 
					//This makes clicking the anchor go to the correct spot.
					el.style.paddingTop = "75px";
					el.style.marginTop = "-75px";

					const elTop = el.getBoundingClientRect().top
					const elBottom = el.getBoundingClientRect().bottom
					
					//If the top is <= 0, then it's above me
					//If the bottom is >= 0, then it's below me
					//If both, then it's exactly where our viewport is.
					if (elTop <= 0 && elBottom >= 0) {
						this.activeElement = el.id;
					} 
				})
			}
		}
	};
</script>


<style lang="scss">
	$navHeight: 56px;

	.sidebar-top-offset {
		top: 66px;
	}

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

	.sticky-bar {
		position: fixed;
		width:100%;
	}
</style>
