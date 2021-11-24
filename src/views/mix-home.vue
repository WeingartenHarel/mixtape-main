<template> 
	<section>
		<div class="mix-home">
			<mixHero v-on:refName="scrollMeTo"  />
			<div class="top-mixes container">
				<h2> Top Mixes </h2>
				<ul class="top-mixes" v-if="topMixes">
					<li v-for="(mix) in topMixes" :key="mix._id" >
						<mix-preview :mix="mix" />
					</li>
				</ul> 
			</div>
    		<ul class="mixes-list-ul" ref="mix-list-home-container" v-if="geners"> 
			   <!-- <h2> Mixes </h2> class="mix-list-home" -->
                <li class="mixes-list-li" v-for="(item, index) in geners" :key="item" > 
                   	<mix-list-Home v-bind:genre="geners[index]"/>
                </li>
            </ul> 

		</div>
		<mix-footer/>
	</section>
</template>
 
<script>
import mixListHome from '../components/mix-list-home.cmp.vue'
import mixHero from '../components/mix-hero.cmp.vue'
import mixVideo from '../components/mix-video-player.cmp.vue'
import globalPlayer from '@/components/global-player.cmp.vue';
import mixPreview from "../components/mix-preview.cmp.vue";
import mixFooter from "../components/app-footer.cmp.vue";

export default {
	name:'mix-home',
	data(){
		return{
			//geners:['funk','pop','rock','electro','classic','israeli','techno','trance']
		}
	},
   components: {
		mixHero,
		mixListHome,
		mixVideo,
		globalPlayer,
		mixPreview,
		mixFooter,
		
  },
  computed : {
	  geners(){
		  return this.$store.getters.getGeners
		  //console.log('geners',this.$store.getters.getGeners)

	  },
	   topMixes(){
			var mixes = this.$store.getters.getTopMixes
			//console.log('mixes',mixes)
			return mixes 
	   }
  },
   methods: {
    scrollMeTo(refName) {
	  //console.log('scrollMeTo',refName)
      var element = this.$refs[refName];
      //console.log('element',element,this.$refs)
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
 	getMixTop() {
	  var mix = this.$store.dispatch({ type: 'getMixByIdPrivate', mixId: '5c013' })
	  console.log('mixTop', mix)
    }
  },
	watch: {
			status(newValue, oldValue) {
		    //console.log(`Updating from ${oldValue} to ${newValue}`);
		   // Do whatever makes sense now
			if (getCurrSongPlaying.isPlaying) {
						console.log('playing')
			}else{
				console.log('Not Playing')
			}
		},
	},
  	created() {
    //console.log('mix data genre',this.genre)
     	this.$store.dispatch({type: "getTopMixes"});
  	}
};
</script>

<style>
</style>