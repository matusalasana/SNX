import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/public/Home";
import Projects from "./pages/public/Projects";
import Blog from "./pages/public/Blog";
import BlogDetails from "./pages/public/BlogDetails";
import ProjectDetails from "./pages/public/ProjectDetails";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login";

import AdminMessages from "./pages/admin/AdminMessages";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import AdminBlogManagement from "./pages/admin/AdminBlogManagement";
import AdminProjectsManagement from "./pages/admin/AdminProjectsManagement";
import AdminDashboard from "./pages/admin/Dashboard";
import Test from "./pages/public/Test";
import Navbar from "./components/common/Navbar";

const App = () => {
  return (
    <>
    <Navbar />
    <Toaster />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />

      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetails />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<Test /> } />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/projects" element={<AdminProjectsManagement />} />
      <Route path="/admin/blog" element={<AdminBlogManagement />} />
      <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
      <Route path="/admin/blog/:id/edit" element={<AdminBlogEditor />} />
      <Route path="/admin/messages" element={<AdminMessages />} />
    </Routes>
    </>
  );
};

export default App;