
<template>
  <section class="header-mix-info flex">
    <!-- <section class="mix-img flex start">
      <form>
        <template v-if="!isLoading">
          <div class="update-img-mix">
            <label for="imgUploader">
              <img :src="mix.imgUrl" />
              <span><i class="fas fa-pen"></i></span>
            </label>
          </div>
          <input
            type="file"
            name="img-uploader"
            id="imgUploader"
            @change="onUploadImg"
            hidden
          />
        </template>
        <img
          class="loader"
          v-else
          src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
        />
      </form>
    </section>
    <section class="mix-info-main">
      <section class="mix-info">
        <h2 class="mix-title" v-if="!isTitleHide">
          {{ mix.name
          }}<span @click="toggleEditTitle" class="edit-txt"
            ><i class="edit fas fa-pen"></i
          ></span>
        </h2>
        <div v-else>
          <input v-model="mix.name" type="text" /><span
            @click.prevent="saveChange(mix)"
            ><i class="far fa-save"></i
          ></span>
        </div>
        <p v-if="!isDescHide">
          {{ mix.desc }}
          <span @click="toggleEditDesc"><i class="fas fa-pen"></i></span>
        </p>
        <div v-else>
          <textarea
            v-model="mix.desc"
            name="desc"
            id="desc"
            cols="30"
            rows="10"
          ></textarea
          ><span @click="saveChange(mix)"><i class="far fa-save"></i></span>
        </div>
        <div class="mix-genre">
          <h4>{{ mix.genre }}</h4>
          <mix-select-genre
            class="select-genre"
            v-on:selectType="setGenre"
            selectType
          />
        </div>
        <div class="mix-views">
          <h4>{{ mix.views }}</h4>
        </div>
        <div class="like">
          <div class="like-song">
            <span class="likes-count">{{ mix.likes }}</span>
            <i @click="addLike" :class="heartMode" class="far fa-heart"></i>
          </div>
        </div>
      </section>
      <section class="user-info">
        <h5>
          Created by: <img :src="mix.createdBy.imgUrl" />
          {{ mix.createdBy.fullName }}
        </h5>
      </section>
      <section class="general-info"></section>
    </section> -->
  </section>
</template>

<script>
import mixSelectGenre from "@/components/mix-select-genre.cmp.vue";
import { uploadImg } from "@/services/imgUploadService.js";

export default {
  props: {
    mix: Object
  },
  data() {
    return {

      isTitleHide: false,
      isDescHide: false,
      isLoading: false,
      songTxt: '',
      mixCopy: JSON.parse(JSON.stringify),
    }
  },
  computed: {
    mix() {
      if (this.$store.getters.getMix) {
        //console.log('get mix by id',this.$store.getters.getMix)
        this.mix = JSON.parse(JSON.stringify(this.$store.getters.getMix));
        //console.log('this.mix ',this.mix )
        return this.$store.getters.getMix;
      } else {
        console.log("new mix");
        this.mix = this.newMix;
        //console.log('this.mix',this.mix)
        return this.mix;
      }
    },
    heartMode() {
      return this.mix.isLiked ? 'fas fa-heart' : 'far fa-heart'
    },
  },
  methods: {
    setGenre(genre) {
      console.log("genre", genre);
      this.mix.genre = genre;
    },
    toggleEditTitle() {
      this.isTitleHide = !this.isTitleHide;
    },
    toggleEditDesc() {
      this.isDescHide = !this.isDescHide;
    },
    saveChange(mix) {
      console.log('mix', mix)
    //   this.$store.dispatch({
    //     type: "saveMix",
    //     mix,
    //   });
      this.$emit("updateMix", this.mix);
      // const el = this.$createElement;
      // this.$notify({
      //   message: el('i', { style: 'color: green' }, 'You updated the mix')
      // });
      this.isTitleHide = false;
      this.isDescHide = false;
    },
    addLike() {
      if (this.mix.isLiked) {
        this.mix.isLiked = false;
        this.mix.likes--;
        // console.log(this.mix.likes);
        this.$store.dispatch({
          type: "saveMix",
          mix: this.mix,
        });
      } else {
        this.mix.isLiked = true;
        this.mix.likes++;
        this.$store.dispatch({
          type: 'saveMix',
          mix: this.mix
        })
        // const el = this.$createElement;
        // this.$notify({
        //   message: el('i', { style: 'color: green' }, 'You liked the mix')
        // });
      }
    },
    async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      console.log('res:', res.url)
      this.imgUrls.push(res.url)
      if (this.mix) {
        console.log('updating item img url')
        this.mix.imgUrl = res.url
      }
      this.isLoading = false;
      this.$store.dispatch({
        type: 'saveMix',
        mix: this.mix
      })
    },
    updateViews() {
      this.mix.views++;
      this.$store.dispatch({
        type: 'saveMix',
        mix: this.mix
      })
      console.log('@@@@');
    }
  },
  components: {
    mixSelectGenre,
  },
  created() {

  },
  mounted() {
  }
}

</script>

<style lang="css" scoped>
.mix-details {
  color: #ffffff;
}
.update-img-mix {
  position: relative;
}
.update-img-mix span {
  position: absolute;
  left: 150px;
  top: 100px;
  opacity: 0.7;
  font-size: 2.5rem;
}
</style>