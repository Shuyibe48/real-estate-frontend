import { MenuIcon, X } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";

const FoldMenu = () => {
  const { foldMenu, setFoldMenu } = useContext(AuthContext);
  return (
    <div className="block lg:hidden">
      <div
        onClick={() => setFoldMenu(!foldMenu)}
        className={`${foldMenu ? "hidden" : "block"} cursor-pointer`}
      >
        <MenuIcon className="transition duration-500 hover:text-rose-400" />
      </div>
      <div
        onClick={() => setFoldMenu(!foldMenu)}
        className={`${foldMenu ? "block" : "hidden"} cursor-pointer`}
      >
        <X />
      </div>
    </div>
  );
};

export default FoldMenu;
