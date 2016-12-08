<template>
    <button :class="['btn',btnVariant,btnSize,btnBlock,btnDisabled,inactive?'btn-inactive':'']"
         @click.stop.prevent="zoomIn">
        <slot></slot>
    </button>
</template>

<script>
export default {
  name: 'zoom-in',
  replace: true,
  props: {
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    inactive: { type: Boolean, default: false },
    role: { type: String, default: '' },
    size: { type: String, default: 'md' },
    variant: { type: String, default: 'default' }
  },
  computed: {
    btnBlock () { return this.block ? `btn-block` : `` },
    btnVariant () { return !this.variant || this.variant === `default` ? `btn-secondary` : `btn-${this.variant}` },
    btnSize () { return !this.size || this.size === `default` ? `` : `btn-${this.size}` },
    btnDisabled () { return this.disabled ? 'disabled' : '' }
  },
  methods: {
    zoomIn: function () { this.$emit('click', 'zoom::in') }
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
