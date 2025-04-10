import App from './App'
import store from './store'  // 确保路径正确

import { TextEncoder, TextDecoder } from 'text-decoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    )
  }

  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0])
          } else {
            resolve(res[1])
          }
        })
      })
    },
  })
} catch (error) { }

const app = new Vue({
  store,  // 注入store
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)  // Vue3中使用use注入store
  return {
    app
  }
}
// #endif