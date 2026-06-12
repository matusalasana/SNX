import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Components
import Navbar from "./components/common/Navbar";

// Pages
import Home from "./pages/public/Home";
import Projects from "./pages/public/Projects";
import ProjectDetails from "./pages/public/ProjectDetails";
import About from "./pages/public/About";
import Blog from "./pages/public/Blog";
import Contact from "./pages/public/Contact";
import AdminDashboard from "./pages/admin/Dashboard";


const App = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
      </Routes>
    </>
  );
};

export default App;