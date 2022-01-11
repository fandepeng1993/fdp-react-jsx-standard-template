import {Navigate} from 'react-router-dom';
//Redirect
import {useSelector} from 'react-redux';
import React from 'react';


const RouteGuard = ({children, ...route}) => {
  console.log('路由拦截器:', route);
  // 路由拦截器
  // const {route} = props;

  let token = useSelector(state => state.userInfo.userToken);
  // console.log(route,token);

  // 判断是否登录~~~
  // if (route.auth && !token) return (<Navigate to="/welcome" replace/>);
  // 如果已经登录
  if (route.path === '/login' && token) {
    //return <Redirect to="/"/>;
    return <Navigate to="/" replace/>;
  }
  if (route.path === '/welcome' && token) {
    // return <Redirect to="/"/>;
    return <Navigate to="/" replace/>;
  }
  return children;
};

export default RouteGuard;