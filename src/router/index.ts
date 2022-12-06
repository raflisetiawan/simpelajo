import { createRouter, createWebHistory } from "vue-router";
import getUser from "@/services/user/getUser";
import getCurrentUser from "@/services/auth/getCurrentUser";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "WargaDesa",
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "/keluhan",
          name: "Keluhan",
          component: () => import("@/views/KeluhanView.vue"),
        },
        {
          path: "/services",
          children: [
            {
              path: "",
              name: "Services",
              component: () => import("@/views/service/Index.vue"),
            },
            {
              path: "create/:slug",
              name: "CreateFormService",
              component: () => import("@/views/forms/index.vue"),
            },
            {
              path: ":id",
              name: "DetailLayanan",
              component: () => import("@/views/DocumentPreview.vue"),
            },
          ],
        },
      ],
    },

    {
      path: "/signin",
      name: "Auth",
      meta: { requiresGuest: true },
      children: [
        {
          path: "/signin",
          name: "SignIn",
          component: () => import("@/views/SignInView.vue"),
        },
        {
          path: "/signup",
          name: "SignUp",
          component: () => import("@/views/SignUpView.vue"),
        },
      ],
    },
    {
      path: "/officer",
      name: "OfficerParent",
      meta: { requiresOfficer: true },
      children: [
        {
          path: "",
          name: "Officer",
          component: () => import("@/views/OfficerView.vue"),
        },
        {
          path: "contact",
          name: "Contact",
          component: () => import("@/views/officers/Contact.vue"),
        },
        {
          path: "document",
          name: "Documents",
          component: () => import("@/views/officers/Documents.vue"),
        },
        {
          path: "document/:id",
          name: "Document",
          component: () => import("@/views/officers/document/Index.vue"),
        },
        {
          path: "complaint",
          name: "Complaint",
          component: () => import("@/views/officers/Complaint.vue"),
        },
        {
          path: "complaint/:id",
          name: "ComplaintDetail",
          component: () => import("@/views/officers/ComplaintDetail.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "AdminParent",
      meta: { requiresAdmin: true },
      children: [
        {
          path: "",
          name: "Admin",
          component: () => import("@/views/AdminView.vue"),
        },
        {
          path: "numberandemail",
          name: "NumberAndEmail",
          component: () => import("@/views/admin/ChangeNumberAndEmail.vue"),
        },
        {
          path: "manageuser",
          name: "ManageUser",
          component: () => import("@/views/ManageUsers.vue"),
        },
        {
          path: "service",
          name: "ServiceParent",
          children: [
            {
              path: "",
              name: "AllServices",
              component: () => import("@/views/AllServices.vue"),
            },
            {
              path: ":slug",
              name: "LetterPreview",
              component: () => import("@/views/LetterPreview.vue"),
            },
            {
              path: "form/create/:id",
              name: "CreateService",
              component: () => import("@/views/CreateServiceForms.vue"),
            },
          ],
        },
        {
          path: "form",
          name: "FormParent",
          children: [
            {
              path: "create",
              name: "CreateForm",
              component: () => import("@/views/CreateForm.vue"),
            },
            {
              path: "create/:id",
              name: "CreateFormById",
              component: () => import("@/views/CreateForm.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    const currentUser: any = await getCurrentUser();
    try {
      const user: any = await getUser(currentUser.uid);
      if (user.role !== "admin") {
        next({ name: "Home" });
      } else next();
    } catch (error) {
      next({ name: "SignIn" });
    }
  } else if (to.matched.some((record) => record.meta.requiresOfficer)) {
    const currentUser: any = await getCurrentUser();
    try {
      const user: any = await getUser(currentUser.uid);
      if (user.role === "officer") {
        next();
      } else if (user.role === "admin") {
        next();
      } else next({ name: "Home" });
    } catch (error) {
      next({ name: "SignIn" });
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (await getCurrentUser()) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
