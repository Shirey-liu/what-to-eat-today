import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ThemePage from '@/pages/ThemePage.vue'
import ResultPage from '@/pages/ResultPage.vue'
import HistoryPage from '@/pages/HistoryPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/theme',
    name: 'theme',
    component: ThemePage,
  },
  {
    path: '/result',
    name: 'result',
    component: ResultPage,
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
