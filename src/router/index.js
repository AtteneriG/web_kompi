import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/MainPage.vue")
    },
    {
      path: "/FilterAnimals",
      name: "FilterAnimals",
      component: () => import("../views/FilterAnimals.vue")
    },
    {
      path: "/FormUser",
      name: "FormUser",
      component: () => import("../views/FormUser.vue")
    },

    {
      path: "/TemplateCat",
      name: "TemplateCat",
      component: () => import("../views/TemplateCat.vue")
    },
    {
      path: "/TemplateDog",
      name: "TemplateDoge",
      component: () => import("../views/TemplateDog.vue")
    },
    {
      path: "/TemplateReptile",
      name: "TemplateReptile",
      component: () => import("../views/TemplateReptile.vue")
    },
    {
      path: "/TemplateBird",
      name: "TemplateBird",
      component: () => import("../views/TemplateBird.vue")
    },
    {
      path: "/TemplateRodent",
      name: "TemplateRodent",
      component: () => import("../views/TemplateRodent.vue")
    },
    {
      path: "/NewAnimalForm",
      name: "NewAnimalForm",
      component: () => import("../views/NewAnimalForm.vue"),
    },
    {
      path: "/FormCard",
      name: "FormCard",
      component: () => import("../views/FormCard.vue")
    },
    {
      path: "/Login",
      name: "Login",
      component: () => import("../views/login.vue")
    },
    {
      path: "/Signin",
      name: "Signin",
      component: () => import("../views/Signin.vue")
    },
    {
      path: "/ForgotPassword",
      name: "ForgotPassword",
      component: () => import("../views/ForgotPassword.vue")
    },
    {
      path: "/NewUser",
      name: "NewUser",
      component: () => import("../views/NewUser.vue")
    },
    {
      path: "/OptionsNewUser",
      name: "OptionsNewUser",
      component: () => import("../views/OptionsNewUser.vue")
    },
    {
      path: "/AboutMe",
      name: "AboutMe",
      component: () => import("../views/Aboutme.vue")
    },
    {
      path: "/PrivacyPolicy",
      name: "PrivacyPolicy",
      component: () => import("../views/PrivacyPolicy.vue")
    },
    {
      path: "/Terms&Conditions",
      name: "Terms&Conditions",
      component: () => import("../views/Terms&Conditions.vue")
    },
    {
      path: "/:pathMach(.)",
      component: () => import("../views/Error404.vue")
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    console.log(to);
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },

});

export default router;
