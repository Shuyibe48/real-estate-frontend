import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { LockIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const SideBar = () => {
  const { foldMenu, setFoldMenu } = useContext(AuthContext);

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-fll z-40 bg-white overflow-y-auto ${
    foldMenu ? "block w-64" : "hidden w-0"
  }`;
  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between px-6 pt-3 mb-8">
          <Logo />
          {/* {isSidebarCollapsed ? null : ( */}
          <button className="py-3" onClick={() => setFoldMenu(!foldMenu)}>
            <X className="h-6 w-6 transition duration-500 hover:text-rose-400" />
          </button>
          {/* )} */}
        </div>
        {/* navbar links */}
        <ul className="flex flex-col gap-2 ml-6 justify-center items-start font-semibold">
          <Link
            to="/"
            className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
          >
            <li>Buy</li>
          </Link>
          <Link
            to="/"
            className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
          >
            <li>Rent</li>
          </Link>
          <Link
            to="/"
            className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
          >
            <li>Sold</li>
          </Link>
          <Link
            to="/"
            className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
          >
            <li>New homes</li>
          </Link>
          <Link
            to="/"
            className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
          >
            <li>Find agents</li>
          </Link>
          <Link
            to="/"
            className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
          >
            <li>Home loans</li>
          </Link>
          <Link
            to="/"
            className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
          >
            <li>News</li>
          </Link>
          <Link
            to="/"
            className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
          >
            <li>Commercial</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
