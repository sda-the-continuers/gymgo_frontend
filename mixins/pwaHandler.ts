import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import { BeforeInstallPromptEvent, VuePwaInstallMixin } from 'vue-pwa-install'

@Component
export default class PwaHandler extends Mixins(VuePwaInstallMixin) {
  deferredPrompt: BeforeInstallPromptEvent

  created () {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('./sw.js')
    //     .then(function (registration) {
    //       console.log('Registration successful, scope is:', registration.scope)
    //     }).catch(function (err) {
    //       console.log('Service worker registration failed, error:', err)
    //     })
    // }
    this.$on('canInstall', (event: BeforeInstallPromptEvent) => {
      alert('can install pwa')

      // Prevent Chrome 67 and earlier from automatically showing the prompt:
      event.preventDefault()

      // Stash the event so it can be triggered later:
      this.deferredPrompt = event

      // to install pwa
      this.promptInstall()
    })
  }

  promptInstall () {
    if (this.deferredPrompt) {
      // Show the prompt:
      this.deferredPrompt.prompt()

      // Wait for the user to respond to the prompt:
      this.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }

        this.deferredPrompt = undefined
      })
    }
  }
}
