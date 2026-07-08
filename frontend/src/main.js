import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import HomeView from "./views/HomeCleanView.vue";
import CategoryView from "./views/CategoryCleanView.vue";
import DetailView from "./views/DetailView.vue";
import PublishView from "./views/PublishView.vue";
import AdminView from "./views/AdminView.vue";
import LoginView from "./views/LoginView.vue";
import { useAuth } from "./composables/useAuth.js";
import "./style.css";

const routes = [
  { path: "/", component: HomeView },
  { path: "/category/:slug", component: CategoryView },
  { path: "/post/:id", component: DetailView },
  { path: "/publish", component: PublishView },
  { path: "/login", component: LoginView, meta: { hideLayout: true } },
  { path: "/admin", component: AdminView, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const { check, user } = useAuth();

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return;
  await check();
  if (user.value === false) return "/login";
});

createApp(App).use(router).mount("#app");
