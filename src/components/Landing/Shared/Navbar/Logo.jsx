import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import baseUrl from "../../../../api/baseUrl";
import Loader from "../../../Shared/Loader";
import logoImage from "../../../../assets/images/2.jpg";

const Logo = () => {
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await baseUrl.get("/platforms/get-platforms");
        const platformData = res?.data?.data?.[0];
        setLogo(platformData?.logo);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <Link to="/">
      <img src={logo || logoImage} alt="logo" width={100} height={100} />
    </Link>
  );
};

export default Logo;
