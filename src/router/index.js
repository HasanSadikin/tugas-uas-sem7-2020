import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/galeri",
    name: "galeri",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Galeri.vue"),
  },
  {
    path: "/page-berita",
    name: "pageBerita",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PageBerita.vue"),
  },
  {
    path: "/page-prestasi",
    name: "pagePrestasi",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PagePrestasi.vue"),
  },
  {
    path: "/berita",
    name: "singlePost",
    component: () => import("../views/Berita.vue"),
    children: [
      {
        path: ":slug",
        component: () => import("../views/Post.vue"),
      },
    ],
  },
  {
    path: "/prestasi",
    name: "prestasi",
    component: () => import("../views/Prestasi.vue"),
    children: [
      {
        path: ":slug",
        component: () => import("../views/PrestasiPost.vue"),
      },
    ],
  },
  {
    path: "/profil",
    name: "profil",
    component: () => import("../views/Profil.vue"),
    children: [
      {
        path: "siswa",
        component: () => import("../views/Siswa.vue"),
      },
      {
        path: "alumni",
        component: () => import("../views/Alumni.vue"),
      },
      {
        path: "guru",
        component: () => import("../views/Guru.vue"),
      },
      {
        path: "visi-misi",
        component: () => import("../views/VisiMisi.vue"),
      },
      {
        path: "sejarah",
        component: () => import("../views/Sejarah.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
