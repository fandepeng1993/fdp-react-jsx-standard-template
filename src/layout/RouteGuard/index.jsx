import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import React from 'react';


const RouteGuard = (props) => {
  // 路由拦截器
  const {route} = props;

  let token = useSelector(state => state.userInfo.userToken);
  // console.log(route,token);

  // 判断是否登录~~~
  if (route.auth && !token) return (<Redirect to="/welcome"/>);
  // 如果已经登录
  if (route.path === '/login' && token) {
    return <Redirect to="/"/>;
  }
  if (route.path === '/welcome' && token) {
    return <Redirect to="/"/>;
  }
  return (<route.component {...props} routes={route.children}/>);
};

export default RouteGuard;