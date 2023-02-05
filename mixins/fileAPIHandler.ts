import Component from 'vue-class-component'
import Vue from 'vue'

@Component
export default class FileAPIHandler extends Vue {
  toFormData (data: Object): FormData {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return formData
  }

  readFile (file): Promise<FileReader['result']> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
}
