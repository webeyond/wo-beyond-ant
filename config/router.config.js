export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
        ],
      },
      // 前评估
      {
        path: '/before',
        icon: 'dot-chart',
        name: 'before',
        routes: [
          {
            path: '/before/funnel',
            name: 'funnel',
            component: './Before/Funnel',
          },
          {
            path: '/before/potentiallist',
            name: 'potentiallist',
            component: './Before/PotentialList',
          },
          // {
          //   path: '/before/potentialdetail',
          //   name: 'potentialdetail',
          //   component: './Before/PotentialDetail',
          // },
        ],
      },
      // 后评估
      {
        path: '/after',
        icon: 'line-chart',
        name: 'after',
        routes: [
          {
            path: '/after/countmap',
            name: 'countmap',
            component: './After/CountMap',
          },
          {
            path: '/after/salesbytime',
            name: 'salesbytime',
            component: './After/SalesByTime',
          },
          {
            path: '/after/topsales',
            name: 'topsales',
            component: './After/TopSales',
          },
          {
            path: '/after/quota',
            name: 'quota',
            component: './After/Quota',
          },
        ],
      },
      // workers
      {
        path: '/workers',
        icon: 'team',
        name: 'workers',
        routes: [
          {
            path: '/workers/workerinfo',
            name: 'workerinfo',
            component: './Workers/WorkerInfo',
          },
        ],
      },
      // orders
      {
        path: '/orders',
        icon: 'shop',
        name: 'orders',
        routes: [
          {
            path: '/orders/orderdetail',
            name: 'orderdetail',
            component: './Orders/OrderDetail',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
