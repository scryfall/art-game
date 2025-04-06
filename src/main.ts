import { createApp } from "vue";
import "./styles/main.scss";
import App from "./App.vue";
import { provideStoreToApp } from "@reduxjs/vue-redux";
import { loadConfig, store } from "./store";

const app = createApp(App);
store.dispatch(loadConfig());
provideStoreToApp(app, { store });
app.mount("#app");
