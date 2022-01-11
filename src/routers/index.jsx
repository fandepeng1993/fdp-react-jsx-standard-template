import React from 'react';
import Layout from '@/layout/index';
const HomePage = React.lazy(() => import(/* webpackChunkName: "home-page" */ '@/pages/home'));
const LoginPage = React.lazy(() => import(/* webpackChunkName: "login-page" */ '@/pages/login'));
const Welcome = React.lazy(() => import(/* webpackChunkName: "welcome" */ '@/pages/welcome'));

/*测试懒加载loading代码*/
/*const Welcome = React.lazy(()=>{
      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve(import(/!* webpackChunkName: "welcome" *!/ '@/pages/welcome'));
        },4000)
      });
});*/

const Search = React.lazy(() => import(/* webpackChunkName: "search" */ '@/pages/search'));
const Coupon = React.lazy(() => import(/* webpackChunkName: "coupon" */ '@/pages/coupon'));
const History = React.lazy(() => import(/* webpackChunkName: "history" */ '@/pages/history'));


const routes = [
  {
    path: '/',
    element: <Layout/>,
    auth: true,
    children: [
      {
        // path: 'home',
        element: <HomePage/>,
        index: true
      },
      {
        path: 'search',
        element: <Search/>
      },
      {
        path: 'history',
        element: <History/>
      },
      {
        path: 'coupon',
        element: <Coupon/>
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/welcome',
    element: <Welcome/>
  },
  {
    path: '/404',
    element: <div>404</div>
  }
];

export default routes;