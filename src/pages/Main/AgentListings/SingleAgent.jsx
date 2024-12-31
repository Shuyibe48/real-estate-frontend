import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Container from "../../../components/Shared/Container";
import { Bath, Bed, CookingPotIcon } from "lucide-react";
import { BiEnvelope } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import ContactEnvelop from "../../../components/ContactEnvelop/ContactEnvelop";
import { useContext, useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import baseUrl from "../../../api/baseUrl";
import PromotedList from "../Listings/PromotedLIst";

const SingleAgent = () => {
  const [showMore, setShowMore] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const agent = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [filterType, setFilterType] = useState("sold");
  const [property, setProperty] = useState([]);

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const res = await baseUrl.get(`/agents/${agent._id}`);
        setProperty(res.data.data.properties);
        setFilteredProperties(
          filterProperties(res.data.data.properties, "Rent")
        );
      } catch (error) {
        console.error("Error fetching agency data:", error);
      }
    };

    if (agent._id) {
      fetchAgency();
    }
  }, [agent]);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  // Function to handle option selection
  // const handleOptionSelect = (option) => {
  //   setSelectedOption(option);
  // };

  // Function to handle Next button click
  // const handleNextClick = () => {
  //   if (selectedOption) {
  //     console.log("Selected Enquiry:", selectedOption);
  //   } else {
  //     console.log("Please select an option before proceeding.");
  //   }
  // };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Function to handle Next button click
  const handleNextClick = async () => {
    if (selectedOption) {
      const res = await baseUrl.post(`/messages/create-message`, {
        toId: agent?.userId,
        senderId: user?.userId?._id,
        messageData: selectedOption,
      });

      if (res.data.data) {
        navigate("/inbox");
      }
    } else {
      window.alert("Please select an option before proceeding.");
    }
  };

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

  return (
    <div className="bg-[#F6F5F7]">
      <nav className="bg-[#37424B] font-semibold text-white py-4 text-center">
        {agent?.myAgency?.agent?.name}
      </nav>
      <div>
        <img
          className="object-cover w-full h-[400px]"
          src="https://t4.ftcdn.net/jpg/02/61/99/99/360_F_261999985_waD5uRLvIzezu0OQLWKOBGvWyShliFaU.jpg"
          alt=""
        />
      </div>
      <div className="py-4 bg-white xl:px-20 md:px-10 sm:px-2 px-4 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div>
            <img
              className="h-[200px] w-[200px] rounded-full"
              src={agent?.profileImage}
              alt=""
            />
          </div>
          <div className="space-y-2">
            <div>
              <h1 className="font-semibold text-xl">{agent?.fullName}</h1>
            </div>
            <p>
              Sales Consultant at{" "}
              <Link className="underline">{agent?.myAgency?.agent?.name}</Link>{" "}
            </p>
            <div className="flex items-center gap-2">
              <p>8 years experience</p>
              <p>5.0 (59 reviews)</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                Great communicator (44)
              </p>
              <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">Genuine (42)</p>
              <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                Professional (40)
              </p>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-8">
            <div className="space-y-2 my-4 bg-white p-4 rounded-md shadow-md">
              <div>
                <h1 className="font-semibold text-lg">
                  {agent?.name?.firstName}'s performance snapshot
                </h1>
                <p>Performance in the last 12 months on realestate.com.au.^</p>
              </div>
              <div className="bg-[#F6F5F7] p-4 rounded-md flex justify-between items-center gap-10">
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-semibold">$483k</h1>
                  <span className="text-center">Median sold price</span>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-semibold">30</h1>
                  <span className="text-center">Median days advertised</span>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-semibold">97</h1>
                  <span className="text-center">
                    Properties sold (as lead agent)
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-semibold">5</h1>
                  <span className="text-center">
                    Properties sold (as secondary agent)
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2 my-4 bg-white p-4 rounded-md shadow-md">
              <div>
                <h1 className="font-semibold text-lg">
                  {agent?.name?.firstName}'s properties
                </h1>
                <p>Properties currently for sale by Doug.</p>
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
                <h1 className="font-semibold text-lg">
                  {agent?.name?.firstName}'s performance
                </h1>
                <p>
                  In the last 12 months Doug Webber has sold 102 properties with
                  a median sold price of $483k on realestate.com.au.^
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center border ps-2 rounded-md">
                  <div className="flex-[1]">
                    <p className="font-semibold">Properties sold *</p>
                    <h1 className="text-2xl font-semibold">102</h1>
                  </div>
                  <div className="flex-[3] bg-[#F6F5F7] px-2 p-4 space-y-1">
                    <div className="flex justify-between items-center">
                      <p>Apartments</p>
                      <b>16 Sold</b>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>House</p>
                      <b>72 Sold</b>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Townhouses</p>
                      <b>1 Sold</b>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center border ps-2 rounded-md">
                  <div className="flex-[1]">
                    <p className="font-semibold">Median sold price</p>
                    <h1 className="text-2xl font-semibold">$483k</h1>
                  </div>
                  <div className="flex-[3] bg-[#F6F5F7] px-2 p-4 space-y-1">
                    <div className="flex justify-between items-center">
                      <p>Apartments</p>
                      <b>$423k</b>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>House</p>
                      <b>$523k</b>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Townhouses</p>
                      <b>$33k</b>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center border ps-2 rounded-md">
                  <div className="flex-[1]">
                    <p className="font-semibold">Median days advertised</p>
                    <h1 className="text-2xl font-semibold">30 Days</h1>
                  </div>
                  <div className="flex-[3] bg-[#F6F5F7] px-2 p-4 space-y-1">
                    <div className="flex justify-between items-center">
                      <p>Apartments</p>
                      <b>16 days</b>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>House</p>
                      <b>72 days</b>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Townhouses</p>
                      <b>-</b>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                * Properties sold may include other property types not listed
                here. Statistics are based on realestate.com.au sold listings in
                the last 12 months.
              </p>
            </div>

            <div className="space-y-2 my-4 bg-white p-4 rounded-md shadow-md">
              <div>
                <h1 className="font-semibold text-lg">
                  About {agent?.name?.firstName}
                </h1>
                <p>8 years experience</p>
              </div>
              <div className="py-4">
                <p>
                  {showMore
                    ? `With a lifelong dedication to this extraordinary community and extensive background of over 30 years in the retail industry, I bring an unmatched passions and determination to the process of selling your home. With a solid 7 years in the Real Estate industry, I find immense joy in every aspect of this dynamic field. Having successfully facilitated the sale of more than 500 properties, I take great pride in delivering exceptional customer service and ensuring the highest level of satisfaction for my clients. In addition to my professional endeavors, I am deeply committed to supporting and enriching the community through various initiatives. Whether it's volunteering my time or contributing to local projects, my goal is to make a positive and lasting impact. When you entrust me with your real estate needs, you can expect unparalleled results and a seamless experience. I am here to guide you with expertise, integrity, and a genuine dedication to your success. For a successful and stress-free real estate journey, please feel free to contact me. Your satisfaction is my ultimate priority, and I am here to assist you at every stage.`
                    : `With a lifelong dedication to this extraordinary community and extensive background of over 30 years in the retail industry, I bring an unmatched passions and determination to the process of selling your home. With a solid 7 years in the Real Estate industry...`}
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

            <div className="space-y-2 my-4 bg-white p-4 rounded-md shadow-md">
              <div>
                <h1 className="font-semibold text-lg">
                  {agent?.name?.firstName}'s reviews
                </h1>
                <p>
                  Read the latest client reviews of Doug Webber, real estate
                  agent at Pat O'Driscoll Real Estate - Rockhampton.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <img
                    className="h-[100px] w-[100px] rounded-full"
                    src={agent?.profileImage}
                    alt=""
                  />
                </div>
                <div>
                  <p>
                    <b>5.0</b> (59 reviews)
                  </p>
                  <p>
                    Partnered with {agent?.name?.firstName} before?{" "}
                    <span className="font-semibold text-[#005180]">
                      Leave a review
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-1">
                  Clients say {agent?.name?.firstName} is...
                </p>
                <div className="flex flex-wrap gap-2">
                  <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                    Great communicator (44)
                  </p>
                  <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                    Genuine (42)
                  </p>
                  <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                    Professional (40)
                  </p>
                  <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                    Trustworthy (40)
                  </p>
                  <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                    Reliable (26)
                  </p>
                  <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                    Got a great price (22)
                  </p>
                  <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                    Great negotiator (18)
                  </p>
                  <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                    Punctual (14)
                  </p>
                  <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                    Suburb specialist (13)
                  </p>
                  <p className="bg-[#E5E3E8] px-2 py-1 rounded-md">
                    Great marketer (7)
                  </p>
                </div>
              </div>

              <div className="bg-[#F6F5F7] p-4 rounded-md">
                <div className="flex justify-between items-start">
                  <div className="flex-[2]">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500">
                        {/* স্টার রেটিং */}
                        {[...Array(5)].map((_, index) => (
                          <AiFillStar key={index} />
                        ))}
                      </div>
                      <p className="ml-2 text-gray-700 font-semibold text-lg">
                        5.0
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800 text-base">
                      Seller of house in West Rockhampton, QLD
                    </p>
                    <span className="text-xs text-gray-500">27 days ago</span>
                    <div className="py-4 text-gray-800 text-sm">
                      <p>
                        {showMore
                          ? `Doug was great! Highly recommend him for house sale.`
                          : `Doug was great!`}
                      </p>
                      <button
                        onClick={handleToggle}
                        className="text-[#005180] font-semibold hover:underline mt-2"
                      >
                        {showMore ? "Show Less" : "Show More"}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MdVerified className="text-gray-600" />{" "}
                    {/* ভেরিফাইড আইকন */}
                    <p className="text-sm font-semibold">Verified review</p>
                  </div>
                </div>
              </div>

              <div id="enquiry" className="flex justify-center">
                <span className="mt-4 px-4 py-2 rounded-md border hover:bg-rose-50 transition duration-500 cursor-pointer font-semibold">
                  Show more reviews
                </span>
              </div>
            </div>

            <div className="space-y-2 my-4 bg-white rounded-md shadow-md">
              <div>
                {/* Header */}
                <div className="bg-gray-800 p-4 text-center text-white font-semibold text-lg">
                  pat o'driscoll real estate
                </div>

                <div className="p-4 space-y-4">
                  {/* Profile Section */}
                  <div className="flex items-center gap-6">
                    <img
                      src={agent?.profileImage}
                      alt="profile"
                      className="w-20 h-20 rounded-full"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {agent?.fullName}
                      </h2>
                      <div className="flex items-center text-yellow-500">
                        <AiFillStar />
                        <span className="font-medium">5.0</span>
                        <span className="text-gray-600 ml-1">(59 reviews)</span>
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
                        onClick={() => handleOptionSelect("Selling a property")}
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
                        onClick={() => handleOptionSelect("General enquiry")}
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

            <div className="my-4">
              <p>
                ^Agent performance snapshot data & property lists include all
                properties Doug Webber has sold (last 12 months) as lead and
                secondary agent and published on realestate.com.au. It may not
                contain off-market and private sales, properties with unknown
                sold dates, sales while at another agent and sales that may be
                exclusively listed on other websites. Please contact Doug Webber
                for their full sales history.
              </p>
            </div>
          </div>
          {/* contact envelop section here  */}
          <div className="col-span-4 mt-4">
            <div className="sticky top-3">
              <div className="flex flex-col items-center gap-4 bg-white p-4 rounded-md">
                {/* Primary Button */}
                <Link
                  to={`/multi-step-form/${agent?.userId?._id}`}
                  className="flex items-center gap-2 bg-red-600 text-white py-3 px-6 rounded-md text-sm font-semibold hover:bg-red-700 shadow-md"
                >
                  <FaEnvelope />
                  Request a free appraisal
                </Link>

                {/* Secondary Buttons */}
                <div className="flex gap-4">
                  <a
                    href="#enquiry"
                    className="flex items-center gap-2 border border-gray-300 py-2 px-4 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaEnvelope />
                    Enquire
                  </a>
                  <button className="flex items-center gap-2 border border-gray-300 py-2 px-4 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                    <FaPhoneAlt />
                    {agent?.contactNo}
                  </button>
                </div>
              </div>

              <div className="mt-20">
                <h1 className="font-semibold text-gray-500 mb-6">
                  PROMOTED PROPERTIES
                </h1>
                <PromotedList />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleAgent;
