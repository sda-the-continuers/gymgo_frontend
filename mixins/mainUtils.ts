import Component from 'vue-class-component'
import Vue from 'vue'

@Component
export default class MainUtils extends Vue {
  cloneObject<T extends object> (object: T, debugMode = false): T {
    if (debugMode) {
      console.log('cloning object')
      console.log(object)
    }
    return JSON.parse(JSON.stringify(object))
  }
}
