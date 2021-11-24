<template>
	<section ref="mix-list-home" class="mix-list-home container">
		<!-- <h2>Home mix list </h2> -->
		<!-- mark -->
	
	
		<div ref="mix-list-home container">
			<nav class="mixes-nav">
				<div class="genre-title">{{ genre }}</div>
				<ul class="nav-show-all-ul">
					<li class="mix-link-show-all" v-on:click="showList(genre)">
						Show all
						<span>
							<i class="fas fa-angle-double-right"></i>
						</span>
					</li>
				</ul>
			</nav>
			<template v-if="mixes && genre">	
				<VueSlickCarousel v-bind="settings">	
					<li v-for="mix in mixes"  :key="mix._id">
						<mix-preview :mix="mix" />
					</li>
					<template #prevArrow="arrowOption">
						<div class="custom-arrow">		
							{{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
						</div>
					</template>
				</VueSlickCarousel>
			</template>
			<!-- <button @click="startSong(mix)">play</button> -->
			<!-- <ul class="ul-mixes">
				<li class="mix" v-for="mix in mixes" :key="mix._id" >
					<mix-preview :mix="mix" @click.native.stop="startMusic(mix)"/>
					
					<mix-preview :mix="mix" />
					 <button @click="startSong(mix)">play</button> 
					
				 </li>
			</ul> -->
		</div>
	</section>
</template>

<script>

import mixPreview from "../components/mix-preview.cmp.vue";
import { eventBus } from "@/main.js";
import { mixService } from "@/services/mixService.js";

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
	name: "mix-list-home",
	props: {
		genre: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			a: null,
			videoId: "BubwLnPcQjc",
			mixTopA: null,
			currMix:'',
			settings: {
				"lazyLoad": "ondemand",
				"dots": true,
				"infinite": false,
				"speed": 500,
				"slidesToShow": 4,
				"slidesToScroll": 4,
				"initialSlide": 0,
				"responsive": [
				{
					"breakpoint": 1024,
					"settings": {
					"slidesToShow": 3,
					"slidesToScroll": 3,
					"infinite": true,
					"dots": true
					}
				},
				{
					"breakpoint": 600,
					"settings": {
					"slidesToShow": 2,
					"slidesToScroll": 2,
					"initialSlide": 2
					}
				},
				{
					"breakpoint": 480,
					"settings": {
					"slidesToShow": 1,
					"slidesToScroll": 1
					}
				}
				]
			}, // end of settings
			
		};
	},
	computed: {
		currSongPlaying(){
      		return this.$store.getters.getCurrSongPlaying;
    	},
		mixes() {
			var mixes = this.$store.getters.getMixesForDisplay;
			if (!mixes) return;
			//console.log('this.genre',this.genre)
			if (!this.genre) return mixes;
			//console.log('filter')
			var res = mixes.filter((item) => {
				//console.log('item',item.genre)
				return item.genre.toLowerCase() === this.genre.toLowerCase();
			});
			//console.log('res',res)
			return res;
		},
		getMix() {
			return this.$store.getters.getMix;
		},
	},
	methods: {
		showList(genre) {
			console.log('genre', genre)
			this.$store.commit({ type: "setGenre", genre });
			//this.genre = genre
			this.$router.push(`mix/list`);
		},
		
	},
	components: {
		mixPreview,
		VueSlickCarousel,
		//homeListCarusselv,

	},
	created() {
		
	},
}; // end of export default
</script>

<style>
</style>

