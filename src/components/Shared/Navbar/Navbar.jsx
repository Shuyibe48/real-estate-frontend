import { MenuIcon, Search, Settings } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import Container from "../Container";
import Logo from "../../Landing/Shared/Navbar/Logo";

const Navbar = () => {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useContext(AuthContext);
  return (
    <div className="bg-white py-3 shadow-md">
      <Container>
        <div className="flex items-center justify-between">
          {/* search bar */}
          <div className="flex items-center gap-8">
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
              <MenuIcon className="h-5 w-5 text-black transition duration-500 hover:text-[#adb7cb]" />
            </button>
          </div>
          <div className="flex items-center gap-8">
            <Logo />
          </div>

          {/* Icons */}
          <div className="flex itemsce invisible">
            <Link
              
              className="h-min w-min rounded p-2 hover:bg-gray-100"
            >
              <Settings className="h-5 w-6 cursor-pointer" />
            </Link>
            <div className="ml-2 mr-5 hidden min-h-[2rem] w-[0.1rem] bg-gray-200 md:inline-block"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
