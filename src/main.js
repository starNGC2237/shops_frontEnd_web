/*
 * @Author: zhilutianji
 * @Date: 2022-01-02 18:49:33
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-02 20:16:34
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\main.js
 */
import Vue from 'vue'
import App from '@/App.vue'
//引入路由
import router from '@/router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
