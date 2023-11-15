import React from 'react';
import {Navigate} from 'react-router-dom';
import Layout from '@/layout/index';
import NoPage from '@/layout/404/index';
const HomePage = React.lazy(() => import(/* webpackChunkName: "home-page" */ '@/pages/home'));
const LoginPage = React.lazy(() => import(/* webpackChunkName: "login-page" */ '@/pages/login'));
const Welcome = React.lazy(() => import(/* webpackChunkName: "welcome" */ '@/pages/welcome'));

/*测试懒加载loading代码*/
// const Welcome = React.lazy(()=>{
//       return new Promise((resolve)=>{
//         setTimeout(()=>{
//           resolve(import(/* webpackChunkName: "welcome" */ '@/pages/welcome'));
//         },4000)
//       });
// });


const routes = [
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
    element: <NoPage/>
  },
  {
    path: '/',
    element: <Layout/>,
    auth: false,
    children: [
      {
        // path: 'home',
        element: <HomePage/>,
        index: true
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/404"/>
}
];

export default routes;