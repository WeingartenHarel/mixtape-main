<template>
  <section v-if="mix" class="details">
    <div class="mix">
      <!-- <pre>{{checkTitleLang}}</pre> -->
      <div class="images" v-on:click="onMixView(mix._id)">
        <img class="mix-image shadow" :src="mix.imgUrl" />
        <img
          class="img-frame"
          src="https://res.cloudinary.com/hw-projects/image/upload/v1606518099/appmixes/logo_frame.png"
        />
      </div>
      <div class="info">
        <span class="mix-name" :class="checkLang">{{ mix.name }}</span>
        <span class="mix-desc">{{ mix.desc }}</span>
        <div class="stats">
          <div class="likes flex">
          <span class="mix-likes"
            >{{ mix.likes }} <i class="fas fa-heart"></i
          ></span>
          <span class="mix-views"
            >{{ mix.views }} <i class="fas fa-eye"></i
          ></span>
          </div>
          <span class="mix-amount"
            >{{ songsAmount }} <i class="fas fa-music"></i
          ></span>
        </div>
      </div>
    </div>

    <!-- <button class="preview-play-btn" @click="playMixFromPreview"><i class="fas fa-play"></i></button> -->
  </section>
</template>
 
<script>
import { eventBus } from "@/main.js";
import socketService from "@/services/socketService.js";
export default {
  name: 'mix-preview',
  props: {
    mix: Object
  },
  data() {
    return {
      currMix: null
    }
  },
  computed: {
    checkLang() {
      //console.log('this.mix.genre',this.mix.genre)
      return this.mix.genre === 'israeli' ? 'mix-name isreali' : 'mix-name'
    },
    getMix() {
      return this.$store.getters.getMix;
    },
    getSong() {
      return this.$store.getters.getCurrSongPlaying;
    },
    // mixImg() {
    //   if (!this.mix) return
    //   //console.log(this.mix)

    //   //random image not in use
    //   //var max = this.mix.songs.length 
    //   //var songIdx = Math.floor(Math.random() * (max - 0) + 0);

    //   // 
    //   var song = this.mix.songs[0]
    //   var img = song.imgUrl
    //   //console.log('img',img)
    //   return img

    // },
    songsAmount() {
      return this.mix.songs.length;
    }
  },
  methods: {
    onMixView(mixId) {
      this.$router.push(`/mix/details/${mixId}`)
    },

    // playFromPreview(){
    // if(!this.getCurrSongPlaying){
    //   socketService.emit('play-preview-no-song');
    //   console.log('no song');
    // }else{
    //   socketService.emit('play-preview-curr-song');
    //   console.log('yes song');
    // }
    // }, 

  },
  created() {
    //console.log('mix data',this.mix)

  }
}
</script>

<style>
</style>