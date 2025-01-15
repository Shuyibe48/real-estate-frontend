import { Outlet } from "react-router-dom";
import Navbar from "../components/Landing/Shared/Navbar/Navbar";
import SideBar from "../components/Landing/Shared/Navbar/SideBar";
import Footer from "../components/Landing/Shared/Footer/Footer";

const LandingLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <main className="flex w-full flex-col">
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default LandingLayout;
