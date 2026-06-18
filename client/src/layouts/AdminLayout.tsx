import { Outlet } from "react-router-dom";
import Navbar from "../components/admin/Navbar";
import Footer from "../components/common/Footer";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}