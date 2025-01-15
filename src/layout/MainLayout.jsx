import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Landing/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex w-full flex-col">
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default MainLayout;
