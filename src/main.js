import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

export const eventBus = new Vue();
new Vue({
  el: '#app',
  render: h => h(App)
})
