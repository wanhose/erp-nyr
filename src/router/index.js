import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Login from '../components/site/login/Login'
import Home from '../components/site/home/Home'
import Customers from '../components/site/customers/Customers'
import CustomerCreate from '../components/site/customers/CustomerCreate'
import CustomerEdit from '../components/site/customers/CustomerEdit'
import Tasks from '../components/site/tasks/Tasks'
import TaskCreate from '../components/site/tasks/TaskCreate'
import TaskEdit from '../components/site/tasks/TaskEdit'
import Billing from '../components/site/billing/Billing'
import DeliveryNotePreview from '../components/site/billing/deliveryNotes/DeliveryNotePreview'
import InvoicePreview from '../components/site/billing/invoices/InvoicePreview'
import DeliveryNoteCreate from '../components/site/billing/deliveryNotes/DeliveryNoteCreate'
import InvoiceCreate from '../components/site/billing/invoices/InvoiceCreate'
import Notifications from '../components/site/notifications/Notifications'
import Settings from '../components/site/settings/Settings'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Inicio'
      }
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Clientes'
      }
    },
    {
      path: '/customers/create',
      name: 'CustomerCreate',
      component: CustomerCreate,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Crear nuevo cliente'
      }
    },    
    {
      path: '/customers/edit/:id',
      name: 'CustomerEdit',
      component: CustomerEdit,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Editar cliente'
      }
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Tareas'
      }
    },
    {
      path: '/tasks/create',
      name: 'TaskCreate',
      component: TaskCreate,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Crear nueva tarea'
      }
    },
    {
      path: '/tasks/edit/:id',
      name: 'TaskEdit',
      component: TaskEdit,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Editar tarea'
      }
    },
    {
      path: '/billing',
      name: 'Billing',
      component: Billing,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Facturación'
      }
    },
    {
      path: '/billing/deliveryNote/:id',
      name: 'DeliveryNotePreview',
      component: DeliveryNotePreview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/billing/invoice/:id',
      name: 'InvoicePreview',
      component: InvoicePreview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/billing/createDeliveryNote',
      name: 'DeliveryNoteCreate',
      component: DeliveryNoteCreate,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Entregar tareas'
      }
    },
    {
      path: '/billing/createInvoice',
      name: 'InvoiceCreate',
      component: InvoiceCreate,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Facturar tareas'
      }
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Notificaciones'
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true
      },
      props: {
        title: 'Ajustes'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
  } else {
    // Proceed to route
    next()
  }
})

export default router