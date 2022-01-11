import {Route} from 'react-router-dom';
import RouteGuard from '../RouteGuard';


const routeWithSubRoutes = (routes = []) => {
  return routes.map((route, inx) => {
    return (
      <Route key={inx}  {...route} element={<RouteGuard {...route}>{route.element}</RouteGuard>}
             path={route.path}>
        {route.children ? routeWithSubRoutes(route.children) : null}
      </Route>
    );
  });
};
export default routeWithSubRoutes;