const Test1 = () =>
  import(/* webpackChunkName: "todo-view" */ '@/views/test1.vue')
const Test2 = () =>
  import(/* webpackChunkName: "todo-view" */ '@/views/test2.vue')

export default [
  {
    path: '/test1',
    name: 'Test1',
    component: Test1
  },
  {
    path: '/test2',
    name: 'Test2',
    component: Test2
  }
]
