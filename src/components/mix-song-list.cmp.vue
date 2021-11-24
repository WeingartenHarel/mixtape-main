<template>
	<section class="songs-list flex column">
		 <!-- -->
		<div class="search-song-and-social-container"  v-if="mix">
			<div class="search-and-add">
				<i @click="openInputApi" class="fas fa-plus-circle"></i>
				<i @click="openInputSearch" class="fas fa-search"></i>
				
				<mixApiSearch v-if="isAdd" />
				isAdd= {{isAdd}}
				<div class="search-song" v-if="!isAdd">
					<el-input
						type="text"
						placeholder="Search song in mix..."
						v-model="songTxt"
						@input="filterBySong"
						clearable>
				</el-input>

				</div>
			</div>
				<mix-social /> 
		</div>
				<!-- <div class="!currMixHide">{{mixSongs}} {{songTxt}}</div>  -->
				<!-- <div class="currMixHide"> {{mixSongs}}</div> -->
				<!-- {{mixSongs}} -->
   				<draggable v-if="currMix.songs" class="list-group min-height songs-details-main" 
				:list="currMix.songs" :options="{animation:200 }"  
				:element="'ul'" @change="update" :sort="true">
					
					<li class="list-group-item" v-for="(song, index) in mixSongs" :key="song.id" :data-id="song.id">
						
						<div class="song-container">

							<div class="songs-details">
								<button v-if="!song.isPlaying" @click="setCurrSongPlaying(song);startSongPlaying(song,mix)">
									<i class="fas fa-play"></i>
								</button>
								<button v-else @click="pauseSong(song);">
									<i  :class="song.isPlaying  ? 'highlight-color' : 'default-color'" class="fas fa-pause"></i>
								</button>					
								<img :src="song.imgUrl" />						
								
								<p :class="song.isPlaying  ? 'highlight-color' : 'default-color'">{{ song.title }}</p>

								<span class="song-duration">{{ song.duration }}</span>
							</div>
							<div class="img-equalizer" v-if="song.isPlaying">
								<img src="@/assets/imgs/equalizer.gif" >
							</div>
							<div class="actions">
								<div class="sort-songs-buttons">
									<button v-on:click="emitSongPos(index,-1)">
										<i class="fas fa-sort-up"></i>
									</button>
									<button v-on:click="emitSongPos(index,1)">
										<i class="fas fa-sort-down"></i>
									</button>
								</div>
								<span class="delete-song" @click="emitSongId(song.id)">
									<i class="far fa-trash-alt"></i>
								</span>
							</div>
						</div>
					</li>
            	</draggable>
	</section>
</template>

<script>
import { mixService } from "@/services/mixService.js";
import {eventBus} from '@/main.js';
import draggable from 'vuedraggable'
import mixApiSearch from "@/components/mix-api-search.cmp.vue";
import mixSocial from '@/components/social-mix.cmp.vue';
import socketService from "@/services/socketService.js";





