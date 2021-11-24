<template>
  <section class="video">
   <!-- <h1>video</h1> -->
   <video ref="myVideo" id="myVideo" width="1280" height="720" autoplay loop>
      <source src="https://res.cloudinary.com/hw-projects/video/upload/v1606349974/appmixes/MergedVideo_1_online-video-cutter.com_gqlbzp.mp4" type="video/mp4">
      Your browser does not support HTML5 video.
  </video>
   <!-- <youtube :video-id="videoId" ref="youtube" :player-vars="playerVars"  @playing="playing"></youtube> -->
  <!-- <button @click="playVideo">play</button> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      videoId: 'lG0Ys-2d4MA',
      // playerVars: {
      //   autoplay: 1
      // }
    }
  },
  methods: {
    // playVideo() {
    //   this.player.playVideo()
    // },
    // playing() {
    //   console.log('\o/ we are watching!!!')
    // },
    playVideoNative(){
      //this.$refs.myVideo.autoplay = true;
      //this.$refs.myVideo.load();
      //x.load();
    }
  },
  computed: {
    // player() {
    //   return this.$refs.youtube.player
    // }
  },
  created(){
    this.playVideoNative()
  }
}
</script>

<style>

</style>