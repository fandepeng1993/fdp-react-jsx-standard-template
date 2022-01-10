import React from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '@/layout/main';
// const Layout = React.lazy(()=>import('@/layout/main'));
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
    path: '/login',
    component: LoginPage,
    exact: true,
    children: []
  },
  {
    path: '/welcome',
    component: Welcome,
    exact: true,
    children: []
  },
  {
    path: '/404',
    exact: true,
    component: () => {
      return (<div>404</div>);
    }
  },
  {
    path: '/',
    // exact:true,
    // auth: true,
    component: Layout,
    children: [
      {
        path: '/search',
        component: Search
      },
      {
        path: '/coupon',
        component: Coupon
      },
      {
        path: '/history',
        component: History
      },
      {
        path: '/testPath',
        component: HomePage
      },
      {
        path: '/',
        exact: true,
        component: () => <Redirect to="/search"/>
      },
      {
        path: '*',
        component: () => <Redirect to="/search"/>
      }
      // {
      //     path:'/',
      //     component:()=> <Redirect to="/search" />,
      //     // redirect:'/search'
      // }
    ]
  }
  // {
  //     path:"*",
  //     redirect:'/'
  // }
];

export default routes;