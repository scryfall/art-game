import { createWebHistory, createRouter } from "vue-router";

import SettingsScreen from "./pages/SettingsScreen.vue";
import NotFound from "./pages/NotFound.vue";
import FormatGame from "./pages/FormatGame.vue";
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
        component: FormatGame,
      },
      {
        path: "pioneer",
        component: FormatGame,
      },
      {
        path: "modern",
        component: FormatGame,
      },
      {
        path: "vintage",
        component: FormatGame,
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
