import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/piggybank",
      name: "piggy bank",
      component: () => import("@/views/PiggyBankView.vue"),
    },
    {
      path: "/tickets",
      name: "tickets",
      component: () => import("@/views/TicketsView.vue"),
    },
  ],
});

export default router;
