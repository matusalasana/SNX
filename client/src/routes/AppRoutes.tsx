import { createBrowserRouter } from "react-router-dom";


// Layouts 
import Layout from "../layouts/Layout";
import AdminLayout from "../layouts/AdminLayout";


// Components
import ProtectedRoutes from "../components/auth/ProtectedRoutes";

// Public pages
import Home from "../pages/public/Home";
import Projects from "../pages/public/Projects";
import ProjectDetails from "../pages/public/ProjectDetails";
import Blog from "../pages/public/Blog";
import BlogDetails from "../pages/public/BlogDetails";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Login from "../pages/public/Login";
import NotFound from "../pages/public/NotFound";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminMessages from "../pages/admin/AdminMessages";

import AdminBlogs from "../pages/admin/AdminBlogs";
import AdminProjects from "../pages/admin/AdminProjects";
import AdminSkills from "../pages/admin/AdminSkills";
import AdminExperiences from "../pages/admin/AdminExperiences";
import AdminCertifications from "../pages/admin/AdminCertifications";

const VITE_ADMIN_LOGIN_URL = import.meta.env.VITE_ADMIN_LOGIN_URL;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Home
      {
        index: true,
        element: <Home />,
      },

      // Public pages
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: VITE_ADMIN_LOGIN_URL,
        element: <Login />,
      },

      // Projects
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },

      // Blog
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  // Admin section
  {
    path: "/admin",
    element: <ProtectedRoutes />, 
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "categories",
            element: <AdminCategories />,
          },
          {
            path: "messages",
            element: <AdminMessages />,
          },
          {
            path: "blogs",
            element: <AdminBlogs />,
          },
          {
            path: "projects",
            element: <AdminProjects />,
          },
          {
            path: "skills",
            element: <AdminSkills />,
          },
          {
            path: "experiences",
            element: <AdminExperiences />,
          },
          {
            path: "certifications",
            element: <AdminCertifications />,
          },
        ],
      },
    ],
  },
]);