<template>
    <div class="book-preview" @click.stop>
        <div class="lightbox__loading" v-if="loading"><div>{{ loading }}</div></div>
        <div class="book">
            <div class="panel-menu" v-show="show">
                <zoom-in size="md" variant="primary">salut les gens</zoom-in>
            </div>
            <div id="wrapper" class="book-wrapper"></div>
        </div>
    </div>
</template>

<script>
import ZoomIn from './components/ZoomIn.vue'
import {Google, $} from './utils'

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
      show: false,
      style: {}
    }
  },
  watch: {
    isbn: (val, oldVal) => { console.log('isbn: %s, old: %s', val, oldVal) }
  },
  created () {
    console.log('created::call')
    Google.books.load({'language': 'fr'})
  },
  mounted () {
    console.log('mounted::call')
    Google.books.setOnLoadCallback(this.initialize)
  },
  methods: {
    initialize () {
      console.log('initialize::call')
      this.viewer = new Google.books.DefaultViewer(document.getElementById('wrapper'), { 'showLinkChrome': 'false' })
      this.viewer.load('ISBN:' + this.isbn, this.bookNotFound, this.bookFound)
    },
    bookNotFound () {
      this.loading = 'Book not found'
      console.log('Book Not Found', $)
      document.querySelector('.book-preview').removeChild(document.querySelector('#wrapper'))
    },
    bookFound () {
      this.loading = null
      this.show = true
      /** this.show = true **/
      if (this.pageId) this.viewer.goToPageId(this.pageId)
      else this.pageId = this.viewer.getPageId()
      /** document.querySelector('#wrapper > div > div').removeChild(document.querySelector('#wrapper > div > div > div:nth-child(2)')) **/
      /** Removing google tool bar **/
      document.querySelector('#wrapper > div').removeChild(document.querySelector('#wrapper > div > div:nth-child(2)'))
      document.querySelector('#wrapper > div > div > div:nth-child(1)').addEventListener('scroll', () => {
        /** this.set('page-id', this.viewer.getPageId()) **/
        console.log('scroll', this.viewer.getPageId())
      })
      this.onIronResize()
    },
    isbnChange (o, n) {
      if (o !== n && typeof this.viewer !== 'undefined') {
        this.viewer.load('ISBN:' + n, (s) => { console.log(s) })
      }
    },
    onIronResize () {
      if (typeof this.viewer !== 'undefined') {
        this.viewer.resize()
      }
    },
    pageIdChange (o, n) {
      if (o !== n && typeof this.viewer !== 'undefined') {
        this.viewer.goToPageId(n)
        this.set('pageId', this.viewer.getPageNumber())
      }
    },
    nextPage () {
      /** Go to the next page in the book. */
      if (typeof this.viewer !== 'undefined') {
        return this.viewer.nextPage()
      }
    },
    /** Go to the previous page in the book. */
    previousPage () {
      if (typeof this.viewer !== 'undefined') {
        return this.viewer.previousPage()
      }
    },
    /** Zoom into the viewer. */
    zoomIn () {
      if (typeof this.viewer !== 'undefined') {
        return this.viewer.zoomIn()
      }
    },
    /** Zoom out of the viewer. */
    zoomOut () {
      if (typeof this.viewer !== 'undefined') {
        return this.viewer.zoomOut()
      }
    },
    /** Goto a given page number. */
    gotoPageNumber (n) {
      if (typeof this.viewer !== 'undefined') {
        return this.viewer.goToPage(n)
      }
    },
    /** Goto a page using its identifier. */
    gotoPageId (n) {
      if (typeof this.viewer !== 'undefined') {
        return this.viewer.goToPage(n)
      }
    }
  },
  destroyed: function () {
    console.log('destroyed::call', this.viewer)
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
