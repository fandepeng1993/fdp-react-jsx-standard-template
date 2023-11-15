import { useSelector } from 'react-redux';
import React, {Suspense, useMemo} from 'react';
import {MemoryRouter, HashRouter,Routes,Link} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import routes from '@/routers';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import routeWithSubRoutes from './layout/RouteWithSubRoutes';
import LazyLoading from './components/lazy-loading';

// 开发环境下启用哈希路由。生产环境下启用内存路由
const Router = process.env.NODE_ENV === 'development' ? HashRouter : HashRouter;
function App() {
  const {language} = useSelector((state => state.settings));
  const locale = useMemo(()=>{
    let _locale = null;
    switch(language){
      case 'en-US':
        _locale = enUS;
        break;
      case 'zh-CN':
        _locale = zhCN;
      default:
        break;
    }
    return _locale;
  },[language])

  return (
    <ConfigProvider locale={locale}>
      <div className={`App`}>
        <Router>
          <Suspense fallback={<LazyLoading/>}>
            <Routes>
              {routeWithSubRoutes(routes)}
            </Routes>
          </Suspense>
      </Router>
    </div>
  </ConfigProvider>
  );
}

export default App;
