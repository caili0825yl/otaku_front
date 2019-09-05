import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import content from './views/content'
import search from './views/search'
import user from './views/user'
import edit from './views/edit'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/user',
      component: user
    },
    {
      path: '/edit',
      component: edit
    },
    {
      path: '/content/:id',
      component: content
    },
    {
      name: 'search',
      path: '/search/:search',
      component: search
    }
  ]
})
