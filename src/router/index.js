import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import ViewUI from 'view-design'
import { setToken, getToken } from '@/libs/utils'

Vue.use(VueRouter)

const LOGIN_PAGE_NAME = 'login'
const HOME_PAGE_NAME = 'home'
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 避免冗余导航
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
    const token = getToken()
    ViewUI.LoadingBar.start()



    if (!token && to.name !== LOGIN_PAGE_NAME) {
        next({ name: LOGIN_PAGE_NAME })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        next()
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        if (from.name === HOME_PAGE_NAME) ViewUI.LoadingBar.finish()
        next({ name: HOME_PAGE_NAME })
    } else {
        next()
    }
});

router.afterEach(route => {
    ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0)
});

export default router
