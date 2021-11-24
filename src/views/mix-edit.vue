
<template>
  <section class="chat-room flex column grow space-between">
    <div class="chat-msgs">
      <ul class="clean-list" v-for="(msg, idx) in msgs" :key="idx">
        <li class="msg-text">{{ msg.txt }}</li>
      </ul>
    </div>
    <form>
      <div class="user-msg flex">
        <el-input type="text" v-model="msg.txt" placeholder="Send a message" />
        <button class="btn send-msg" @click.prevent.stop="onSendMsg(msg)">
          <img src="https://res.cloudinary.com/hw-projects/image/upload/v1606416732/appmixes/send-messege_s_red_my4iaj.png"/>
        </button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      msgs: [],
      msg: { from: '', txt: '' },
    }
  },
  methods: {
    // onSendMsg(msg) {
    //   msg = JSON.parse(JSON.stringify(msg))
    //   this.$store.dispatch({
    //     type: "sendMsg",
    //     msg,
    //   });
    //   this.msg = { from: '', txt: '' }
    // },
  },
created(){

}
}
</script>

<style>
</style>