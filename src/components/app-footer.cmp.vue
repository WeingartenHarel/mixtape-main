
<template>
  
  <section>
    <div class="app-footer">
       <div class="logo" :class="isPlaying" >
          <router-link to="/" ><img class="reflect" src="https://res.cloudinary.com/hw-projects/image/upload/v1606479695/appmixes/logo_r_animated_v3_first_Frame" ></router-link> 
        </div>
           <span>Created by:</span>
        <h2>
          <p>Andery Dolya  <i class="fab fa-linkedin"></i>  <i class="fab fa-github"></i> |&nbsp;&nbsp;</p> 
          <p> Eilon Shetrit  <i class="fab fa-linkedin"></i>  <i class="fab fa-github"></i> |&nbsp;&nbsp;</p>  
          <p> Harel Weingarten  <i class="fab fa-linkedin"></i>  <i class="fab fa-github"></i>&nbsp;&nbsp;</p>
        </h2>
        <small>© Coffee Rights mixTape 2020</small>
    </div>
  </section>
</template>

<script>
export default {
 computed: {
    isPlaying() {
      var currSong = this.$store.getters.getCurrSongIsPlaying;
      //return currSong
      return currSong ? 'logo-playing' : 'logo-stop'
    },
  }
}
</script>

<style>

</style>