import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="hidden lg:block">
      <ul className="flex gap-2 justify-center items-center font-semibold">
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
  );
};

export default Menu;
