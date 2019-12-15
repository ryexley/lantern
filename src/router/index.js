import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  if (to.name === from.name && to.query !== from.query) {
    return null
  }

  if (savedPosition) {
    return savedPosition
  }

  return { x: 0, y: 0 }
}

const Home = () => import(/* webpackChunkName: "home" */ "@/views/home")
const PassageRotator = () => import(/* webpackChunkName: "passage-rotator" */ "@/views/passage-rotator")

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/collection/:slug",
      name: "collection",
      component: PassageRotator
    },
    {
      // this route is a catch-all and should always be last
      path: "*",
      redirect: { path: "/" }
    }
  ]
})
