import { createWebHistory, createRouter } from "vue-router";

import NotFound from "./pages/NotFound.vue";
import FormatGame from "./pages/FormatGame.vue";
import PickModeScreen from "./pages/PickModeScreen.vue";
import CustomGame from "./pages/CustomGame.vue";
import CustomGameSetup from "./pages/CustomGameSetup.vue";

const routes = [
  { path: "/", component: PickModeScreen },
  {
    path: "/game/",
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
      {
        path: "custom",
        component: CustomGame,
      },
    ],
  },
  {
    path: "/custom",
    component: CustomGameSetup,
  },

  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
