const TEST_ROUTES = [
  {
    path: '/test-date-select',
    name: 'TestDateSelect',
    component: () => import('@/test/date-select.vue'),
  },
  {
    path: '/test-enum-select',
    name: 'TestEnumSelect',
    component: () => import('@/test/enum-select.vue'),
  },
  {
    path: '/test-form',
    name: 'TestForm',
    component: () => import('@/test/form.vue'),
  },
];

export default TEST_ROUTES;
