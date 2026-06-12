import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Components

// Pages
import Home from "./pages/public/Home";
import Projects from "./pages/public/Projects";
import Login from "./pages/public/Login";


const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/login" element={<Login />} />
        
      </Routes>
    </>
  );
};

export default App;