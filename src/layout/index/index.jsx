import {Routes, Outlet, Route, Link} from 'react-router-dom';
import React from 'react';


const Layout = (props) => {
  console.log('layout', props);
  const {routes = []} = props;
  return (
    <React.Fragment>
      <div>layout</div>
      <Outlet />
      <nav>
        <Link to="search">search</Link> |{' '}
        <Link to="history">history</Link> |{' '}
        <Link to="coupon">coupon</Link>
      </nav>

    </React.Fragment>

  );
};
export default Layout;