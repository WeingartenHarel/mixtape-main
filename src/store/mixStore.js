import { mixService } from '@/services/mixService.js'
import { msgservice } from '@/services/msg.service.js'
import router from '@/router'

export default {
    state: {
        mixes: null,
        topMixes:null,
        genre: 'all',
        currMix: null,
        currSongPlaying: null,
        isPlaying: false,
        geners: ['funk', 'pop', 'rock', 'electro', 'classic', 'israeli', 'techno', 'trance'],
        newMix: {
             _id: null,
            name: "Mix Name",
            desc: "Mix description",
            genre: "pop",
            isLiked: false,
            imgUrl: "https://res.cloudinary.com/hw-projects/image/upload/v1606479695/appmixes/logo_r_animated_v3_first_Frame.jpg",
            likes: 0,
            tags: [
              "Funk",
            ],
            createdBy: {
              _id: "u101",
              fullName: `guest`,
              imgUrl:'https://res.cloudinary.com/hw-projects/image/upload/v1606654351/appmixes/user_headphones.png'
            },
            likedByUsers: [
    
            ],
            songs: [
            //   {
            //     title: "songs goes here",
            //     id: "i6Hdm",
            //     songUrlId: "",
            //     imgUrl: "https://res.cloudinary.com/hw-projects/image/upload/v1636201881/appmixes/1024px-simple_music-svg_k1ce0w.png",
            //     addedBy: "minimal-user",
            //     duration: "0:00",
            //     isPlaying: false
            //   },
    
            ]
          },
    
    },
    getters: {
        getMixesForDisplay(state) {
            return state.mixes;
        },
        getGenreToDisplay(state) {
            return state.genre;
        },
        getCurrSongPlaying(state) {
            return state.currSongPlaying;
        },
        getMix(state) {
            //console.log('state.currMix',state.currMix)
            return state.currMix;
        },
        getEmptyMix(state) {
            //console.log('state.currMix',state.newMix)
            return state.newMix
        },
        getThisIsPlaying(state) {
            return state.isPlaying;
        },
        getCurrSongIsPlaying(state) {
            if (state.currSongPlaying) {
                return state.currSongPlaying.isPlaying;
            }
        },
        getTopMixes(state){
            return state.topMixes
        },
        getGeners(state) {
            return state.geners
        },
        currentRouteName() {
            return this.$route.name;
        }
    },
    mutations: {
        setSortedMixes(state, payload){
            //console.log(' setSortedMixes',payload.mixes)
            var sortby = 'likes'
            var res = payload.mixes.sort(function (a, b) {
                var numA = a[sortby];
                var numB = b[sortby];
                return  numB - numA;
            });
            var resSliced = res.slice(0, 3);
            //console.log('resSliced',resSliced)
            state.topMixes = resSliced;
        },
        setMixes(state, payload) {
            state.mixes = payload.mixes;
        },
        setGenre(state, payload) {        
            state.genre = payload.genre
            // console.log('setGenre',state.genre)
        },
        setCurrSong(state, payload) {
            //console.log('setCurrSong state.genre',state)
            if (!this.currMix) return
            state.currSongPlaying = payload.song;
            state.currSongPlaying.isPlaying = true;
        },
        removeCurrSong(state, payload) {
            const idx = state.mixes[state.currMix._id].songs.findIndex(song => song.id === payload.song.id);
            state.mixes[state.currMix._id].songs.splice(idx, 1);
            //console.log(state.mixes[state.currMix._id].songs);
        },
        setMix(state, payload) {
            //console.log('setMix payload.mix',payload.mix)
            state.currMix = payload.mix;
        },
        setMixEmpty(state, payload) {
            state.currMix = null;
        },
        nowPlaying(state, payload) {
            state.isPlaying = payload.isPlaying;
        },
        stopSongPlaying(state, payload) {
            state.currSongPlaying.isPlaying = false
        },
        startSongPlaying(state, payload) {
            state.currSongPlaying.isPlaying = true
        },
        stopAllPlaying(state, payload) {
            payload.songs.forEach(currSong => {
                if (currSong.id !== payload.song.id) {
                    currSong.isPlaying = false;
                }
            })
        },
        setPrevSongNotPlaying(state, payload) {
            state.currMix.songs[payload.songIdx].isPlaying = false;
        },
        resetIconsState(state){
                state.currMix.songs.forEach(song => song.isPlaying = false)
        },
    },
    actions: {   
        async sendMsgWhatsApp(context) {
            var msg = await msgservice.sendMsg();
            //console.log('msgs',msg)
        },
        async getTopMixes(context) {
            var mixes = await mixService.query();
            context.commit({ type: 'setSortedMixes', mixes });
        },
        async getMixById(context, { mixId }) {
            const mix = await mixService.getById(mixId);
            context.commit({ type: 'setMix', mix });
        },
        async loadMixes(context) {
            var mixes = await mixService.query();
            context.commit({ type: 'setMixes', mixes });
            return mixes;
        }, 
        async getSongById(context, payload) {
            var song = await mixService.getSongByIdAndMix(payload.songId, payload.mixId);
            context.commit({ type: 'setCurrSong', song })
            return song;
        },
        async saveMix(context, payload) {
            //console.log('saveMix function payload mix',payload.mix)
            if(!payload.mix._id){
                //console.log('create mix',context)
                const newMix = await mixService.save(payload.mix);
                //console.log('newMix',newMix._id)
                context.commit({ type: 'setMix', mix:newMix })
                router.push(`/`)
                router.push(`/mix/details/${newMix._id}`)
            }else{
                //console.log('save mix',context)
                const mix = await mixService.update(payload.mix);
                context.commit({ type: 'setMix', mix })
                return mix
            }   
        },
        sortByNumber(array, sortby) {
            //console.log('sort')
            array.sort(function (a, b) {
                var numA = a[sortby];
                var numB = b[sortby];
                return numA - numB;
            });
        }
    },
}