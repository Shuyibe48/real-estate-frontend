import { Link } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="logo" width={100} height={100} />
    </Link>
  );
};

export default Logo;
