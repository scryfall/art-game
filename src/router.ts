import { createWebHistory, createRouter } from "vue-router";

import ScreenManager from "./components/ScreenManager.vue";

const routes = [{ path: "/", component: ScreenManager }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
