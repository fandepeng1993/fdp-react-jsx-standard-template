import {Route} from 'react-router-dom';
import RouteGuard from '../RouteGuard';

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      render={(props) => (<RouteGuard {...props} route={route}/>)}
    />
  );

};
export default RouteWithSubRoutes;