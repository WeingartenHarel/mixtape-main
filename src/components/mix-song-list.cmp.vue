<template>
	<section class="songs-list flex column">
		 <!--currMix -->
		<div class="search-song-and-social-container"  v-if="mix">
			<div class="search-and-add">
				<i @click="openInputApi" class="icon">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search-plus" class="svg-inline--fa fa-search-plus fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 192v32c0 6.6-5.4 12-12 12h-56v56c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-56h-56c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h56v-56c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v56h56c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"></path></svg>
				</i>
				<i @click="openInputSearch" class="icon">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
				</i>
				
				<mixApiSearch v-if="isAdd" />
				<!-- isAdd= {{isAdd}} -->
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
									<i class="icon">
										<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-pause" class="svg-inline--fa fa-circle-pause" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM224 191.1v128C224 337.7 209.7 352 192 352S160 337.7 160 320V191.1C160 174.3 174.3 160 191.1 160S224 174.3 224 191.1zM352 191.1v128C352 337.7 337.7 352 320 352S288 337.7 288 320V191.1C288 174.3 302.3 160 319.1 160S352 174.3 352 191.1z"></path></svg>	
									</i>
								</button>
								<button v-else @click="pauseSong(song);">
									<i  :class="song.isPlaying  ? 'highlight-color' : 'default-color'" class="icon">
										<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" class="svg-inline--fa fa-play-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path></svg>
									</i>
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


			console.log('mix() this.currMix',this.mixId)
			if (this.mixId) {
				this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getMix));
				console.log('mix() this.currMix',this.currMix)
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
		startSongPlaying(song,mix) {
			
			console.log('startSongPlaying :',song,mix);
			this.$store.commit({
				type: "setCurrSong",
				song:song,
			}); 
			eventBus.$emit("resume-music");
			var mix = JSON.parse(JSON.stringify(this.getMix))
			console.log('startSongPlaying songs:',mix);
			console.log('startSongPlaying this.currSongPlaying',this.currSongPlaying);

			var songId = this.currSongPlaying.songUrlId;
			const idx = this.getMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			mix.songs.forEach(song => song.isPlaying = false);
			mix.songs[idx].isPlaying = true;
			this.$store.dispatch({
				type: "saveMix",
				mix: mix
			})
			socketService.emit('set-song-playing',this.currSongPlaying);
		},
		// startSongPlaying(song,songs) {
		// 	console.log('startSongPlaying :',song,songs);
		// 	this.$store.commit({
		// 		type: "setCurrSong",
		// 		song,
		// 	}); 
		// 	eventBus.$emit("resume-music");
		// 	var songs = JSON.parse(JSON.stringify(this.getMix))
		// 	console.log('startSongPlaying songs:',songs);
		// 	console.log('startSongPlaying this.currSongPlaying',this.currSongPlaying);

		// 	var songId = this.currSongPlaying.songUrlId;
		// 	const idx = this.getMix.songs.findIndex(
		// 		(song) => song.songUrlId === songId
		// 	);
		// 	songs.songs.forEach(song => song.isPlaying = false);
		// 	songs.songs[idx].isPlaying = true;
		// 	this.$store.dispatch({
		// 		type: "saveMix",
		// 		mix: songs
		// 	})
		// 	socketService.emit('set-song-playing',this.currSongPlaying);
		// },
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
		console.log('songs this.mixId ',this.mixId )

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
	watch :{
		 $route (to, from){
			 console.log('to, from',to, from)
			 if (to.path === "/mix/details"){
				 console.log('/mix/details')
				 this.currMix ={};
				 this.mixId =null;
				 this.isPlaying =false;
				this.$store.commit({
						type: "setMix",
						mix:null,
				}); 
				this.$store.commit({
						type: "setCurrSong",
						mix:null,
				}); 
				this.$store.commit({
						type: "stopSongPlaying",
						value:false,
				}); 
			 }
    	}
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
height: 33px !important;
}
.icon{
	display:block;
	width: 33px !important;
	height: 100% !important;
}
</style>

