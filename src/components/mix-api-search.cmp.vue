

<template>
	<section>
		<div class="searchTest">
			<!-- @keyup.enter="getSearchResults()" -->
			<!-- <input type="text" v-model="keyword" /> -->
			<form @submit.prevent="getSearchResults()">
			<el-input v-model="keyword" type="text" placeholder="Add song to mix..." clearable></el-input>
			</form>
			<span @click="getSearchResults()">
				<i class="fas fa-search"></i>
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
						<i class="fas fa-plus"></i>
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
</style>