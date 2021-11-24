
<template>
  <section class="mix-details flex" v-if="mix">
 
    <!-- <h2>mix details </h2> -->
    <!-- <div class="mix-chat">
      <mix-chat :mixId="roomId" />
    </div> -->
    <div class="mix-full-info flex">
      <section class="header-mix-info flex">
        <section class="mix-img flex start">
          <form>
            <template v-if="!isLoading">
              <div class="update-img-mix">
                <label class="imgUploader" for="imgUploader">
                  <img :src="currMix.imgUrl" />
                  <span class="image-edit-button"><i class="fas fa-pen"></i></span>
                </label>
              </div>
              <input
                type="file"
                name="img-uploader"
                id="imgUploader"
                @change="onUploadImg"
                hidden
              />
            </template>
            <img
              v-else
              class="loader"
              src="@/assets/imgs/loader.gif"
            />
          </form>
        </section>
        <section class="mix-info-main">
          <section class="mix-info">
            <h2 class="mix-title" v-if="!isTitleHide">
              {{ currMix.name}}
              <span @click="toggleEditTitle" class="edit-txt"
                ><i class="edit fas fa-pen"></i
              ></span>
            </h2>
            <div class="input-container" v-else>
              <input class="input-title" v-model="currMix.name" type="text" /><span
                @click.prevent="saveChange(currMix)"
                ><i class="far fa-save"></i
              ></span>
            </div>
            <p class="description" v-if="!isDescHide">
              {{ currMix.desc }}
              <span @click="toggleEditDesc"><i class="fas fa-pen"></i></span>
            </p>
            <div class="textarea-container flex" v-else>
              <textarea
                v-model="currMix.desc"
                name="desc"
                id="desc"
              ></textarea
              ><span @click="saveChange(currMix)"
                ><i class="far fa-save"></i
              ></span>
            </div>
            <div class="mix-genre">
              <h4>{{ currMix.genre }}</h4>
              <mix-select-genre
                class="select-genre"
                v-on:selectType="setGenre"
                selectType
              />
            </div>
            <div class="stats">
              <div class="mix-views">
                <h4>{{ currMix.views }}</h4>
                <i class="fas fa-eye"></i>
              </div>
              <div class="mix-like">
                <div class="like-song">
                  <span class="likes-count">{{ currMix.likes }}</span>
                  <i @click="addLike" :class="heartMode" class="far fa-heart"></i>
                </div>
              </div>
            </div>
          </section>
          <section class="user-info">
            <h5>  
              <span>Created by: <img :src="currMix.createdBy.imgUrl" /></span>
              <span>{{ currMix.createdBy.fullName }}</span>
            </h5>
          </section>
          <section class="general-info"></section>
        </section>
      </section>
      <div class="search-and-social">
         <!-- <div class="currMixHide"> {{currMix}}</div> -->
        
          <div class="songs">
            <mix-song-list 
              :songs="currMix.songs"
              :mixEmited="currMix" 
              @emitRemoveSong="removeSongFromMix"
              @emitSongPos="changeSongPos"
              @updateMix="saveChange"
            />
          </div>
          
      </div>
    </div>
     <span class="chat-icon"
      @click="toggleShow">
      <i class="far fa-comments"></i>
     </span>
     <!-- {{chatIsShow}} -->
    <div :class="chatMode" class="mix-chat effect5">
      <mix-chat :mixId="roomId" />
    </div>
  </section>
</template>

<script>
import mixPlayer from "@/components/mix-player.cmp.vue";
import mixChat from "@/components/mix-chat.cmp.vue";
import mixSongList from "@/components/mix-song-list.cmp.vue";
import mixSelectGenre from "@/components/mix-select-genre.cmp.vue";
import { uploadImg } from "@/services/imgUploadService.js";
import mixSocial from '@/components/social-mix.cmp.vue';
import socketService from "@/services/socketService.js";
import { eventBus } from "@/main.js";

