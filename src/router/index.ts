import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { main: true},
    children:[
      {
        path: '/',
        name: 'todayPlan',
        component: () => import('../views/todayPlan.vue'),
        meta: { main: true},
      },
      {
        path: '/weekPlan',
        name: 'WeekPlan',
        component: () => import('../views/weekPlan.vue'),
        meta: { main: true},
      },
      
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../views/Error.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
