import {
  createRouter,
  createWebHistory
} from 'vue-router'
import About from '../views/About'
import Home from '../views/Home'
import Tasks from '../views/Tracker'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/tasks',
  name: 'Tasks',
  component: Tasks
},
{
  path: '/about',
  name: 'About',
  component: About
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
