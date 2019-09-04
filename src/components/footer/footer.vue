<template>
  <footer>
    <a href="#" v-show="!isEnd" @click.prevent="togglePause">{{ text }}</a>
    <a href="#" v-show="!isEnd" @click.prevent="skip">跳过动画 --></a>
  </footer>
</template>

<script>
  const STATE_RUNNING = 0
  const STATE_PAUSED = 1
  const pauseText = ['暂停 ||', '继续 >>']

  export default {
    name: 'v-footer',
    data() {
      return {
        state: STATE_RUNNING,
        isEnd: false
      }
    },
    computed: {
      text() {
        return pauseText[this.state]
      }
    },
    methods: {
      togglePause() {
        this.state = this.state === STATE_RUNNING ? STATE_PAUSED : STATE_RUNNING
        this.$root.$emit('togglePause', this.state)
      },
      skip() {
        this.$root.$emit('skip')
      },
      end() {
        this.isEnd = true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  footer
    position: absolute
    bottom: 0
    left: 50%
    transform: translate3d(-50%, 50%, 0)
    .icon
      margin-left: 10px
      vertical-align: bottom
</style>