export default {
	name: "mix-song-list",
	props: {
		songs: Array,
		mixEmited: Object,
	},
	data() {
		return {
			songId: null,
			isAdd: false,
			isPlaying: false,
			mixCopy: null,
			songTxt: '',
			songsListDragable: null,
			mixId:null,
			currMix:null,
			// songForDev:  {
			// 	title: "Mac Miller - Good News",
			// 	id: "i6Hdm",
			// 	songUrlId: "aIHF7u9Wwiw",
			// 	imgUrl: "",
			// 	addedBy: "minimal-user",
			// 	duration: "3:21",
			// 	isPlaying: false
          	// },
		};
	},
	computed: {
		mix() {
			// //var mix = this.mixEmited;
			// var mix = this.$store.getters.getMix;
			// if(!mix) return
			// this.mixCopy = JSON.parse(JSON.stringify(mix));

			// return this.mixCopy;


			if (this.mixId) {
				this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getMix));
				console.log('this.currMix',this.currMix)
				// this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getMix));
				// this.currMix.songs[0].isPlaying = true;
				// this.startSongOnPreview();           
				return this.currMix
			}else{
				//console.log('getting new mix')
				this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getEmptyMix));
				return this.currMix
			}
		},
		mixSongs(){
			//var mix = this.mixEmited;
			var mix = this.$store.getters.getMix;
			if(!mix) return
			this.mixCopy = JSON.parse(JSON.stringify(mix));
			//console.log('this.mixCopy',this.mixCopy)
 			return this.mixCopy.songs.filter(song => {
				 return song.title.toLowerCase().includes(this.songTxt.toLowerCase());
				// return this.mixCopy.songs.some(song => {
				// 	//console.log('song.title',song.title.toLowerCase() ,'includes ',this.songTxt.toLowerCase())  	
				// })
			})
		},
		isNowPlaying() {
			return this.$store.getters.getThisIsPlaying;
		},
		currSongPlaying() {
			return this.$store.getters.getCurrSongPlaying;
		},
		getMix() {
			//if(!this.mixEmited) return
			//return this.mixEmited
			return this.$store.getters.getMix;
		},
		filterBySong() {
			// var mix = this.$store.getters.getMix;
			var mix = this.mix;
			if(!mix) return
			var mixCopy = JSON.parse(JSON.stringify(mix));
			if(!this.songTxt){
				return mixCopy.songs
			}
			return mixCopy.songs.some((song) => {
				//console.log('song',song.isPlaying)
				return song.title.toLowerCase().includes(this.songTxt.toLowerCase());
			});
		},
		isSongPlaying(){
			return this.$store.getters.getCurrSongIsPlaying;
		}
	},
	methods: {
		onAdd(event, visible) {
				let id = event.item.getAttribute('data-id');
				//console.log('id',id)
            },
		update() {
			//console.log('update mix', mixCopy)
			var updatedMix = JSON.parse(JSON.stringify(this.currMix));
			updatedMix.songs.map((songs, index) => {
				songs.order = index + 1;
			})
			console.log('update mix',updatedMix)

			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix
			})
			socketService.emit('mix-updated', this.mix);
			//console.log('filterBySong', this.mix)
		
		},
		onResize: function (x, y, width, height) {
			this.x = x
			this.y = y
			this.width = width
			this.height = height
			},
			onDrag: function (x, y) {
			this.x = x
			this.y = y
		},
		stopDrag(songIdx) {
			//console.log('stopDrag',this.filterBySong,songIdx)
			this.$emit("updateMix", this.mixCopy);

			// this.$store.commit({ type: "resetIconsState" });
			// this.$store.commit({ type: "startSongPlaying" });
		},
		emitSongPos(songIdx, diff) {
			this.$emit("emitSongPos", { songIdx: songIdx, diff: diff });
		},
		emitSongId(songId) {
			this.$emit("emitRemoveSong", songId);
		},
		setIsPlaying() {
			
			this.$store.commit({
				type: "nowPlaying",
				isPlaying: this.isPlaying,
			});
		},
		setCurrSongPlaying(song) {
			console.log('setCurrSongPlaying song',song)
			this.$store.commit({
				type: "setCurrSong",
				song,
			});
		},
		startSongPlaying(song,songs) {
			this.$store.commit({
				type: "setCurrSong",
				song,
			}); 
			eventBus.$emit("resume-music");
			var songs = JSON.parse(JSON.stringify(this.getMix))
			var songId = this.currSongPlaying.songUrlId;
			const idx = this.getMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			songs.songs.forEach(song => song.isPlaying = false);
			songs.songs[idx].isPlaying = true;
			//console.log('startSongPlaying :',songs.songs);
			this.$store.dispatch({
				type: "saveMix",
				mix: songs
			})
			socketService.emit('set-song-playing',this.currSongPlaying);
		},
		pauseSong(song) {
			//emit puase to player with bus
			eventBus.$emit("pause-music");
			// update store
			this.$store.commit({
				type:'stopSongPlaying',
				song
			})
			var songId = this.currSongPlaying.songUrlId;
			const idx = this.getMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			//update server with song idx
			var updatedMix = JSON.parse(JSON.stringify(this.getMix));
			updatedMix.songs[idx].isPlaying = false;
			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix
			})
			// emit socket with pause to all rooms
			socketService.emit('pause-song-playing',this.currSongPlaying);
		},
		openInputApi(){
			this.isAdd = true;
		},
		openInputSearch(){
			this.isAdd = false;
		},
		
	},
	created() {
		//socketService.setup();
        // socketService.emit('join room',this.room);
		// socketService.emit('set-song-playing',this.currSongPlaying)
		//console.log('created',this.songForDev)
		// this.$store.commit({
		// 		type: "setCurrSong",
		// 		song:this.songForDev
		// 	});
		this.mixId = this.$route.params.mixId 
		//console.log('songs this.mixId ',this.mixId )

		// seeting current song to store on play song
    	 socketService.on('play-song',song => {
			this.$store.commit({
				type: "setCurrSong",
				song,
			});
		})
		// emit song time to socket when emit 'song-time'
		socketService.on('song-time', currTimePlaying => {
				eventBus.$emit('song-time',currTimePlaying);
		})

		socketService.on('pause-song',currSong => {
			eventBus.$emit('pause-music');
		})
		
		
	},
	components:{
		mixApiSearch,
		draggable,
		mixSocial
	},
};
</script>

<style>

.draggable{
width: 100% !important;
height: 40px !important;
}
</style>

