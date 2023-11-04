import { createApp } from "vue";
import store from "@/store/pinia";
import router from "./router";
import "tailwindcss/tailwind.css";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);

app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('ion-')
}
app.use(store);
app.use(router);
app.mount("#app");
