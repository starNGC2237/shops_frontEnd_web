/*
 * @Author: zhilutianji
 * @Date: 2022-01-02 18:49:33
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-02 22:09:39
 * @Description: file content
 * @FilePath: \shops_frontend_web\src\main.js
 */
import Vue from 'vue'
import App from '@/App.vue'
// 引入路由
import router from '@/router'
// 引入vuex的store
import store from './store'
// 引入css重置
import 'normalize.css/normalize.css'
// 按需引入element-ui
import { Card, Button, Col, Row, Result, Image, Icon, Form, FormItem, Input, Submenu, MenuItem, Menu } from 'element-ui'

Vue.config.productionTip = false
Vue.component(Card.name, Card)
Vue.component(Button.name, Button)
Vue.component(Col.name, Col)
Vue.component(Row.name, Row)
Vue.component(Result.name, Result)
Vue.component(Image.name, Image)
Vue.component(Icon.name, Icon)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Menu.name, Menu)
new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
