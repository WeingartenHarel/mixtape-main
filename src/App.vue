<template>
  <div id="app">
    <div class="screen"  v-if="isLogin || isSignup" @click.prevent="close"></div>
    <mix-login v-if="isLogin" class="centered" />
    <mix-signup v-if="isSignup" class="centered" />
    <appHeader />
	<div class="loader reflect" v-if="isLoading">	
    <img
      src="@/assets/imgs/logo_r_animated_v3.gif"
    />
	</div>
    <div v-else>
      <router-view />
      <div class="global">
        <globalPlayer />
      </div>
    </div>
  </div>
</template>
    
<script>
import mixLogin from '@/views/mix-login.vue';
import mixSignup from '@/views/mix-signup.vue';
import appHeader from "@/components/app-header.cmp.vue";
import appFooter from "@/components/app-footer.cmp.vue";
import { mixService } from "@/services/mixService.js";
import globalPlayer from '@/components/global-player.cmp.vue';
import socketService from "@/services/socketService.js";

export default {
  props: {

  },
  data() {
    return {
      isLoading: true
    }
  },
  created() {
    this.isLoading = true
    this.$store.dispatch({
      type: 'loadMixes'
    })

  },
  mounted() {
    setInterval(() => {
      this.isLoading = false;
    }, 2000);
  },
  methods: {
    close(){ 
      console.log('close screen')
      if(this.isLogin){
        console.log('close screen setLogin')
        this.$store.commit({type: "setLogin"});
      }
      if(this.isSignup){
        this.$store.commit({type: "setSignup"});
      }
    },
  },
  computed: {
    currentRouteName() {
      return this.$store.getters.currentRouteName
    },
    isLogin() {
      return this.$store.getters.getIsLogin;
    },
    isSignup() {
      return this.$store.getters.getIsSignup;
    },
  },
  components: {
    mixLogin,
    mixSignup,
    appHeader,
    appFooter,
    globalPlayer
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  .loader{
	  img {
		max-width: 200px;
		max-height: 200px;
		margin-top: 250px;
		opacity: .8;
	  }
  }
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
// }
// }
</style>
