<template>
  <section class="chat-app">
    <marquee-text>
      <div class="now-playing" v-if="getSong">
        <p><span> Now Playing - </span> {{ getSong.title }}</p>
      </div>
    </marquee-text>
    <div class="chat-msgs">
      <ul>
        <li v-for="(mesg, idx) in msgsHistory" :key="idx + mesg">
          <p v-if="mesg.txt" class="msg">{{ mesg.name }}: {{ mesg.txt }}</p>
          <div v-if="mesg.gif">
            {{ mesg.name }}:
            <img :src="mesg.gif" class="gif" />
          </div>
        </li>
        <li v-for="(mesg, idx) in msgs" :key="idx">
          <p class="reply-to" v-if="mesg.replyToMsg">Reply to : "{{mesg.replyToMsg}}"</p>
          <p v-if="mesg.txt" class="msg">{{ mesg.name }}: {{ mesg.txt }}</p>
          <div v-if="mesg.gif">
            {{ mesg.name }}:
            <img :src="mesg.gif" class="gif" />
          </div>
          <button
            class="reply-button"
            v-bind:class="{ active: mesg.isReply }"
            @click="onIsReply(mesg._id)"
          >
            <img  class="reply-img" src="https://res.cloudinary.com/hw-projects/image/upload/v1643232966/appmixes/reply-solid.png"/>
          </button>
        </li>
      </ul>
    </div>
    <div class="chat-form raised">
      <p class="some-typing" v-if="isTyping">Someone typing...</p>
      <form @submit.prevent="sendMsg">
        <input
          type="text"
          v-model="msg.txt"
          @keydown="isTypingNow"
          @keyup="isNotTypingNow"
          placeholder="Share your thoughts..."
        />
        <button><i class="far fa-paper-plane"></i></button>
        <select name="emojis" class="emojis" v-model="msg.txt">
          <option value="" selected disabled hidden>
            {{ chatEmojis[1] }}
          </option>
          <option v-for="emoji in chatEmojis" :value="emoji" :key="emoji">
            {{ emoji }}
          </option>
        </select>
        <select
          name="gifs"
          class="gif-select"
          v-model="msg.gif"
          @change="sendMsg"
        >
          <option value="" selected disabled hidden class="gif-option">
            GIF
          </option>
          <option v-for="(gif, index) in gifs" :key="gif" :value="gif">
            GIF#{{ index }}
          </option>
        </select>
        <button @click="clearChat"><i class="far fa-trash-alt"></i></button>
        <!-- <button><img src="https://res.cloudinary.com/hw-projects/image/upload/v1606416732/appmixes/send-messege_s_red.png"></button> -->
      </form>
    </div>
  </section>
</template>
<script>
import socketService from "@/services/socketService.js";
export default {
  props: {
    mixId: String
  },
  data() {
    return {
      msg: {
        _id:null,
        name: null,
        replyToMsg:null,
        txt: '',
        gif: '',
        isReply:false,
      },
      msgsHistory: [],
      msgs: [],
      gifsList: [],
      gif: '',
      room: this.mixId,
      isTyping: false,
      chatEmojis: ['🤙', '😎', '👍', '😂', '👻', '🕺', '💃', '🤩', '🥳', '👽', '🤖'],
      users: null,
      gifs: ["https://www.icegif.com/wp-content/uploads/dancing-icegif-3.gif", 'https://media0.giphy.com/media/Qz5jqYCH9l5t4Dz1Di/giphy.gif', 'https://gif-free.com/uploads/posts/2017-11/1509959847_snoopy-dancing.gif', 'https://www.askideas.com/media/08/Funny-Dancing-Gif-Image.gif', 'https://media4.giphy.com/media/e7QR593l1Vl94uqs9x/source.gif', 'https://media4.giphy.com/media/l3V0pGcu4HosNs57a/source.gif', 'https://media1.giphy.com/media/4QFzDdeLmo19MTm9AF/source.gif', 'https://i.pinimg.com/originals/5a/c5/50/5ac550d16dc31f593fd3b316eaf47d42.gif', 'https://media2.giphy.com/media/3o7qE2VAxuXWeyvJIY/giphy.gif', 'https://dancegifs.com/wp-content/uploads/2019/12/giphy-1.gif', 'https://25.media.tumblr.com/a0621edc06165983d99c2986b1f815a8/tumblr_mhj0cxDe8A1qgy528o1_400.gif']
    };
  },
  computed: {
    getSong() {
      return this.$store.getters.getCurrSongPlaying;
    },
    getUser() {
      return this.$store.getters.getLoggedinUser;
    },
  },
  mounted() {
    // var username = this.getUser;
     //console.log('user =', this.getUser);
    // if(username){
    //     this.msg.name = username
    // }
  },
  methods: {
    resetMsgsReply(){
      this.msgs.map(msg=>msg.isReply = false)
    },
    onIsReply(msgID){
      this.resetMsgsReply()
      let msgIndex = this.msgs.findIndex(msg => msg._id===msgID)
      this.msgs[msgIndex].isReply = !this.msgs[msgIndex].isReply
      this.msg.replyToMsg = this.msgs[msgIndex].txt
      // this.msgToReply = this.msgs[msgIndex];
      //console.log('onIsReply msgs ',this.msgs)
    },
    _makeId(length = 9) {
      var txt = "_idMsg";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      console.log('_makeId txt', txt)
      return txt;
    },
    sendMsgWhatsapp() {
      this.$store.dispatch({ type: "sendMsgWhatsApp" });
    },
    sendMsg(){
            if(this.getUser){
                this.msg.name = this.getUser.username
            }else{
                this.msg.name = 'Guest'
            }
            this.msg._id = this._makeId();
            socketService.emit('send message',{        
                msg:this.msg, 
                roomId:this.room ,   
              });
            this.msg._id= null,
            this.msg.txt = '';
            this.msg.replyToMsg = null;
            this.msg.gif = '';
            this.msg.name = '';
            this.msg.isReply = false;
            this.msgs.map(msg => msg.isReply = false);
        },
    isTypingNow() {
      socketService.emit('is typing', this.isTyping)
      this.isTyping = true;
    },
    isNotTypingNow() {
      socketService.emit('is not typing', this.isTyping)
      this.isTyping = false;
    },
    clearChat() {
      this.msgs = [];
      this.msgsHistory = [];
      socketService.emit('clear chat')
    }
  },
  created() {
    // socketService.setup();
    // socketService.emit('join room',this.room);
    socketService.on('chat message', message => {
      this.msgs.unshift(message)
    })
    socketService.on('type msg', isTyping => {
      this.isTyping = true;
    })
    socketService.on('stop type msg', isTyping => {
      this.isTyping = false;
    })
    socketService.on('message history', messages => {
      messages.filter(msg => {
        if (msg.roomId === this.mixId) {
          this.msgsHistory.unshift(msg.msg);
        }
      })
    })
    socketService.on('user joined', username => {
      this.msgs.push(username)
      //console.log('username ', username);
    })

    socketService.on('getCount', totalConnected => {
      this.users = totalConnected;
    })

    socketService.on('clear-all-chat', () => {
      this.msgs = [];
      this.msgsHistory = [];
    })


  },

};
</script>
<style>
</style>