import Vue from 'vue'
import day from 'dayjs'

Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return day(value).format(format)
})
