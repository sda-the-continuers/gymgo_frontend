import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class ClipBoardIndicator extends Vue {
  copyToClipboard (copyText: string) {
    if ('clipboard' in navigator) {
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText)

      /* Alert the copied text */
      alert('Copied the text: ' + copyText)
    } else {
      console.log('don\'t have permission to write to clipboard')
    //   navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
    //     if (result.state === 'granted' || result.state === 'prompt') {
    //     }
    //   })
    }
  }
}
