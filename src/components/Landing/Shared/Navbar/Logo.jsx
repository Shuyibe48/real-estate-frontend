import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import baseUrl from "../../../../api/baseUrl";

const Logo = () => {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await baseUrl.get("/platforms/get-platforms");
        const platformData = res?.data?.data?.[0];
        setLogo(platformData?.logo);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);
  return (
    <Link to="/">
      <img src={logo} alt="logo" width={100} height={100} />
    </Link>
  );
};

export default Logo;
