<template>
    <div class="preview-book-wrapper" @click.stop>
        <div class="preview-loading" v-if="loading"><div></div></div>
        <div class="book-wrapper">
            <div class="panel-menu" v-show="show">
                <zoom-in size="md" variant="primary">salut les gens</zoom-in>
            </div>
            <div id="wrapper" class="book"></div>
        </div>
    </div>
</template>

<script>
import ZoomIn from './ZoomIn.vue'
import {Google, $} from '../utils'
import store from './store'

export default {
  name: 'book-preview',
  components: {
    ZoomIn
  },
  props: {
    /**
    * ISBN pf the book to show
    * @type isbn: string
    */
    isbn: {type: String, required: true, observer: 'isbnChange'},
    pageId: {
      type: String,
      default: null,
      validator: (value) => {
        return value.length === 3
      }
    }
  },
  data () {
    return {
      loading: 'Book loading...',
      viewer: null,
      state: store.state,
      show: false
    }
  },
  watch: {
    isbn: (val, oldVal) => { console.log('isbn: %s, old: %s', val, oldVal) }
  },
  created () {
    if (!this.loaded) {
      Google.books.load({'language': 'fr'})
    }
  },
  mounted () {
    if (!this.loaded) {
      Google.books.setOnLoadCallback(this.initialize)
      store.state.loaded = true
    }
  },
  methods: {
    initialize: function () {
      console.log('initialize::call')
      this.viewer = new Google.books.DefaultViewer(document.getElementById('wrapper'), { 'showLinkChrome': 'false' })
      this.viewer.load('ISBN:' + this.isbn, this.bookNotFound, this.bookFound)
    }
  },
  computed: {
    loaded: function () {
      if (this.state.index !== false) {
        return this.state.loaded
      }
    }
  },
  destroyed: function () {
    console.log('destroyed::call', Google.books, $)
  }
}
</script>

<style>
    #wrapper {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>
