




<template>
	<section v-if="getMixes">
		<div>
			<div>
				<youtube :video-id="currSongPlaying" ref="youtube" @playing="playing" class="youtube-window"></youtube>
                
			</div>
			<div>
				<ul>
					<li v-for="song in getMixes[0].songs" :key="song.id">
						{{song.title}}
						<button @click="startPlaying(song.songUrlId);playVideo()">play</button>
                        <button @click="stopVideo">pause</button>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
import { mixService } from "@/services/mixService.js";
export default {
	data() {
		return {
			videoId: "lG0Ys-2d4MA",
			currSongPlaying: null,
		};
	},
	computed: {
		player() {
			return this.$refs.youtube.player;
		},
		getMixes() {
			return this.$store.getters.getMixesForDisplay;
		},
	},
	methods: {
		playVideo() {
			this.$refs.youtube.player.playVideo();
        },
        stopVideo(){
            this.$refs.youtube.player.stopVideo();
        },
		playing() {
			console.log("o/ we are watching!!!");
		},
		startPlaying(songUrlId) {
			this.currSongPlaying = songUrlId
		},
	},
};
</script>

<style>
</style>

// .ytp-large-play-button