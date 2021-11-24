<template>
  <section class="hero">
    <div class="hero-text-area" ref="baba">
    <h2>Enjoy, Create and Share an awesome mixTape</h2>
    <div class="buttons">
      <a class="button start-listening" @click="emitScrollMeTo('mix-list-home-container')">Start listening</a>
      <!-- <a class="button create-playlist" @click="createNewPlaylist()">Create Playlist</a> -->
    </div>
    </div>
    <!-- <mix-video-player /> -->
    <mix-carousel />
  </section>
</template>

<script>
import mixCarousel from "../components/mix-Carousel.cmp.vue";
import mixVideoPlayer from "../components/mix-video-player.cmp.vue";


export default {
  props:{
   
  },
  data(){
    return{
     
    }
  },
  methods: {
    emitScrollMeTo(refName) {
      this.$emit('refName', refName)

    },
    createNewPlaylist(){
      this.$store.commit({type:'setMixEmpty'})
      this.$router.push(`mix/details`) 
    }
  },
  components: {
     mixCarousel,
     mixVideoPlayer
  },
  computed : {
   
  },
  created(){
    
  }
}
</script>

<style>

</style>