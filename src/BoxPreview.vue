<template>
    <transition name="preview-book-fade">
        <div class="preview-book" v-if="isbn" @click="close">
            <transition :name="transition">
                <book-preview :isbn="isbn" :key="isbn" page-id="PA5" style="width: 600px; height: 700px"></book-preview>
            </transition>
            <div class="btn-preview-close" @click.stop="close"></div>
        </div>
    </transition>
</template>

<script>
  import store from './components/store'
  import BookPreview from './components/BookPreview.vue'

  export default {
    components: { BookPreview },
    data () {
      return {
        state: store.state,
        direction: 'top',
        style: {}
      }
    },
    methods: {
      close: function () {
        store.close()
      }
    },
    computed: {
      isbn: function () {
        if (this.state.index !== false) {
          return this.state.books[this.state.index]
        }
      },
      transition: function () {
        return 'preview-' + this.direction
      }
    }
  }
</script>

<style src="./bookpreview.less" lang="less"></style>