<template>
  <section class="mix-list-page container">
    <div class="input-list flex">
      <el-input
        type="text"
        v-model="filterBySongName"
        placeholder="Search song..."
        clearable
      ></el-input>
      <span><i class="fas fa-search"></i></span>
    </div>
    <nav class="nav-genres">
      <li class="mix-link-all" v-on:click="setGenreShowAll">All mixes</li>
      <list-genres-carusselv
        class="list-genres-carussel"
        @setGenre="onSetGenre"
      />
    </nav>
    <!-- <nav class="mixes-nav">
                <ul class="mixes-nav-ul">
                    <li class="mix-link" v-on:click="onListSetFilter('funk')">Funk</li>
                    <li class="mix-link" v-on:click="onListSetFilter('pop')">Pop</li>
                    <li class="mix-link" v-on:click="onListSetFilter('rock')">Rock</li>
                    <li class="mix-link" v-on:click="onListSetFilter('electro')">Electro</li>
                    <li class="mix-link" v-on:click="onListSetFilter('israeli')">Israeli</li>
                    <li class="mix-link" v-on:click="onListSetFilter('Techno')">Trance</li>
                </ul>            
            </nav> -->
    <ul class="ul-mixes">
      <li class="mix" v-for="mix in mixes" :key="mix._id">
        <!-- <pre>{{mix.genre}}</pre> -->
        <mix-preview :mix="mix" />
      </li>
    </ul>
  </section>
</template>

<script>
import mixPreview from '../components/mix-preview.cmp.vue';
import listGenresCarusselv from './list-genres-carusselv.cmp.vue';


export default {
  name: 'mix-list',
  props: {
    // genre:{
    //     type:String,
    //     default: null
    // }
  },
  data() {
    return {
      filterBySongName: '',
      genre: 'all',
    }
  },
  computed: {
    mixes() {
      var mixes = this.$store.getters.getMixesForDisplay
      console.log('mixes', mixes)
      // console.log('f= ',this.filterBySongName)
      //if(!this.filterBySongName) return
      //console.log('this.genre',this.getGenreToDisplay)
      var filteredMixes = mixes
      //console.log('filteredMixes',filteredMixes)
      if (this.genre !== 'all') {
        filteredMixes = filteredMixes.filter(mix => mix.genre.toLowerCase() === this.genre)
      }
      return filteredMixes.filter(mix => {
        return mix.songs.some(song => {
          //console.log('song.title',song.title.toLowerCase() ,'includes ',this.filterBySongName.toLowerCase())  
          return song.title.toLowerCase().includes(this.filterBySongName.toLowerCase())
        })
      })

    },
    getGenreToDisplay() {
      return this.$store.getters.getGenreToDisplay
    }
  },
  methods: {
    setGenreShowAll() {
      this.genre = 'all'
    },
    setGenre() {
      this.genre = this.$store.getters.getGenreToDisplay
    },
    onSetGenre($event) {
      console.log('setGenre', $event)
      this.genre = $event
    },
    onListSetFilter(genre) {
      //console.log('genre',genre)
      this.$store.commit({ type: 'setGenre', genre })
      //console.log('genre',genre)
      //this.$router.push(`mix/list$`) 
    },
    showList(genre) {
      this.genre = genre
      //console.log('genre', this.genre)
      this.$router.push(`mix/list`)
    },
  },
  components: {
    mixPreview,
    listGenresCarusselv
  },
  created() {
    console.log('this.$store.getters.getGenreToDisplay', this.$store.getters.getGenreToDisplay)
    this.$store.dispatch({ type: "loadMixes" });
    this.setGenre();
  }
} // end of export default
</script>

<style>
</style>