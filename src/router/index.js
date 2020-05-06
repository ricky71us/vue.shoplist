import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import CategoryItems from "../views/CategoryItems.vue";
import Stores from "../views/Stores.vue";
import Categories from "../views/Categories.vue";
import Items from "../views/Items.vue";

Vue.use(VueRouter);
const parseProps = r => ({ id: parseInt(r.params.id) });
const routes = [
  {
    path: "/",
    redirect: "/login",
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
    path: "/home",
    name: "Home",
    component: Home,
  },  
  {
    path: '/categoryItems/:id',
    name: 'CategoryItems',
    props: parseProps,
    component: CategoryItems,
  },
  {
    path: "/stores",
    name: "Stores",
    component: Stores,
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
