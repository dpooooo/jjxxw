import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import HomeView from "./views/HomeView.vue";
import CategoryView from "./views/CategoryView.vue";
import DetailView from "./views/DetailView.vue";
import PublishView from "./views/PublishView.vue";
import AdminView from "./views/AdminView.vue";
import "./style.css";

const routes = [
  { path: "/", component: HomeView },
  { path: "/category/:slug", component: CategoryView },
  { path: "/post/:id", component: DetailView },
  { path: "/publish", component: PublishView },
  { path: "/admin", component: AdminView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount("#app");
