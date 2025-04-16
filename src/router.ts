import { createWebHistory, createRouter } from "vue-router";

import ScreenManager from "./pages/ScreenManager.vue";
import SettingsScreen from "./pages/SettingsScreen.vue";

const routes = [
  { path: "/", component: ScreenManager },
  { path: "/settings", component: SettingsScreen },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
