import Vue from 'vue'
import GoogleBook from 'src/GoogleBook'

describe('GoogleBook.vue', () => {

    it('has a created hook', () => {
        expect(typeof GoogleBook.created).toBe('function')
    })

    it('should render correct contents', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(GoogleBook)
        })
        expect(vm.$el.querySelector('#wrapper div').textContent)
            .to.equal('Book loading...')
    })
})
