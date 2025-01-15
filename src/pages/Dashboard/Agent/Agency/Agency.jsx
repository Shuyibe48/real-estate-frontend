import {
  Bath,
  Bed,
  CogIcon,
  CookingPotIcon,
  Edit,
  Menu,
  MenuIcon,
  MenuSquare,
  MenuSquareIcon,
  PlusIcon,
  Ratio,
  Save,
  UserIcon,
  Users,
  X,
} from "lucide-react";
import {
  FaStar,
  FaDollarSign,
  FaClock,
  FaHome,
  FaUserFriends,
  FaEnvelope,
  FaPhone,
  FaFacebook,
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { BiEnvelope } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai"; // স্টার আইকন
import { MdUpdate, MdVerified } from "react-icons/md"; // ভেরিফাইড আইকন
import Container from "../../../../components/Shared/Container";
import ContactEnvelop from "../../../../components/ContactEnvelop/ContactEnvelop";
import { Link } from "react-router-dom";
import EditAgencyModal from "../../../../components/Modal/EditAgencyModal";
import { AuthContext } from "../../../../providers/AuthProvider";
import baseUrl from "../../../../api/baseUrl";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const Agency = () => {
  const [showMore, setShowMore] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [activeTab, setActiveTab] = useState("sold");
  const [activeTabRatings, setActiveTabRatings] = useState("sellers");
  const [showMoreRatings, setShowMoreRatings] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const agency = user?.myAgency[0]?.agency;
  const [team, setTeam] = useState([]);
  const [property, setProperty] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filterType, setFilterType] = useState("sold"); // ডিফল্ট ফিল্টার সোল্ড
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formCreateData, setFormCreateData] = useState({
    name: "",
    email: "",
    contactNo: "",
    address: "",
  });

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setFormCreateData({ ...formCreateData, [name]: value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    console.log("Agency Data Submitted:", formCreateData);
    setLoading(true);

    try {
      // Backend call to update data
      const res = await baseUrl.post(`/agencies/create-agency/${user?._id}`, {
        name: formCreateData.name,
        email: formCreateData.email,
        contactNo: formCreateData.contactNo,
        address: formCreateData.address,
      });

      // Update local state and local storage with updated data
      const updatedAgency = res?.data?.data;
      const updatedUser = {
        ...user,
        myAgency: [{ agency: updatedAgency }],
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Agency updated successfully!");
      setLoading(false);
      setIsCreateModalOpen(false);
    } catch (error) {
      setLoading(false);
      console.error("Agency update failed:", error);
      toast.error("Agency update failed. Please try again.");
    } finally {
      setLoading(false);
      setIsCreateModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const res = await baseUrl.get(
          `/agencies/${user?.myAgency[0]?.agency?._id}`
        );
        setTeam(res.data.data.member);
        setProperty(res.data.data.properties);
        setFilteredProperties(
          filterProperties(res.data.data.properties, "Rent")
        );
      } catch (error) {
        console.error("Error fetching agency data:", error);
      }
    };

    if (user?.myAgency[0]?.agency?._id) {
      fetchAgency();
    }
  }, [user]);

  const filterProperties = (properties, type) => {
    return properties.filter((item) => item.type === type);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    const filtered = filterProperties(property, type);
    setFilteredProperties(filtered);
    setVisibleCount(6); // নতুন ফিল্টারে গেলে আবার ৬টা দেখাবে
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // প্রতি বার ৬টা করে ডাটা যোগ করবে
  };

  const handleShowLess = () => {
    setVisibleCount(6); // ৬টা ডাটায় রিসেট করবে
  };

  const displayedProperties = filteredProperties.slice(0, visibleCount);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Edit Modal Handler
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleToggleRatings = () => setShowMoreRatings((prev) => !prev);

  const reviews = {
    sellers: [
      {
        rating: 5.0,
        location: "Gracemere, QLD",
        time: "5 days ago",
        reviewer: "Lyn Deasy",
        review: "I had a seamless purchasing experience.",
      },
      {
        rating: 5.0,
        location: "Wandal, QLD",
        time: "6 days ago",
        reviewer: "Jaimee Sewell",
        review:
          "From the moment we started working with Jaimee, it was clear that she was not only knowledgeable but also deeply committed to our goals.",
      },
      {
        rating: 5.0,
        location: "Allenstown, QLD",
        time: "7 days ago",
        reviewer: "David Peers",
        review:
          "David was exceptional selling my investment property. Great communication and professional service. Highly recommend!",
      },
    ],
    buyers: [
      {
        rating: 5.0,
        location: "Berserker, QLD",
        time: "8 days ago",
        reviewer: "Tom Dugan",
        review:
          "Tom made our buying experience easy and stress-free. Couldn’t have asked for a better agent!",
      },
      // আরও বায়ারের রিভিউ যুক্ত করতে পারেন
    ],
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Function to handle Next button click
  const handleNextClick = () => {
    if (selectedOption) {
      window.alert("You cannot send Enquire to you")
    } else {
      window.alert("You cannot send Enquire to you")
    }
  };

  const soldData = [
    {
      type: "House",
      icon: "🏠", // Use SVG or your own icon set
      count: "172 sold",
      price: "$489k",
      days: "29 days",
    },
    {
      type: "Residential Land",
      icon: "🌳", // Use SVG or your own icon set
      count: "37 sold",
      price: "$265k",
      days: "93.5 days",
    },
    {
      type: "Unit",
      icon: "🏢", // Use SVG or your own icon set
      count: "21 sold",
      price: "$480k",
      days: "38.5 days",
    },
  ];

  const leasedData = [
    {
      type: "House",
      icon: "🏠", // Use SVG or your own icon set
      count: "178 leased",
      price: "$520pw",
      days: "20 days",
    },
    {
      type: "Unit",
      icon: "🏢", // Use SVG or your own icon set
      count: "54 leased",
      price: "$380pw",
      days: "15.5 days",
    },
    {
      type: "Apartment",
      icon: "🏙️", // Use SVG or your own icon set
      count: "6 leased",
      price: "$400pw",
      days: "11.5 days",
    },
  ];

  const data = activeTab === "Sold" ? soldData : leasedData;

  return (
    <>
      {agency ? (
        <div className="bg-[#F6F5F7]">
          <div>
            <nav className="bg-[#37424B] font-semibold text-white py-4 text-center">
              {agency?.name}
            </nav>
            <div>
              <img
                className="object-cover w-full h-[400px]"
                src="https://i1.au.reastatic.net/1280x600/8de84ce5365c8e4a9ecdc6c2250fbfe4d2ace0545628118d963d5faa4fe4a9bb/main.gif"
                alt=""
              />
            </div>
            <div className="py-6 bg-white xl:px-20 md:px-10 sm:px-4 px-2 flex justify-between items-start">
              <div>
                <h1 className="font-semibold text-2xl text-gray-900">
                  {agency?.name}
                </h1>
                <p className=" mt-1">{agency?.address}</p>

                {/* Rating Section */}
                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span className="text-gray-800 font-semibold">5.0</span>
                  <a
                    href="#reviews"
                    className="ml-2 text-gray-500 underline hover"
                  >
                    (226 reviews)
                  </a>
                </div>

                {/* Employees Section */}
                <div className="flex items-center mt-4">
                  <div className="flex -space-x-3">
                    {team.length > 0 && (
                      <img
                        src={team[0].agent.profileImage}
                        alt="Employee 1"
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    )}
                    {team.length > 1 && (
                      <img
                        src={team[1].agent.profileImage}
                        alt="Employee 2"
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    )}
                    {team.length > 2 && (
                      <img
                        src={team[2].agent.profileImage}
                        alt="Employee 3"
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    )}
                  </div>
                  <p className=" text-sm ml-4">
                    {team.length} people work here
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button className="hover:bg-rose-50 p-2 rounded-md transition duration-500">
                  <Edit
                    onClick={() => handleOpenEditModal()}
                    className="h-5 w-5"
                  />
                </button>
                {/* Edit Modal */}
                <EditAgencyModal
                  isOpen={isEditModalOpen}
                  closeModal={handleCloseEditModal}
                  agencyInfo={agency}
                />
                <div className="relative inline-block">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center p-2 hover:bg-rose-50 rounded-md transition duration-500"
                  >
                    {!isMenuOpen ? (
                      <MenuSquare className="h-5 w-5" />
                    ) : (
                      <X className="h-5 w-5" />
                    )}
                  </button>

                  {isMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform origin-top-right z-40"
                      style={{
                        opacity: isMenuOpen ? 1 : 0,
                        transform: isMenuOpen ? "scaleY(1)" : "scaleY(0)",
                      }}
                    >
                      <div className="p-2 space-y-2">
                        <Link
                          to="/dashboard/create-list"
                          className="flex items-center p-2 text-gray-700 rounded hover:bg-rose-50 hover:text-rose-500 transition duration-300"
                        >
                          <PlusIcon className="h-5 w-5 mr-2" />
                          Add List
                        </Link>
                        <Link
                          to={`/dashboard/agency-lists/${agency?._id}`}
                          className="flex items-center p-2 text-gray-700 rounded hover:bg-rose-50 hover:text-rose-500 transition duration-300"
                        >
                          <CogIcon className="h-5 w-5 mr-2" />
                          Manage List
                        </Link>
                        <Link
                          to="/dashboard/team"
                          className="flex items-center p-2 text-gray-700 rounded hover:bg-rose-50 hover:text-rose-500 transition duration-300"
                        >
                          <Users className="h-5 w-5 mr-2" />
                          Team
                        </Link>
                        <Link
                          to="/plan"
                          className="flex items-center p-2 text-gray-700 rounded hover:bg-rose-50 hover:text-rose-500 transition duration-300"
                        >
                          <MdUpdate className="h-5 w-5 mr-2" />
                          Get plan
                        </Link>
                        <Link
                          to={`/dashboard/promotion/${agency?._id}`}
                          className="flex items-center p-2 text-gray-700 rounded hover:bg-rose-50 hover:text-rose-500 transition duration-300"
                        >
                          <Ratio className="h-5 w-5 mr-2" />
                          Promotion
                        </Link>
                        <Link
                          to={`/dashboard/payment/${agency?._id}`}
                          className="flex items-center p-2 text-gray-700 rounded hover:bg-rose-50 hover:text-rose-500 transition duration-300"
                        >
                          <UserIcon className="h-5 w-5 mr-2" />
                          Payment
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Container>
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8">
                <div className="space-y-4 my-4 bg-white p-4 rounded-md shadow-md">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Market performance snapshot
                    </h2>
                    <p>
                      In the last 12 months Pat O'Driscoll Real Estate -
                      Rockhampton has sold 254 properties and leased 250
                      properties on realestate.com.au.
                    </p>
                  </div>

                  <div>
                    {/* Sales Performance Section */}
                    <div>
                      <h3 className="font-semibold mb-1">SALES PERFORMANCE</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-1">
                        <div className="p-4  rounded-md text-center border">
                          <FaDollarSign className="text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-semibold">$465k</p>
                          <p className="">Median sold price</p>
                        </div>
                        <div className="p-4  rounded-md text-center border">
                          <FaClock className="text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-semibold">33</p>
                          <p className="">Median days advertised</p>
                        </div>
                        <div className="p-4  rounded-md text-center border">
                          <FaHome className="text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-semibold">254</p>
                          <p className="">Properties sold</p>
                        </div>
                        <div className="p-4  rounded-md text-center border">
                          <FaHome className="text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-semibold">46</p>
                          <p className="">Properties for sale</p>
                        </div>
                      </div>
                    </div>

                    {/* Rent Performance Section */}
                    <div>
                      <h3 className="font-semibold mb-1">RENT PERFORMANCE</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4  rounded-md text-center border">
                          <FaDollarSign className="text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-semibold">$480pw</p>
                          <p className="">Median leased price</p>
                        </div>
                        <div className="p-4  rounded-md text-center border">
                          <FaClock className="text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-semibold">19</p>
                          <p className="">Median days advertised</p>
                        </div>
                        <div className="p-4  rounded-md text-center border">
                          <FaHome className="text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-semibold">250</p>
                          <p className="">Properties leased</p>
                        </div>
                        <div className="p-4  rounded-md text-center border">
                          <FaUserFriends className="text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-semibold">8</p>
                          <p className="">Properties for rent</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* property area  */}
                <div className="space-y-4 my-4 bg-white p-4 rounded-md shadow-md">
                  <div>
                    <h1 className="font-semibold text-lg">Our properties</h1>
                    <p>
                      Pat O'Driscoll Real Estate - Rockhampton have sold 2791
                      properties of all time on realestate.com.au, have 46
                      properties for sale and have 8 properties for rent.
                    </p>
                  </div>

                  <div className="inline-block text-left">
                    <select
                      value={filterType}
                      onChange={(e) => handleFilterChange(e.target.value)}
                      className="w-full ps-2 pe-4 py-2 bg-white border rounded-md outline-none"
                    >
                      <option value="Rent">For Rent</option>
                      <option value="Buy">For sale</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <p>
                      Showing {displayedProperties.length} of{" "}
                      {filteredProperties.length} {filterType} properties
                    </p>
                    {displayedProperties.map((propertyItem) => (
                      <div
                        key={propertyItem.id}
                        className="flex items-center gap-4"
                      >
                        <img
                          className="w-[200px] h-[150px] rounded-md"
                          src={propertyItem.images[0]}
                          alt={propertyItem.title}
                        />
                        <div className="space-y-2">
                          <h1 className="font-semibold text-lg">
                            ${propertyItem.price}
                          </h1>
                          <p>{propertyItem.address}</p>
                          <div className="flex items-center gap-4 my-2">
                            <span className="flex justify-center items-center gap-2">
                              <Bed className="h-4 w-4" />
                              <span>{propertyItem.bedrooms}</span>
                            </span>
                            <span className="flex justify-center items-center gap-2">
                              <Bath className="h-4 w-4" />
                              <span>{propertyItem.bathrooms}</span>
                            </span>
                            <span className="capitalize border-l pl-2">
                              {propertyItem.propertyType}
                            </span>
                          </div>
                          <p>Status: {propertyItem.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredProperties.length > visibleCount && (
                    <div className="flex justify-center">
                      <span
                        onClick={handleShowMore}
                        className="mt-4 px-4 py-2 rounded-md border hover:bg-rose-50 transition duration-500 cursor-pointer font-semibold"
                      >
                        Show more listings
                      </span>
                    </div>
                  )}

                  {visibleCount > 6 && (
                    <div className="flex justify-center">
                      <span
                        onClick={handleShowLess}
                        className="mt-4 px-4 py-2 rounded-md border hover:bg-rose-50 transition duration-500 cursor-pointer font-semibold"
                      >
                        Show less
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 my-4 bg-white p-4 rounded-md shadow-md">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Our Market Performance
                    </h2>
                    <p className="text-gray-700 mb-4">
                      In the last 12 months agents at Pat O'Driscoll Real Estate
                      - Rockhampton have{" "}
                      {activeTab === "sold"
                        ? "sold 254 properties"
                        : "leased 250 properties"}{" "}
                      with a median {activeTab} price of{" "}
                      {activeTab === "sold" ? "$465k" : "$480pw"} on
                      realestate.com.au.
                    </p>

                    <div className="flex mb-6">
                      <button
                        className={`px-4 py-2 border rounded-l-full ${
                          activeTab === "sold"
                            ? "bg-rose-500 text-white"
                            : "bg-white text-black border-gray-300"
                        }`}
                        onClick={() => setActiveTab("sold")}
                      >
                        Sold
                      </button>
                      <button
                        className={`px-4 py-2 border rounded-r-full ${
                          activeTab === "leased"
                            ? "bg-rose-500 text-white"
                            : "bg-white text-black border-gray-300"
                        }`}
                        onClick={() => setActiveTab("leased")}
                      >
                        Leased
                      </button>
                    </div>

                    <div className="space-y-4">
                      {data.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center p-4 border rounded-lg shadow-sm bg-gray-50"
                        >
                          <div className="flex-shrink-0 text-3xl">
                            {item.icon}
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="text-lg font-semibold">
                              {item.type}
                            </h3>
                            <p className="text-gray-500">
                              Median price: {item.price}
                            </p>
                            <p className="text-gray-500">
                              Median days advertised: {item.days}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold">{item.count}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 my-4 bg-white p-4 rounded-md shadow-md">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      About the team
                    </h2>
                    {/* <p className="text-gray-600 mb-4">
                      Showing 12 of 26 team members from Pat O'Driscoll Real
                      Estate - Rockhampton
                    </p> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {team?.map((member, index) => (
                        <div
                          key={index}
                          className="bg-white border border-gray-300 rounded-lg py-4 text-center shadow-sm"
                        >
                          <img
                            src={member.agent.profileImage}
                            alt={member.agent.fullName}
                            className="mx-auto rounded-full w-20 h-20 mb-4 object-cover"
                          />
                          <h3 className="font-semibold">
                            {member.agent.fullName}
                          </h3>
                          <p className="text-xs font-semibold">
                            {member.role === "agent" && "Agent"}
                            {member.role === "agencyOwner" && "Agency Owner"}
                          </p>

                          <div className="mt-2 text-yellow-500 text-xs">
                            <span>⭐ 5</span>
                            <span className="ml-1 text-gray-500">
                              (47 review's)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* <div className="flex justify-center">
                      <span className="mt-6 px-4 py-2 rounded-md border hover:bg-rose-50 transition duration-500 cursor-pointer font-semibold">
                        Show 14 more
                      </span>
                    </div> */}
                  </div>
                </div>

                <div className="space-y-2 my-4 bg-white p-4 rounded-md shadow-md">
                  <div>
                    <h1 className="font-semibold text-lg">About the agency</h1>
                    <p>8 years experience</p>
                  </div>
                  <div className="py-4">
                    <p>
                      {showMore
                        ? `With a lifelong dedication to this extraordinary community and extensive background of over 30 years i.`
                        : `With a lifelong dedication ...`}
                    </p>
                    <button
                      onClick={handleToggle}
                      className="font-semibold hover:underline mt-2"
                    >
                      {showMore ? "Show Less" : "Show More"}
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button className="flex mt-2 w-4/5 justify-center items-center gap-1 bg-rose-500 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition duration-500 font-semibold">
                      <span>
                        <BiEnvelope />
                      </span>
                      Request a free appraisal
                    </button>
                  </div>
                </div>
{/* 
                <div className="space-y-4 my-4 bg-white p-4 rounded-md shadow-md">
                  <div>
                    <h1 className="font-semibold text-lg">
                      Our ratings and reviews
                    </h1>
                    <p>
                      Read the latest reviews for the team at Pat O'Driscoll
                      Real Estate - Rockhampton
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>5.0 </b> (226 reviews)
                    </p>
                  </div>

                  {/* Tab Menu */}
                  <div className="flex space-x-4 border-b">
                    <button
                      onClick={() => setActiveTabRatings("sellers")}
                      className={`py-2 px-4 ${
                        activeTabRatings === "sellers"
                          ? "text-[#d32f2f] border-b-2 border-[#d32f2f]"
                          : "text-gray-600"
                      } font-semibold`}
                    >
                      Sellers
                    </button>
                    <button
                      onClick={() => setActiveTabRatings("buyers")}
                      className={`py-2 px-4 ${
                        activeTabRatings === "buyers"
                          ? "text-[#d32f2f] border-b-2 border-[#d32f2f]"
                          : "text-gray-600"
                      } font-semibold`}
                    >
                      Buyers
                    </button>
                  </div>

                  {/* Review Content */}
                  <div className="space-y-4">
                    {reviews[activeTabRatings].map((review, index) => (
                      <div key={index} className="bg-[#F6F5F7] p-4 rounded-md">
                        <div className="flex justify-between items-start">
                          <div className="flex-[2]">
                            <div className="flex items-center mb-2">
                              <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <AiFillStar key={i} />
                                ))}
                              </div>
                              <p className="ml-2 font-semibold text-lg">
                                {review.rating}
                              </p>
                            </div>
                            <p className="font-semibold text-gray-800 text-base">
                              Seller of House in {review.location}
                            </p>
                            <span className="text-xs text-gray-500">
                              {review.time}
                            </span>
                            <div className="py-4 text-gray-800 text-sm">
                              <p>
                                {showMoreRatings
                                  ? review.review
                                  : `${review.review.substring(0, 50)}...`}
                              </p>
                              <button
                                onClick={handleToggleRatings}
                                className="text-[#005180] font-semibold hover:underline mt-2"
                              >
                                {showMoreRatings ? "Show Less" : "Read more"}
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <MdVerified className="" /> {/* Verified icon */}
                            <p className="text-sm font-semibold">
                              Verified review
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Show More Reviews Button */}
                  <div className="flex justify-center">
                    <span className="mt-4 px-4 py-2 rounded-md border hover:bg-rose-50 transition duration-500 cursor-pointer font-semibold">
                      Show more reviews
                    </span>
                  </div>
                </div> */}

                <div className="space-y-2 my-4 bg-white rounded-md shadow-md">
                  <div>
                    {/* Header */}
                    <div className="bg-gray-800 p-4 text-center text-white font-semibold text-lg">
                      {agency?.name}
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Profile Section */}
                      <div>
                        <div>
                          <h2 className="text-xl font-semibold">
                            Contact {agency?.name}
                          </h2>
                          <div className="flex items-center text-yellow-500">
                            <AiFillStar />
                            <b className="font-medium">5.0</b>
                            <span className="ml-1 text-black">
                              (59 reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      <hr className="border-gray-300" />

                      {/* Enquiry Section */}
                      <div>
                        <p className="font-medium mb-3">
                          What's your enquiry about?
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() =>
                              handleOptionSelect("Selling a property")
                            }
                            className={`py-2 px-4 border border-gray-300 rounded-md font-semibold ${
                              selectedOption === "Selling a property"
                                ? "bg-gray-800 text-white"
                                : "text-gray-800"
                            }`}
                          >
                            Selling a property
                          </button>
                          <button
                            onClick={() =>
                              handleOptionSelect("Property management")
                            }
                            className={`py-2 px-4 border border-gray-300 rounded-md font-semibold ${
                              selectedOption === "Property management"
                                ? "bg-gray-800 text-white"
                                : "text-gray-800"
                            }`}
                          >
                            Property management
                          </button>
                          <button
                            onClick={() =>
                              handleOptionSelect("An advertised property")
                            }
                            className={`py-2 px-4 border border-gray-300 rounded-md font-semibold ${
                              selectedOption === "An advertised property"
                                ? "bg-gray-800 text-white"
                                : "text-gray-800"
                            }`}
                          >
                            An advertised property
                          </button>
                          <button
                            onClick={() =>
                              handleOptionSelect("General enquiry")
                            }
                            className={`py-2 px-4 border border-gray-300 rounded-md font-semibold ${
                              selectedOption === "General enquiry"
                                ? "bg-gray-800 text-white"
                                : "text-gray-800"
                            }`}
                          >
                            General enquiry
                          </button>
                        </div>
                      </div>

                      {/* Next Button */}
                      <div className="p-2">
                        <button
                          onClick={handleNextClick}
                          className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* contact envelop section here  */}
              <div className="col-span-4 mt-4">
                <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden sticky top-3">
                  {/* Header */}
                  <div className="bg-gray-800 p-4 text-center text-white font-semibold text-sm">
                    {agency?.name}
                  </div>

                  {/* Profile Image and Info */}
                  <div className="p-6 flex flex-col items-center">
                    <img
                      src={agency?.logo}
                      alt="Agent"
                      className="w-20 h-20 rounded-full mb-4"
                    />
                    <h2 className="text-xl font-bold text-gray-800">
                      {agency?.name}
                    </h2>
                    <div className="flex items-center space-x-1 text-yellow-500 mt-2">
                      <FaStar />
                      <span className="font-semibold text-gray-800">5.0</span>
                      <span className="text-gray-600">(59 reviews)</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-6 pb-6 space-y-4">
                    <button
                      onClick={() => window.alert("You cannot Request a free appraisal to you")}
                      className="w-full flex items-center justify-center bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
                    >
                      <FaEnvelope className="mr-2" /> Request a free appraisal
                    </button>
                    <button onClick={() => window.alert("You cannot send Enquire to you")} className="w-full flex items-center justify-center border border-gray-300 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-100 transition">
                      <FaEnvelope className="mr-2" /> Enquire
                    </button>
                    <button className="w-full flex items-center justify-center border border-gray-300 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-100 transition">
                      <FaPhone className="mr-2" /> {agency?.contactNo}
                    </button>
                  </div>

                  {/* Footer */}
                  {/* <div className="flex justify-center py-4 border-t">
                    <FaFacebook
                      className="text-gray-600 hover:text-blue-600 cursor-pointer"
                      size={24}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <div className="flex items-center h-[70vh] justify-center px-4">
          <div className="flex justify-center items-center flex-col gap-2">
            <span className="bg-rose-500 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition duration-500 font-semibold">
              You are not connected with any agency
            </span>
            <p
              onClick={() => setIsCreateModalOpen(true)}
              className="text-blue-500 hover:text-blue-600 transition duration-500 font-semibold hover:underline cursor-pointer"
            >
              Create your own agency
            </p>
          </div>
        </div>
      )}

      {/* Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create Your Agency
            </h2>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 font-semibold">
                  Agency Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formCreateData.name}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sunrisjhye Realty Group"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formCreateData.email}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="agency1@gmail.com"
                  required
                />
              </div>

              {/* Contact Number Field */}
              <div>
                <label className="block text-gray-700 font-semibold">
                  Contact No
                </label>
                <input
                  type="text"
                  name="contactNo"
                  value={formCreateData.contactNo}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1234567890"
                  required
                />
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-gray-700 font-semibold">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formCreateData.address}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 Elhgoyum Street, Cityville, State, ZIP"
                  rows="3"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-rose-500 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition duration-500 font-semibold"
              >
                {loading ? (
                  <TbFidgetSpinner className="m-auto animate-spin" size={24} />
                ) : (
                  "Create"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Agency;
