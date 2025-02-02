import Vue from 'vue'
import App from './App.vue'
import makeDb from "./services/tracker"
import * as VueGoogleMaps from 'vue2-google-maps'
import store from "./store/store"
import BootstrapVue from 'bootstrap-vue'
import './assets/bootstrap.scss'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBeaMJwpElWYrW4q2F0E6iigPD0JsWsdI4',
    //libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
  region: 'RU',
  language: 'ru',

})
const vue = new Vue({
  store,
  db:makeDb(),
  render: h => h(App),
});

vue.$mount('#app');



