import Vue from 'vue'
import BookPreview from './App.vue'

Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#preview',
  components: { BookPreview }
})
