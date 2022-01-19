

<template>
	<section>
		<div class="searchTest">
			<!-- @keyup.enter="getSearchResults()" -->
			<!-- <input type="text" v-model="keyword" /> -->
			<form @submit.prevent="getSearchResults()">
			<el-input v-model="keyword" type="text" placeholder="Add song to mix..." clearable></el-input>
			</form>
			<span @click="getSearchResults()">
				<i class="icon">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search-plus" class="svg-inline--fa fa-search-plus fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 192v32c0 6.6-5.4 12-12 12h-56v56c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-56h-56c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h56v-56c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v56h56c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"></path></svg>
				</i>
			</span>
		</div>
		<!-- <div class="searchResults" v-if="searchResults">
			<p>{{searchResults.title}}</p>
			<img :src="searchResults.thumbnails.default.url" alt />
			<button @click="addSongToMix()">
				<i class="fas fa-plus"></i>
			</button>
		</div> -->
		<div class="searchResults" v-if="searchResults">
			<ul>
				<li v-for="result in searchResults" :key="result.id.videoId">
					<div class="info">
						<p>{{result.snippet.title}}</p>
						<img :src="result.snippet.thumbnails.default.url">
					</div>
					<button @click.prevent="addSongToMix(result)">
						<i class="icon">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"></path></svg>

						</i>
					</button>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import { youTubeService } from "@/services/youTubeService.js";
import { mixService } from "@/services/mixService.js";
import socketService from "@/services/socketService.js";
import { eventBus } from "@/main.js";
export default {
	data() {
		return {
			keyword: "",
			searchResults: null,
			createNewSong: mixService.createNewSong(),
			currMix: null,
			song:[{
				id:{
					videoId:'D2heCoIKa1U'
				},
				snippet:{
					thumbnails:{
						default:{
							url:"https://res.cloudinary.com/hw-projects/image/upload/v1636201881/appmixes/1024px-simple_music-svg_k1ce0w.png"
						}
					},
					title:"Natanael Cano x Ovi x Snoop Dogg x Snow Tha Product x CNG - Feeling Good [Official Video]"
				}
			}],
			mixId:null,
		};
	}, 
	computed: {
		getCurrMix() {
			// this.currMix = this.$store.getters.getMix;
			// return this.currMix;
			if (this.mixId) {
				console.log('getting mix')
				this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getMix));
				// this.currMix.songs[0].isPlaying = true;
				// this.startSongOnPreview();           
				return this.currMix
			}else{
				console.log('getting new mix')
				this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getEmptyMix));
				return this.currMix
			}
		},
	},
	methods: {
		async getSearchResults() {
			if(this.keyword === '') return;
			var res = await youTubeService.query(this.keyword);
			this.searchResults = res;
			console.log('SERACH RESULT : ',this.searchResults);
			return this.searchResults;
			// this.searchResults = this.song;
			// return this.song
		},
		addSongToMix(result) {
			var mixCopy = JSON.parse(JSON.stringify(this.getCurrMix));

			this.createNewSong.title = result.snippet.title;
			this.createNewSong.songUrlId = result.id.videoId;
			this.createNewSong.imgUrl = result.snippet.thumbnails.default.url;
			console.log('mixCopy',mixCopy)
			mixCopy.songs.unshift(this.createNewSong);
				this.$store.dispatch({
					type: "saveMix",
					mix: mixCopy,
				});
			socketService.emit('mix-updated',mixCopy);
			this.createNewSong = mixService.createNewSong();
		},
	},
	created(){

    	this.mixId = this.$route.params.mixId 
		  console.log('songs this.mixId ',this.mixId )
	}
};
</script>

<style>
.icon{
	display:block;
	width: 33px !important;
	height: 100% !important;
}
</style>