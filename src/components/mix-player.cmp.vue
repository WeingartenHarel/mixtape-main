

<template>
	<section >
        
		<!-- <div>
			<youtube :video-id="currSongPlayingId" ref="youtube" @playing="playing" class="youtube-window"></youtube>
		</div>
        


        <div>
            <h1 v-if="getCurrSongPlaying">Now Playing - </h1>
        </div>


		<div class="player-list">
			<ul>
				<li v-for="song in getMixes[1].songs" :key="song.id">
					{{song.title}}
					<button @click="startPlaying(song);playVideo();getSong(song.id,getMixes[0]._id)">play</button>
					<button @click="pause()">Pause</button>
					<button @click="stopVideo()">Stop</button>
                    <input type="range" min="0" max="100" v-model="volume"  @input="changeVolume">
					
				</li>
			</ul>
		</div> -->
		<!-- <globalPlayer :refs="$refs"/> -->
		<!-- <mixDetails :refs="$refs"/> -->
		<!-- <mixSong :refs="$refs"/> -->
		
	</section>
</template>

<script>
import { mixService } from "@/services/mixService.js";
import globalPlayer from '@/components/global-player.cmp.vue';
import mixDetails from '@/views/mix-details.vue';
import mixSongList from '@/components/mix-song-list.cmp.vue';
export default {
	// data() {
	// 	return {
    //         videoId: "lG0Ys-2d4MA",
    //         currSongTitle:'',
	// 		currSongPlayingId: null,
    //         volume:50,
	// 		duration:'',
	// 		isPlaying:false
	// 	};
	// },
	// computed: {
	// 	player() {
	// 		return this.$refs.youtube.player;
	// 	},
	// 	getMixes() {
	// 		return this.$store.getters.getMixesForDisplay;
	// 	},
	// 	getCurrSongPlaying(){
	// 		return this.$store.getters.getCurrSongPlaying;
	// 	},
	// 	stopStartMusicGlobally(){
	// 		return this.$store.getters.stopStartMusicGlobally;
	// 	}
	// },
	// methods: {
	// 	playVideo() {
	// 		this.$refs.youtube.player.playVideo();
	// 	},
	// 	stopVideo() {
	// 		this.$refs.youtube.player.stopVideo();
	// 		this.isPlaying = false;
			
	// 	},
	// 	playing() {
	// 		// this.duration = this.getTime();
	// 	},
	// 	startPlaying(song) {
	// 		this.currSongPlayingId = song.songUrlId;
	// 		this.currSongTitle = song.title;
	// 		this.isPlaying = true;
			
    //     },
    //     changeVolume(){
    //         this.$refs.youtube.player.setVolume(this.volume)
	// 	},
	// 	pause(){
	// 		this.$refs.youtube.player.pauseVideo();
	// 	},
    //     async getTime(){
    //         this.duration = await this.$refs.youtube.player.getDuration();
    //         return duration;
	// 	},
	// 	getSong(songId,mixId){
	// 		console.log(songId, mixId);
	// 		this.$store.dispatch({
	// 			type:'getSongById',
	// 			songId,
	// 			mixId
	// 		})
	// 	},
	// },
	// components:{
	// 	globalPlayer,
		// mixDetails,
		// mixSong
	// }
};
</script>

<style>
</style>