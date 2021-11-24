


<template>
	<section class="globalPlayer">
		<div>
			<div v-if="getCurrSongPlaying">
				<youtube :video-id="getCurrSongPlaying.songUrlId" ref="youtube" @playing="playing" :player-vars="playerVars" class="youtube-window" @ended="ended"></youtube>
			</div>
		</div>
		<div class="global-player">
		 <!-- // todo check @click="resetIcon" -->
		 <div class="logo" :class="isPlayingClass" >
        		<router-link to="/">
				<img
					class="reflect"
					src="https://res.cloudinary.com/hw-projects/image/upload/v1606479695/appmixes/logo_r_animated_v3_first_Frame"
				/>
				
				</router-link>
			</div>
			<marquee-text class="title-width">
			<h2 v-if="getCurrSongPlaying">{{getCurrSongPlaying.title}}</h2>
			<h2 v-else>Unknown Mix</h2>
			</marquee-text>

			<!--------------- THIS IS THE PLAYER PROGRESS BAR  ! ------------------->
			<div class="progress-bar">
				<p v-if="currTime">{{currTime}}</p>
				<p v-else>00:00</p>
				<input  @input="moveTo()" type="range" :min="currTime" :max="totalTimeInput" v-model="currTimePlaying"  />
				<!-- :class="getCurrSongPlaying.isPlaying ? 'player-animation' : 'player-no-animation'" -->
				<p v-if="totalTime">{{totalTime}}</p>
				<p v-else>00:00</p>
			</div>
			<!-------------- those are prev song next song buttons ------------->
			<div class="step-btn">
				<button @click="onPrevSong">
					<i class="fas fa-step-backward"></i>
				</button>
				<button v-if="!isPlayingNow" @click="play">
					<i class="fas fa-play"></i>
				</button>
				<button v-else @click="pause">
					<i class="far fa-pause-circle"></i>
				</button>
				<button @click="onNextSong">
					<i class="fas fa-step-forward"></i>
				</button>
			</div>
			<div class="mute">
				<button v-if="!isMuted" @click="mute">
					<i class="fas fa-volume-up"></i>
				</button>
				<button v-else @click="unmute">
					<i class="fas fa-volume-mute"></i>
				</button>
			</div>
			<div class="player-volume">
				<input type="range" min="0" max="100" v-model="volume"  @input="changeVolume">
				<p v-if="volume">{{volume}}</p>
				<p v-else>50</p>
			</div>
		</div>
	</section>
</template>

