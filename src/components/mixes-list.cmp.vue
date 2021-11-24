<template>
  <section class="mixListHome">
          
            <ul class="ulMixes"> 
              <!--  -->
                <li class="mix" v-for="mix in mixes" :key="mix._id" >
                   	<mixListHome />
                </li>
            </ul> 
           
  </section>
</template>

<script>
import mixPreview from '../components/mix-preview.cmp.vue';
import mixListHome from '../components/mix-list-home.cmp.vue'

export default {
  name:'mix-list',
  data(){
    return{
    mixes: [
                {
                    "_id": "5c09",
                    "name": "Funky Monks",
                    "tags": [
                        "Funk",
                        "Happy"
                    ],
                    "createdBy": {
                        "_id": "u101",
                        "fullName": "Puki Ben David",
                        "imgUrl": "https://res.cloudinary.com/hw-projects/image/upload/v1636201881/appmixes/1024px-simple_music-svg_k1ce0w.png"
                    },
                    "likedByUsers": [
                        {
                            "_id": "u102",
                            "fullName": "Orly Amdadi",
                            "imgUrl": "https://res.cloudinary.com/hw-projects/image/upload/v1636201881/appmixes/1024px-simple_music-svg_k1ce0w.png"
                        },

                    ],
                    "songs": [
                        {
                            "title": "The Meters - Cissy Strut",
                            "id": "s1001",
                            "songUrlId":"4_iC0MyIykM",
                            "imgUrl": "https://res.cloudinary.com/hw-projects/image/upload/v1636201881/appmixes/1024px-simple_music-svg_k1ce0w.png",
                            "addedBy": "minimal-user"
                        },

                    ]
                },
                {
                    "_id": "8f25",
                    "name": "Funky Monks",
                    "tags": [
                        "Funk",
                        "Happy"
                    ],
                    "createdBy": {
                        "_id": "u101",
                        "fullName": "Puki Ben David",
                        "imgUrl": "http://some-photo/"
                    },
                    "likedByUsers": [
                        {
                            "_id": "u102",
                            "fullName": "Orly Amdadi",
                            "imgUrl": "http://some-img"
                        },
                        {
                            "_id": "u103",
                            "fullName": "Harel Hashovav",
                            "imgUrl": "http://some-img"
                        }
                    ],
                    "songs": [
                        {
                            "title": "The Meters - Cissy Strut",
                            "id": "s1001",
                            "songUrlId":"4_iC0MyIykM",
                            "imgUrl": "https://res.cloudinary.com/hw-projects/image/upload/v1636201881/appmixes/1024px-simple_music-svg_k1ce0w.png",
                            "addedBy": "minimal-user"
                        },

                    ]
                }
            ], //end of mixes
          }
  }, //end of data
  computed : {
 
  },
  methods:{
      
  },
  components: {
    mixListHome,

  },
  created(){
    

  }
} // end of export default
</script>

<style>

</style>