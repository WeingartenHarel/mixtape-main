
<template>
  <section class="login-user" v-if="!loggedinUser">
    <div class="header-login">
      <button class="close"><i class="fas fa-times" @click.prevent="close"></i></button>
      <h2>login</h2>
     </div>
    <div class="checkLogin" >
      <form @keyup.enter="login">
        <el-input type="text" placeholder="User name" v-model="cerdentials.email" required clearable />
        <el-input type="text" placeholder="Password" v-model="cerdentials.password" show-password required clearable />
        <el-button @click.prevent="login"  type="success">Login</el-button>
        <span v-if="isError" class="err">Email or Password incorrect</span>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      cerdentials: {
        email: '',
        password: ''
      },
      isError:false
    }
  },
  computed: {
    loggedinUser() {
      var user = this.$store.getters.getLoggedinUser;
      console.log('user', user);
      return user
    },
    isLogin() {
        return this.$store.getters.getIsLogin;
    },
    isSignup() {
        return this.$store.getters.getIsSignup;
    }
  }, 
  created() {
  },
  methods: {
      async login() {
        console.log('here');
        try {
          this.$store.dispatch({ type: "login",userCred: this.cerdentials });
          console.log('this.loggedinUser',this.loggedinUser) 
          console.log('setLogin')
          this.$store.commit({type: "setLogin"});
        } catch(err) {
          console.log('email or password inncorect',err)
          this.isError = true
        }
      },
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
  watch: {

  }
}
</script>
