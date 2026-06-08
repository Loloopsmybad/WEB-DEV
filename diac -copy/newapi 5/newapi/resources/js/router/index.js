import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/pages/Login.vue'
import Arbitration from '../components/pages/Arbitration.vue'
import AdminDashboard from '../components/pages/AdminDashboard.vue'
import AdministrativeOfficerDashboard from '../components/pages/AdministrativeOfficerDashboard.vue'
import UserDashboard from '../components/pages/UserDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
  },

  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },

  {
    path:'/accounts',
    name:'accounts',
    component:()=>import('../components/pages/AccountsDashboard.vue'),
    meta:{ requiresAuth:true, role:'accounts' }
  },
  
  {
    path:'/case-manager',
    name:'caseManager',
    component:()=>import('../components/pages/CaseManagerDashboard.vue'),
    meta:{ requiresAuth:true, role:'case_filer_manager' }
  },

  {
    path: '/arbitration',
    name: 'arbitration',
    component: Arbitration,
    meta: { requiresAuth: true, role: 'user' },
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'user' }
  },

  {
    path: '/ao',
    name: 'ao',
    component: AdministrativeOfficerDashboard,
    meta: { requiresAuth: true, role: 'administrative_officer' },
  },

  /* 🔥 PROFILE ROUTES */

  {
    path:'/profile',
    name:'profile',
    component:()=>import('../components/pages/Profile.vue'),
    meta:{ requiresAuth:true }
  },
  
  {
    path:'/change-password',
    name:'changePassword',
    component:()=>import('../components/pages/ChangePassword.vue'),
    meta:{ requiresAuth:true }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * 🔐 AUTH + ROLE GUARD
 */
router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  
  if (to.meta.requiresAuth) {
  
  if (!token) {
  return next('/login')
  }
  
  if (to.meta.role && to.meta.role !== role) {
  return next('/login')
  }
  
  }
  
  if (to.path === '/login' && token) {
  
  if (role === 'admin') {
  return next('/admin')
  }
  
  if (role === 'administrative_officer') {
  return next('/ao')
  }
  
  if (role === 'accounts') {
  return next('/accounts')
  }
  
  if (role === 'case_filer_manager') {
  return next('/case-manager')
  }
  
  return next('/dashboard')
  
  }
  
  next()
  
  })

export default router