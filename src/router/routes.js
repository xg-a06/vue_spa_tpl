const Test1 = () => import(/* webpackChunkName: "test1" */ '@/views/Demo1.vue');
const Test2 = () => import(/* webpackChunkName: "test2" */ '@/views/Demo2.vue');

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
