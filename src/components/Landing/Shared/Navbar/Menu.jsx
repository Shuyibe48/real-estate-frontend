import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthProvider";

const Menu = () => {
  const { query, setQuery } = useContext(AuthContext);
  return (
    <div className="hidden lg:block">
      <ul className="flex gap-2 justify-center items-center font-semibold">
        <Link
         onClick={() => setQuery({ ...query, type: "Buy" })}
          to="/"
          className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
        >
          <li>Buy</li>
        </Link>
        <Link
          onClick={() => setQuery({ ...query, type: "Rent" })}
          to="/"
          className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
        >
          <li>Rent</li>
        </Link>
        <Link
         onClick={() => setQuery({ ...query, type: "Sold" })}
          to="/"
          className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
        >
          <li>Sold</li>
        </Link>
        <Link
          to="/developer"
          className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
        >
          <li>Find Developer</li>
        </Link>
        <Link
          to="/blog"
          className="hover:bg-rose-50 py-3 px-2 rounded-md transition duration-500"
        >
          <li>Blog</li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
