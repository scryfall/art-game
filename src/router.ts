import { createWebHistory, createRouter } from "vue-router";

import ScreenManager from "./pages/ScreenManager.vue";
import SettingsScreen from "./pages/SettingsScreen.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  { path: "/", component: ScreenManager },
  { path: "/settings", component: SettingsScreen },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
