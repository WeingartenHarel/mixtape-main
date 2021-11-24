<template>
  <VueSlickCarousel v-bind="settings" >
    <li v-for="mix in mixes"  :key="mix._id">
        {{mix}}
      </li>
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
            "slidesToShow": 4,
            "slidesToScroll": 4,
            "initialSlide": 0,
            "responsive": [
              {
                "breakpoint": 1024,
                "settings": {
                  "slidesToShow": 3,
                  "slidesToScroll": 3,
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
     methods: {
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
     // console.log('mixes',this.mixes)

    }
  }
</script>