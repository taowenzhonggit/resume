import Promise from 'bluebird'
import {handleChar} from 'common/js/util'

const endOfSentence = /[？！。~]$/
const comma = /[，;、、]$/
const eng = /^[a-z]|[A-Z]$/

export const writeMixin = {
  data() {
    return {
      text: '',
      speed: 40
    }
  },
  created() {
    this.styleBuffer = ''
  },
  methods: {
    async writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval) {
      if (this.$root.animationSkipped) {
        throw new Error('SKIP IT')
      }
      let chars = message.slice(index, index + charsPerInterval)
      index += charsPerInterval

      el.scrollTop = el.scrollHeight

      if (mirrorToStyle) {
        this.writeChar(chars)
      } else {
        this.writeSimpleChar(chars)
      }

      if (index < message.length) {
        let thisInterval = interval
        let thisSlice = message.slice(index - 1, index)
        if (eng.test(thisSlice)) {
          thisInterval = interval / 2
        }
        if (comma.test(thisSlice)) {
          thisInterval = interval * 10
        }
        if (endOfSentence.test(thisSlice)) {
          thisInterval = interval * 20
        }
        thisSlice = message.slice(index - 1, index + 1)
        do {
          console.log(thisInterval)
          await Promise.delay(thisInterval)
        } while (this.$root.paused)

        return this.writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval)
      }
    },
    writeChar(char) {
      this.text = handleChar(this.text, char)
      this.styleBuffer += char
      if (char === ';') {
        this.$root.$emit('styleAppend', this.styleBuffer)
        this.styleBuffer = ''
      }
    },
    writeSimpleChar(char) {
      this.text += char
    }
  }
}