<script>
import { eventBus } from "@/main.js";
import { utilService } from "@/services/utilService.js";
import socketService from "@/services/socketService.js";
export default {
	name: "global-player",
	data() {
		return {
			url:'',
			songId: "",
			isPlaying: false,
			isPause: false,
			playerVars: {
				autoplay: 1,
				origin: window.location.origin,
				// host: 'https://www.youtube.com',
				// videoId: this.songId
			},
			currTime: 0,
			currTimePlaying: 0,
			totalTime: 0,
			totalTimeInput: 0,
			isMuted: false,
			volume:50,
		};
	},
	computed: {
		async player() {
			return await this.$refs.youtube.player;
		},
		getCurrSongPlaying() {
			return this.$store.getters.getCurrSongPlaying;
		},
		isPlayingNow() {
			return this.$store.getters.getCurrSongIsPlaying;
		},
		currMix() {
			return this.$store.getters.getMix;
		},
		timePlaying(){
			return this.currTimePlaying;
		},
		isPlayingClass() {
			//if () return ///////////////////////////////////
			var currSong = this.$store.getters.getCurrSongIsPlaying;
			//return currSong
			return currSong ? 'logo-playing' : 'logo-stop'
		},
	},
	watch:{
		'getCurrSongPlaying'(){
		// 	console.log('SONG CHANGED');
		// 	eventBus.$on('song-time-sync',currTimePlaying => {
		// 	// console.log('CURR TIME PLAYING : ',currTimePlaying);
		// 	this.$refs.youtube.player.seekTo(currTimePlaying,true);
		// 	this.currTimePlaying = currTimePlaying

		// 	console.log('SONGS SYNCED');
		// 	eventBus.$off('song-time-sync');

		// })
		}
	},
	methods: {
		changeVolume(){
            this.$refs.youtube.player.setVolume(this.volume)
		},
		pause() {
			// api to play yuotube
			this.$refs.youtube.player.pauseVideo();
			this.$store.commit({
				type: "stopSongPlaying",
			});
			//find somg id
			var songId = this.getCurrSongPlaying.songUrlId;
			//find song index
			const idx = this.currMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			// update mix with isplying = 0
			// better todo with socket / bus eith store
			var updatedMix = JSON.parse(JSON.stringify(this.currMix));
			updatedMix.songs[idx].isPlaying = false;
			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix
			})
		},
		play() {
			this.$refs.youtube.player.playVideo();
			this.$store.commit({
				type: "startSongPlaying",
			});
			var songId = this.getCurrSongPlaying.songUrlId;
			const idx = this.currMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			var updatedMix = JSON.parse(JSON.stringify(this.currMix));
			updatedMix.songs[idx].isPlaying = true;
			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix
			})
		},
		playing(event) {
			// calc time
			this.totalTimeInput = Math.floor(event.getDuration());
			this.totalTime = utilService.convertSecondsToTime(
				Math.floor(event.getDuration())
			);
			// every sec send time
			setInterval(() => {
				this.currTime = utilService.convertSecondsToTime(
					Math.floor(event.getCurrentTime())
				);
				this.currTimePlaying = Math.floor(event.getCurrentTime());
				socketService.emit('move-to-new-time',this.currTimePlaying);
			}, 1000);

		},
		
		ended() {
			this.autoPlayNextSong();
		},
		autoPlayNextSong() {
			var mixLength = this.currMix.songs.length;
			var nextSong;
			var songId = this.getCurrSongPlaying.songUrlId;
			const idx = this.currMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			this.$store.commit({
				type: "setPrevSongNotPlaying",
				songIdx: idx,
			});
			// if last song
			if (idx < this.currMix.songs.length - 1) {
				nextSong = this.currMix.songs[idx + 1]; // next song
			} else if (idx === this.currMix.songs.length - 1) {
				nextSong = this.currMix.songs[0];
			}
			var nextSongId = nextSong.songUrlId;
			this.$refs.youtube.player.loadVideoById(nextSongId);
			this.$store.commit({
				type: "setCurrSong",
				song: nextSong,
			});
			this.$store.commit({
				type: "startSongPlaying",
			});
			var updatedMix = JSON.parse(JSON.stringify(this.currMix));
			updatedMix.songs[idx].isPlaying = false;
			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix
			})
			socketService.emit('next-song',nextSong)
		},
		async moveTo() {
			await this.$refs.youtube.player.seekTo(this.currTimePlaying, true);
			socketService.emit('move-to',this.currTimePlaying);
		},
		onNextSong() {
			this.autoPlayNextSong();
		},
		onPrevSong() {
			var mixLength = this.currMix.songs.length;
			var nextSong;
			var songId = this.getCurrSongPlaying.songUrlId;
			const idx = this.currMix.songs.findIndex(
				(song) => song.songUrlId === songId
			);
			// if not first song .. not -1
			if (idx > 0) {
				nextSong = this.currMix.songs[idx - 1];
			} else if (idx === 0) {
				nextSong = this.currMix.songs[this.currMix.songs.length - 1];
			}
			var nextSongId = nextSong.songUrlId;
			this.$refs.youtube.player.loadVideoById(nextSongId);
			this.$store.commit({
				type: "setCurrSong",
				song: nextSong,
			});
			this.$store.commit({
				type: "startSongPlaying",
			});
			this.$store.commit({
				type: "setPrevSongNotPlaying",
				songIdx: idx,
			});
			var updatedMix = JSON.parse(JSON.stringify(this.currMix));
			updatedMix.songs[idx].isPlaying = false;
			this.$store.dispatch({
				type: "saveMix",
				mix: updatedMix
			})
			// send to all rooms users
			socketService.emit('prev-song',nextSong)
		},
		mute() {
			this.isMuted = true;
			this.$refs.youtube.player.mute();
		},
		unmute() {
			this.isMuted = false;
			this.$refs.youtube.player.unMute();
		},
	},
		created() {
		// socketService.setup();
		// socketService.emit('join room',this.$route.params.mixId);
		// console.log('JOINED ROOM GLOBAL :',this.currMix);
		//$on.. lisiting to event "pause-music"
		eventBus.$on("pause-music", () => {
			this.pause();
		});
		eventBus.$on("resume-music", () => {
			this.play();
		});
		eventBus.$on('song-time',currTimePlaying => {
			this.$refs.youtube.player.seekTo(currTimePlaying,true);
			this.currTimePlaying = currTimePlaying
		})
		eventBus.$on('song-time-sync',currTimePlaying => {
			// console.log('CURR TIME PLAYING : ',currTimePlaying);
			this.$refs.youtube.player.seekTo(currTimePlaying,true);
			this.currTimePlaying = currTimePlaying
			//console.log('SONGS SYNCED');
			eventBus.$off('song-time-sync');

		})
	},
	destroyed() {
		
	},
};
</script>

<style>
</style>


