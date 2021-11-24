
<template>
  <section class="signup-user" v-if="!loggedinUser">
    <div class="header-login">
      <button class="close">
        <i class="fas fa-times" @click.prevent="close"></i>
      </button>
      <h2>Signup</h2>
    </div>
    <div class="checkLogin">
      <form @keyup.enter="signup">
        <div class="rub">
          <span class="req">*</span>
          <el-input
            type="email"
            v-model="cerdentials.email"
            placeholder="Email"
            required
            clearable
          />
        </div>

        <div class="rub">
          <span class="req">*</span>
          <el-input
            type="text"
            v-model="cerdentials.username"
            placeholder="Username"
            required
            clearable
          />
        </div>

        <div class="rub">
          <span class="req">*</span>
          <el-input
            type="text"
            v-model="cerdentials.password"
            placeholder="Password"
            show-password
            required
            clearable
          />
        </div>

        <el-button @click.prevent="signup" type="success">Signup</el-button>
        <br />
        <p class="err"><span>*</span> - this is a required field</p>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      cerdentials: {
        email: '',
        username: '',
        password: '',
      }
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.getLoggedinUser;
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
    signup() {
      this.$store.dispatch({
        type: "signup",
        userCred: this.cerdentials
      });
    },
    close() {
      console.log('close screen')
      if (this.isLogin) {
        console.log('close screen setLogin')
        this.$store.commit({ type: "setLogin" });
      }
      if (this.isSignup) {
        this.$store.commit({ type: "setSignup" });
      }
    },
  },
  components: {

  },
  watch: {

  }
}
</script>
<style scoped>
span ,.err{
  color: red;
  font-weight: bold;
}
i{
  cursor: pointer;
}
</style>