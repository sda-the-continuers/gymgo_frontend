import Vue from 'vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
Vue.use(VuePersianDatetimePicker, {
  name: 'custom-date-picker',
  props: {
    format: 'YYYY-MM-DD',
    displayFormat: 'jYYYY-jMM-jDD',
    editable: false,
    inputClass: 'form-control my-custom-class-name',
    placeholder: 'Please select a date',
    altFormat: 'YYYY-MM-DD',
    color: '#00acc1',
    autoSubmit: true
  }
})
