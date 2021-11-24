import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/store.js'
import './styles/styles.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueYoutube from 'vue-youtube';
import VueCarousel from 'vue-carousel';
import MarqueeText from 'vue-marquee-text-component'
import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import "vue-navigation-bar/dist/vue-navigation-bar.css";
 
// import the library
import VueNavigationBar from "vue-navigation-bar";
Vue.component("vue-navigation-bar", VueNavigationBar)


Vue.component('marquee-text', MarqueeText)
Vue.use(VueYoutube);
Vue.use(ElementUI);
Vue.component('vue-draggable-resizable', VueDraggableResizable)


var bus = new Vue()
export const eventBus = bus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

