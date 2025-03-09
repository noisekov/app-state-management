import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
    route('/*', './page/notFound.tsx'),
    route('*?', 'catchall.tsx'),
] satisfies RouteConfig;
