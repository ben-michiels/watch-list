import { RouteRecordRaw } from "vue-router";

import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";
import WatchListView from "../views/WatchListView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/list/:id",
    name: "WatchList",
    component: WatchListView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not Found",
    component: NotFound,
  },
];

export default routes;
