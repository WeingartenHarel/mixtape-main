<template>
  <div class="search-song-and-social">
    <section class="mix-social flex space-between">
      <!-- <button>shaffle</button> -->
      <div class="share-container flex">
        <div class="invite">
          <!-- <p>invite a friend to join you:</p> -->
        </div>        
        <div class="mix-social-nav flex space-evenly">       
          <input v-model="phoneNumber" placeholder="Messege to..." name="phone-number" type="number"/>
          <a :href="`https://wa.me/972${this.phoneNumber}?text=Hi%20there%20check%20this%20mixTape%20${this.linkToSendEdited}`" target="_blank" > <i class="fab fa-whatsapp"></i></a>
          <!-- <a :href="`${this.linkToSend}`" target="_blank" > <i class="fab fa-whatsapp"></i></a> -->
          <a @click="shareOnFB" > <i class="fab fa-facebook-square"></i> </a>
          
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const axios = require("axios");

export default {


  name: 'mix-social',
  props: {
    mix: Object
  },
  data() {
    return {
      phoneNumber:null,
      link: 'https://awesome-mixtape.herokuapp.com/#/mix/details/5fcc9d2ae69386fbefff032c',
      // link: 'https://awesome-mixtape.herokuapp.com/#/mix/details/5fcc9d2ae69386fbefff032c',
      linkToSend:null
    }
  },
  methods: {
    shareOnFB(){
      var link = this.link
        //console.log('link',link)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${link}`);
    },
    sendwMsg(){
      //console.log(this.phoneNumber)
      //console.log(window.location.href)

      if(!this.phoneNumber) return
      //window.open(`https://wa.me/${{phoneNumber}}?text=hi%20there`,"_blank" );
      var number = this.phoneNumber
      var link = window.location.href
      //${link}
      axios.post(`https://wa.me/${number}?text=hi%20there%20`,{headers: {"Access-Control-Allow-Origin": "*"}})
    }
  },
  computed: {

  },
  components: {
  },
  created() {
    //var id = this.$route.params.mixId
    this.linkToSend = window.location.href
    this.linkToSendEdited = this.linkToSend.replace('#/','');
    //console.log('this.linkToSend',this.linkToSendEdited)
  }
} 
</script>

<style scoped>

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>