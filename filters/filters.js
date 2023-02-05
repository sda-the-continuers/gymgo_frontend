import Vue from 'vue'

Vue.filter('toPersianDigits', function (value) {
  const persianDigits = {
    0: '۰',
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹'
  }
  return String(value).split('').map(c => c in persianDigits ? persianDigits[c] : c).join('')
})

Vue.filter('toEnglishDigits', function (value) {
  const English = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9'
  }
  return String(value).split('').map(c => c in English ? English[c] : c).join('')
})
