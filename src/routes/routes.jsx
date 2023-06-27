import config from '@/config';

// Pages
import Home from '@/pages/Home';

//do not sign in
const publicRoutes = [{ path: config.routes.home, component: Home }];

//have to sign in
const privateRoutes = [];

export { publicRoutes, privateRoutes };