export default {
  data() {
    return {
      chatIsShow: true,
      isConnected:false,
      songTime:0,
      imgUrls: [],
      isTitleHide: false,
      isDescHide: false,
      isLoading: false,
      songTxt: '',
      currMix: '',
      mixId:null,
      newMix: {
        // _id: "3463467347347347347347347",
        name: "Mix Name",
        desc: "Mix description",
        genre: "genre",
        isLiked: false,
        imgUrl: "https://res.cloudinary.com/hw-projects/image/upload/v1606479695/appmixes/logo_r_animated_v3_first_Frame.jpg",
        likes: 0,
        tags: [
          "Funk",
          "Happy"
        ],
        createdBy: {
          _id: "u101",
          fullName: `guest ${this._id}`,
          imgUrl:'https://res.cloudinary.com/hw-projects/image/upload/v1606654351/appmixes/user_headphones.png'
        },
        likedByUsers: [

        ],
        songs: [
          {
            title: "songs goes here",
            id: "i6Hdm",
            songUrlId: "",
            imgUrl: "https://res.cloudinary.com/hw-projects/image/upload/v1606654351/appmixes/user_headphones.png",
            addedBy: "minimal-user",
            duration: "0:00",
            isPlaying: false
          },

        ]
      }
    }
  },
  computed: {
    getMix(){
      this.mixId = this.$route.params.mixId 
      console.log('details this.mixId ',this.mixId )
  
      if (this.mixId) {
        //console.log('getting mix')
        this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getMix));
        // this.currMix.songs[0].isPlaying = true;
        // this.startSongOnPreview();           
        return this.$store.getters.getMix;
      }else{
         //console.log('getting new mix')
        this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getEmptyMix));
         return this.$store.getters.getEmptyMix
      }

    },
    roomId(){
      return this.$route.params.mixId;
    },
    currSongPlaying(){
      return this.$store.getters.getCurrSongPlaying;
    },
    mix() {   
      this.mixId = this.$route.params.mixId 
      //console.log('details this.mixId ',this.mixId )

      if (this.mixId) {
        //console.log('getting mix')
        this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getMix));
        // this.currMix.songs[0].isPlaying = true;
        // this.startSongOnPreview();           
        return this.$store.getters.getMix;
      }else{
         //console.log('getting new mix')
        this.currMix = JSON.parse(JSON.stringify(this.$store.getters.getEmptyMix));
         return this.$store.getters.getEmptyMix
      }
    },
    user() {
      var newUser = this.$store.getters.getLoggedinUser;
      return newUser;
    },
    heartMode() {
      return this.currMix.isLiked ? 'fas fa-heart' : 'far fa-heart'
    },
    chatMode(){
      return this.chatIsShow ? 'display-chat' : 'hide-chat'
    }
  }, 
  methods: {
    saveMix(mix){
      this.$store.dispatch({ type: "saveMix", mix:mix});
      socketService.emit('mix-updated', mix);
    },
    startSongOnPreview(){
      if(!this.currSongPlaying){
        this.currMix.songs.forEach(song => song.isPlaying = false)
        this.currMix.songs[0].isPlaying = true
        this.$store.commit({type: "setCurrSong",song:this.currMix.songs[0]});
      }else{
        this.currMix.songs.forEach(song => song.isPlaying = false)
        this.currMix.songs.forEach(song => {
          if(song.id === this.currSongPlaying.id){
            song.isPlaying = true;
          }
        })
      }
    },
    changeSongPos(songNewPos) {
      var lastSong = this.currMix.songs.length
      if (songNewPos.songIdx === 0 && songNewPos.diff === -1) return
      if (songNewPos.songIdx === lastSong && songNewPos.diff === 1) return
      //console.log('songNewPos', songNewPos)
      var input = this.currMix.songs
      var from = songNewPos.songIdx
      var to = songNewPos.songIdx + songNewPos.diff
      console.log('changeSongPos', input, from, to)
      let numberOfDeletedElm = 1;
      const elm = input.splice(from, numberOfDeletedElm)[0];
      numberOfDeletedElm = 0;
      input.splice(to, numberOfDeletedElm, elm);

      this.saveMix(this.currMix)
      // this.$store.dispatch({
      //   type: "saveMix",
      //   mix:this.currMix
      // });
    },
    setGenre(genre) {
      console.log('setGenre',genre)
      this.currMix.genre = genre;
      this.saveMix(this.currMix)
    },
    toggleEditTitle() {
      this.isTitleHide = !this.isTitleHide;
    },
    toggleEditDesc() {
      this.isDescHide = !this.isDescHide;
    },
    saveChange(mix) {
      console.log('saveChange',mix)
      this.saveMix(mix)
      // this.$store.dispatch({
      //   type: "saveMix",
      //   mix,
      // });   
      // const el = this.$createElement;
      // this.$notify({
      //   message: el('i', { style: 'color: green' }, 'You updated the mix')
      // });
      this.isTitleHide = false;
      this.isDescHide = false;
    },
    removeSongFromMix(songId) {
      var songIdx = this.currMix.songs.findIndex((song) => song.id === songId);
      this.currMix.songs.splice(songIdx, 1);

       this.saveMix(this.currMix)
      // this.$store.dispatch({
      //   type: "saveMix",
      //   mix:this.currMix
      // });
    },
    addLike() {
      if (this.currMix.isLiked) {
        this.currMix.isLiked = false;
        this.currMix.likes--;
        // console.log(this.currMix.likes);
        this.saveMix(this.currMix)

      } else {
        this.currMix.isLiked = true;
        this.currMix.likes++;
        this.saveMix(this.currMix)

        
        // const el = this.$createElement;
        // this.$notify({
        //   message: el('i', { style: 'color: green' }, 'You liked the mix')
        // });
      }
    },
    async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.imgUrls.push(res.url)
      if (this.currMix) {
        console.log('updating item img url')
        this.currMix.imgUrl = res.url
      }
      this.isLoading = false;
      this.saveMix(this.currMix)
    },
    updateViews() {
      this.currMix.views++;
      this.saveMix(this.currMix)
    },
    reload() {
      this.$forceUpdate();
    },
    // plying song when enter mix
    playSongOnStart(){
      var playingCounter = 0;
      var currSong;
      if(!this.getMix) return
      // define first song
      this.mix.songs.forEach(song => {
        if(song.isPlaying){
          playingCounter++;
          currSong = song
        }
      })
      // socket emit song with time
      // if song isplaynig
      if(playingCounter > 0){
        socketService.emit('send-song-to-all',currSong);
        socketService.on('song-time-new',time => {
        eventBus.$emit('song-time-sync',time)
        })
      }
      else{
        // first song
        socketService.emit('send-song-to-all',this.getMix.songs[0]);
      }
    },
    getSongTime(){
      eventBus.$emit('getTime');
    },
    toggleShow(){
      this.chatIsShow = !this.chatIsShow;
    },
  },
  components: {
    mixChat,
    mixSongList,
    mixPlayer,
    mixSelectGenre,
    mixSocial
  },
  async created() {
    
    // getting mix id
    this.mixId = this.$route.params.mixId 

    console.log('details this.mixId ',this.mixId )

    // socket setup
    if(!this.isConnected) {
      socketService.setup();
      this.isConnected = true;
    }

    // emit roomID = mixID
    socketService.emit('join room',this.$route.params.mixId);
    console.log('details joined room ',this.$route.params.mixId);

    //if mixID get mix else empty mix
    if(this.$route.params.mixId){
      const mixId = this.$route.params.mixId;
      await this.$store.dispatch({ type: "getMixById", mixId });
      this.updateViews();
    }

    // playing song emit to all rooms
    socketService.on('play-song',song => {
      var mixCopy = JSON.parse(JSON.stringify(this.getMix))
      mixCopy.songs.forEach(currSong => currSong.isPlaying = false);
      if(this.currSongPlaying){
        mixCopy.songs.forEach(songId => {
          if(songId.id === this.currSongPlaying.id){
            songId.isPlaying = true;
            this.isMixPlaying = true;
          }
        })
        // update song to server and database isplaying = true
        // socket emits isplaaying = true
        this.$store.dispatch({
				type: "saveMix",
				mix: mixCopy
      })
      }   
    });
    this.playSongOnStart();
    socketService.on('mix-is-updated',mix=>{
      this.$store.dispatch({
				type: "saveMix",
				mix,
      });
      this.$store.dispatch({
          type: "loadMixes",
          mix,
      });
    });
  },
}
</script>