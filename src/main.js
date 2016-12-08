import Vue from 'vue'
import BoxPreview from './BoxPreview.vue'

Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#book-preview',
  components: { BoxPreview }
})
