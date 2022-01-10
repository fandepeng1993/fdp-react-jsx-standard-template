import React, {Suspense} from 'react';
import {MemoryRouter, Switch, HashRouter} from 'react-router-dom';
import routes from '@/routers';
import {useSelector} from 'react-redux';
import RouteWithSubRoutes from './layout/RouteWithSubRoutes';
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
          <Switch>
            {
              routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route}/>
              ))
            }
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
