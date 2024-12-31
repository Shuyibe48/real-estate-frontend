import Container from "../../../Shared/Container";
import FilterBox from "./FilterBox";

const Banner = () => {
  return (
    <div>
      <Container>
        <div
          className="flex justify-center items-center bg-[url('https://media.rightmove.co.uk/hero_image_winter.webp')] 
             bg-cover bg-center rounded-md h-96 w-full"
        >
          <FilterBox />
        </div>
      </Container>
    </div>
  );
};

export default Banner;
