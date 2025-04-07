// import { EXCEPTION_COMPONENT, LAYOUT } from '@/router/constant';

import { asyncRoutes } from '/@/router/routes';

// export const ROUTE_MAP = {
//   Dashboard: LAYOUT,
//   Analysis: () => import('/@/views/dashboard/analysis/index.vue'),
//   Workbench: () => import('/@/views/dashboard/workbench/index.vue'),
//   NOT_FOUND: EXCEPTION_COMPONENT,
//   About: LAYOUT,
//   AboutPage: () => import('/@/views/sys/about/index.vue'),
//   Charts: LAYOUT,
// };

const newRoutes = {};
function generateRouteMap(routes) {
  return routes.map((item) => {
    if (item.children && item.children.length > 0) {
      generateRouteMap(item.children);
    }
    newRoutes[item.name] = item.component;
  });
}
generateRouteMap(asyncRoutes);
console.log(newRoutes, 'newRoutes')
export const ROUTE_MAP = newRoutes;
