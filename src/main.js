// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Tab, Tabs, Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Cell, CellGroup, PullRefresh, Stepper, SubmitBar, Tabbar, TabbarItem, AddressList} from 'vant'

Vue.use(Tabs).use(Tab).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Cell).use(CellGroup).use(PullRefresh).use(Stepper)
  .use(SubmitBar).use(Tabbar).use(TabbarItem).use(AddressList)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
