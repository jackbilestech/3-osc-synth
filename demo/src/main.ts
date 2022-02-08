import Vue from 'vue'
import App from './App.vue'
import 'es6-promise/auto'
import store from './store';
import KnobControl from 'vue-knob-control'
import vuetify from './plugins/vuetify'

Vue.use(KnobControl)

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
