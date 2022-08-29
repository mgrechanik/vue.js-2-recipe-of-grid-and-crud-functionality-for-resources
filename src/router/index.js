import Vue from 'vue'
import VueRouter from 'vue-router'


import OmegasGridPage from '../views/OmegasGridPage.vue'
import OmegaEdit from '../views/OmegaEdit.vue'

import ProfilesGridPage from '../views/ProfilesGridPage.vue'
import ProfileEdit from '../views/ProfileEdit.vue'


Vue.use(VueRouter)

  const routes = [
    //////
    // OMEGA ROUTES
    /////
    {
      path: '/',
      name: 'omegas-grid-page',
      component: OmegasGridPage,
      props: true
    }, 
    {
      path: '/omega-create',
      name: 'omega_create',
      component: OmegaEdit,
      props: true
    }, 
    {
      path: '/omega-update/:id',
      name: 'omega_update',
      component: OmegaEdit,
      props: true
    }, 
    //////
    // END OMEGA ROUTES
    /////    
    
    
    {
      path: '/profiles',
      name: 'profiles-grid-page',
      component: ProfilesGridPage,
      props: true
    }, 
    {
      path: '/profile-create',
      name: 'profile_create',
      component: ProfileEdit,
      props: true
    }, 
    {
      path: '/profile-update/:id',
      name: 'profile_update',
      component: ProfileEdit,
      props: true
    },    
 
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
