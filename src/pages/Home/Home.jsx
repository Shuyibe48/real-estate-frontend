import Banner from "../../components/Landing/Components/Banner/Banner";
import InfoCard from "../../components/Landing/Components/Info/InfoCard";
import RealEstateComponent from "../../components/Landing/Components/RealEstateComponent/RealEstateComponent";
import RecentSearches from "../../components/Landing/Components/RecentSearches/RecentSearches";
import Services from "../../components/Landing/Components/Services/Services";
import SuggestedProperties from "../../components/Landing/Components/SuggestedProperties/SuggestedProperties";

const Home = () => {
  return (
    <>
      <Banner />
      <RecentSearches />
      <SuggestedProperties />
      <InfoCard />
      <Services />
      <RealEstateComponent />
    </>
  );
};

export default Home;
