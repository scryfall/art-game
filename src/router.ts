import { createWebHistory, createRouter } from "vue-router";

import SettingsScreen from "./pages/SettingsScreen.vue";
import NotFound from "./pages/NotFound.vue";
import Format from "./pages/Format.vue";
import PickModeScreen from "./pages/PickModeScreen.vue";
import CustomGame from "./pages/CustomGame.vue";

const routes = [
  { path: "/", component: PickModeScreen },
  { path: "/settings", component: SettingsScreen },
  {
    path: "/format/",
    children: [
      {
        path: "standard",
        component: Format,
      },
      {
        path: "pioneer",
        component: Format,
      },
      {
        path: "modern",
        component: Format,
      },
      {
        path: "vintage",
        component: Format,
      },
    ],
  },
  {
    path: "/custom",
    component: CustomGame,
  },

  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
