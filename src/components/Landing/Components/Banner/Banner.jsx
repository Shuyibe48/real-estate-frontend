import { useEffect, useState } from "react";
import Container from "../../../Shared/Container";
import FilterBox from "./FilterBox";
import baseUrl from "../../../../api/baseUrl";

const Banner = () => {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await baseUrl.get("/platforms/get-platforms");
        const platformData = res?.data?.data?.[0];
        setLogo(platformData?.banner);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <Container>
        <div
          className="flex justify-center items-center bg-cover bg-center rounded-md h-96 w-full"
          style={{
            backgroundImage: `url(${logo || "default-placeholder.jpg"})`,
          }}
        >
          <FilterBox />
        </div>
      </Container>
    </div>
  );
};

export default Banner;
