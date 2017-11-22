import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PlainScore from '../components/SZG/PlainScore/PlainScore.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/plain',
      name:'plain',
      component:PlainScore
    }
  ]
})
