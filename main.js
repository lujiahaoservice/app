import Vue from 'vue'
import App from './App'
import store from './store'
const token = uni.getStorageSync('yq_token')
setTimeout(() => {
  if(!token) {
    uni.reLaunch({
      url: '/pages/login/login'
    })
  } else {
    uni.switchTab({
       url: '/pages/index/home/home'
    });
  }
}, 200)
const on = Vue.prototype.$on
// 防抖处理
Vue.prototype.$on = function (event, func) {
  let timer
  let newFunc = func
  if (event === 'click') {
    newFunc = function () {
      clearTimeout(timer)
      timer = setTimeout(function () {
        func.apply(this, arguments)
      }, 500)
    }
  }
  on.call(this, event, newFunc)
}

Vue.prototype.$on = function (event, func) {
  let previous = 0
  let newFunc = func
  if (event === 'click') {
    newFunc = function () {
      const now = new Date().getTime()
      if (previous + 1000 <= now) {
        func.apply(this, arguments)
        previous = now
      }
    }
  }
  on.call(this, event, newFunc)
}
Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
