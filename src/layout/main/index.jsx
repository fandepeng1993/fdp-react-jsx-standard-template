import './index.less';
import React, {Suspense} from 'react';
import {NavLink, Switch} from 'react-router-dom';
import LazyLoading from '../../components/lazy-loading';
import RouteWithSubRoutes from '../RouteWithSubRoutes';


const Layout = (props) => {
  const {routes = []} = props;
  // console.log(routes);
  return (
    <>
      <div className="main-body">
        <Suspense fallback={<LazyLoading/>}>
          <Switch>
            {
              routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route}/>
              ))
            }
          </Switch>
        </Suspense>
      </div>
      <div className="main-footer">
        <NavLink to="/search" className='navLink' activeClassName="main-selected">SEARCH</NavLink>
        <NavLink to="/history" className='navLink' activeClassName="main-selected">HISTORY</NavLink>
        <NavLink to="/coupon" className='navLink' activeClassName="main-selected">COUPON</NavLink>
      </div>
    </>
  );
};
export default Layout;