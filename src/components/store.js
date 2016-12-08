import Vue from 'vue'

class Books {
  constructor () {
    this.state = { books: [], index: false, loaded: null }
  }
  close () {
    this.state.index = false
  }
}

let store = new Books()

Vue.directive('preview', {
  bind: function (el, binding, vnode) {
    if (store.state.books === undefined) Vue.set(store.state.books, [])
    let index = store.state.books.push(el.getAttribute('isbn'))
    let open = function (i) {
      return function (e) {
        e.preventDefault()
        store.state.index = i
      }
    }
    el.addEventListener('click', open(index - 1))
  }
})

export default store
