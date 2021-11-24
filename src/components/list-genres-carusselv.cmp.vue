<template  v-if="getGenreToDisplay">
  <VueSlickCarousel v-bind="settings" >

    <ul class="mixes-nav-ul" v-for="genre in geners" :key="genre">  
         <li class="mix-link" v-on:click="onEmitSetGenre(genre)">{{genre}}</li>
      </ul>
    <template #prevArrow="arrowOption">
      <div class="custom-arrow">
        {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
      </div>
    </template>
  </VueSlickCarousel>
</template>

<script>
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  
  export default {
  props: {
      mixes: {
        type: Array,
        default: null,
      },
    },
    
    data() {
      return {
        settings: {
            "dots": true,
            "infinite": false,
            "speed": 500,
            "slidesToShow": 8,
            "slidesToScroll": 8,
            "initialSlide": 0,
            "centerPadding": '40px',
            "centerMode": true,
            "responsive": [
              {
                "breakpoint": 1024,
                "settings": {
                  "slidesToShow": 8,
                  "slidesToScroll": 8,
                  "infinite": true,
                  "dots": true
                }
              },
              {
                "breakpoint": 600,
                "settings": {
                  "slidesToShow": 2,
                  "slidesToScroll": 2,
                  "initialSlide": 2
                }
              },
              {
                "breakpoint": 480,
                "settings": {
                  "slidesToShow": 1,
                  "slidesToScroll": 1
                }
              }
            ]
          }, // end of settings
      } 
    },// end of data
    computed:{
        geners(){
            //console.log('this.$store.getters.getGenreToDisplay',this.$store.getters.getGeners)
            return this.$store.getters.getGeners
        }
    },
     methods: {
       onEmitSetGenre(genre){
         console.log('genre',genre)
         this.$emit('setGenre',genre)
       },
        next() {
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },

        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
        },
    },
    components: {		
		  VueSlickCarousel
    },
    created(){
     // console.log('getGeners',this.geners)

    }
  }
</script>