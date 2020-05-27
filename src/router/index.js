import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import ManageCategories from "../views/ManageCategories.vue";
import ManageStores from "../views/ManageStores.vue";
import ManageItems from "../views/ManageItems.vue";
import test from "../views/test.vue";
import VueAnalytics from "vue-analytics";
import List from "../views/List.vue";

Vue.use(VueRouter);
//const parseProps = r => ({ id: parseInt(r.params.id) });
const routes = [
  {
    path: "/",
    redirect: "/Home",
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/managecategories",
    name: "ManageCategories",
    component: ManageCategories,
  },
  {
    path: "/managestores",
    name: "ManageStores",
    component: ManageStores,
  },
  {
    path: "/manageitems",
    name: "ManageItems",
    component: ManageItems,
  },
  {
    path: "/list",
    name: "list",
    component: List,
  },
  {
    path: "/test",
    name: "test",
    component: test,
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

Vue.use(VueAnalytics, {
  id: "UA-163162436-1",
  router,
});
export default router;
