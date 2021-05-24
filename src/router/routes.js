const Test1 = () => import(/* webpackChunkName: "test1" */ '@/views/Test1');
const Test2 = () => import(/* webpackChunkName: "test2" */ '@/views/Test2');

export default [
  {
    path: '/test1',
    name: 'Test1',
    component: Test1,
  },
  {
    path: '/test2',
    name: 'Test2',
    component: Test2,
  },
];
