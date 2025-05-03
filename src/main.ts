import "./styles/main.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { provideStoreToApp } from "@reduxjs/vue-redux";
import { store } from "./store";

const app = createApp(App).use(createPinia()).use(router);
provideStoreToApp(app, { store });
app.mount("#app");
