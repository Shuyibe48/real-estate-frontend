import Container from "../../../Shared/Container";
import Logo from "./Logo";
import MenuDropdown from "./MenuDropdown";
import Menu from "./Menu";
import FoldMenu from "./FoldMenu";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";

const Navbar = () => {
  const { foldMenu, user } = useContext(AuthContext);
  return (
    <div className="w-full bg-white z-10">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <FoldMenu />
            <div className={`${foldMenu ? "invisible" : "visible"}`}>
              <Logo />
            </div>
            <Menu />
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
