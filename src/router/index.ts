import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import InvoiceForm from '@/views/InvoiceForm.vue'
import InvoiceView from '@/views/InvoiceView.vue'
import InvalidRoute from '@/views/InvalidRoute.vue'
import CryptoView from '@/views/CryptoAddressView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: InvoiceForm
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: InvoiceForm
    },
    {
      path: '/invoice/:id',
      name: 'InvoiceView',
      component: InvoiceView
    },
    {
      path: '/addresses',
      name: 'AddressView',
      component: CryptoView
    },
    {
      path: '/:catchAll(.*)', // Use the * as a catch-all parameter
      name: 'InvalidRoute', // Give it a name
      component: InvalidRoute
    }

  ]
})

export default router
