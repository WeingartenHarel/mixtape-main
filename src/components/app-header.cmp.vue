
<template>
  <section>
    <div class="app-header">
      <!-- <h1>app header</h1> -->
      <div class="logo" :class="isPlaying" @click="resetIcon">
        <router-link to="/">
          <img
            class="reflect"
            src="https://res.cloudinary.com/hw-projects/image/upload/v1607170425/appmixes/logo_r_animated_v3_160x105.gif"
          />
         
        </router-link>
        <router-link to="/">
        <h2 class="brand-name">mixTape</h2>
         </router-link>
      </div>

        <img class="imgroot" src="https://res.cloudinary.com/hw-projects/image/upload/v1607380891/appmixes/imgroot200x200.gif" />
        <nav class="main-nav">
        <div class="nav-mix">
            <router-link to="/mix/list">Mixes</router-link> 
            <a @click="createNewPlaylist" >Create Mix</a>
        </div> 
       <navbar /> 
        <div class="nav-user-pos">
            <div class="nav-user">
              <el-menu
                default-active="2"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse">
                <el-submenu index="1">
                  <template slot="title">
                    <span class="user-avater">
                      <i class="fas fa-user-circle"></i>
                    </span>
                    <div class="user-display" v-if="user">Hello {{ user.username }}</div>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item v-if="!user" @click="onSetLogin" index="1-1"
                      >Login</el-menu-item>
                    <el-menu-item v-else @click="onSetLogout" index="1-1"
                      >Logout</el-menu-item>
                    <el-menu-item v-if="!user" @click="onSetSignup" index="1-2"
                      >Signup</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
              <!-- <span v-if="!user" class="nav-display" @click="onSetLogin"
                >Login</span
              > -->
              <!-- <span v-else class="nav-display" @click="onSetLogout">Logout</span> -->
              <!-- <span v-if="!user" class="nav-display" @click="onSetSignup"
                >Signup</span
              > -->
           
              
            </div>
     
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import { eventBus } from '@/main.js'
import  navbar from '../components/mix-navbar-ham.cmp.vue'

export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    createNewPlaylist(){
      // this.$store.commit({type:'setMixEmpty'})
      // this.$router.push(`/`) 
      this.$router.push(`/mix/details`) 
    }, 
    resetIcon() {
      eventBus.$emit('reset-icons');
    },
    onSetLogin() {
      this.$store.commit({
        type: 'setLogin'
      })
    },
    onSetSignup() {
      this.$store.commit({
        type: 'setSignup'
      })
    },
    onSetLogout() {
      this.$store.dispatch({
        type: 'logout'
      })
    },
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    }
  },
  computed: {
    getCurrMix() {
      return this.$store.getters.getMix;
    },
    user() {
      return this.$store.getters.getLoggedinUser;
    },
    getCurrSong() {
      return this.$store.getters.getCurrSongPlaying;
    },
    isPlaying() {
      var currSong = this.$store.getters.getCurrSongIsPlaying;
      //return currSong
      return currSong ? 'logo-playing' : 'logo-stop'
    },
    isLogin() {
      return this.$store.getters.getIsLogin;
    },
  },
  components: {
    navbar
  },
}
</script>

<style >

</style>