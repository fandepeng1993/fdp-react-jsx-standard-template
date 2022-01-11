import React, {Suspense} from 'react';
import {MemoryRouter, HashRouter,Routes,Link} from 'react-router-dom';
import routes from '@/routers';
import {useSelector} from 'react-redux';
import routeWithSubRoutes from './layout/RouteWithSubRoutes';
import LazyLoading from './components/lazy-loading';

// import {useTranslation} from 'react-i18next';
// import LazyImage from "./components/lazy-image";

// 开发环境下启用哈希路由。生产环境下启用内存路由
const Router = process.env.NODE_ENV === 'development' ? HashRouter : MemoryRouter;

function App() {
  const {theme} = useSelector((state => state.settings));
  return (
    <div className={`${theme} App`}>
      <Router>
        <Suspense fallback={<LazyLoading/>}>
          <Routes>
            {routeWithSubRoutes(routes)}
          </Routes>
        </Suspense>
        <nav>
          <Link to="/">Layout</Link> |{' '}
          <Link to="/erizo">erizo</Link> |{' '}
          <Link to="/login">login</Link> |{' '}
          <Link to="/welcome">welcome</Link> |{' '}
          <Link to="/express">express</Link> |{' '}
        </nav>
      </Router>

    </div>
  );
}

export default App;
