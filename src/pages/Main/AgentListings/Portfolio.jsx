import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Container from "../../../components/Shared/Container";
import { Bath, Bed, Briefcase, CircleAlert, CogIcon, CookingPotIcon, Edit, MenuSquare, X } from "lucide-react";
import { BiEnvelope } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import ContactEnvelop from "../../../components/ContactEnvelop/ContactEnvelop";
import { useContext, useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaStar } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import baseUrl from "../../../api/baseUrl";
// import PromotedList from "../Listings/PromotedLIst";
import { formatDistanceToNow } from "date-fns";
import EditAgentModal from "../../../components/Modal/EditAgentModal";

const Portfolio = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const agent = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenOption, setIsMenuOpenOption] = useState(false);

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

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [complain, setComplain] = useState("");

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setComplain(""); // Clear the complain text on modal close
  };

  const handleComplainChange = (e) => {
    setComplain(e.target.value);
  };

  const handleReportSubmit = async () => {
    try {
      const res = await baseUrl.post(
        `/complains/create-complains/${agent?._id}`,
        {
          complain: {
            userId: user?._id,
            id: user?.id,
            toId: agent?.id,
            name: user?.fullName,
            complain: complain,
          },
        }
      );

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        window.alert("Complain submitted successfully!");
        closeReportModal();
      } else {
        throw new Error("Failed to submit complain");
      }
    } catch (error) {
      console.error("Error submitting complain:", error);
      window.alert(
        "An error occurred while submitting your complain. Please try again."
      );
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const res = await baseUrl.post(
        `/reviews/create-reviews-agent/${agent?._id}`,
        {
          reviews: {
            userId: user?._id,
            id: user?.id,
            toId: agent?.id,
            name: user?.fullName,
            rating: rating,
            reviews: review,
          },
        }
      );

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        window.alert("Review submitted successfully!");
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      window.alert(
        "An error occurred while submitting your review. Please try again."
      );
    }
  };

  const filteredProduct = agent?.reviews
    ?.filter(
      (product) => product?.approved === true && product?.blocked === false
    )
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sorting by createdAt

  useEffect(() => {
    if (filteredProduct?.length > 0) {
      const total = agent?.reviews?.length;
      const sumRating = agent?.reviews?.reduce(
        (sum, review) => sum + review?.rating,
        0
      );
      const avgRating = sumRating / total;

      setTotalReviews(total);
      setAverageRating(avgRating.toFixed(1)); // Limiting to one decimal point
    }
  }, [agent, filteredProduct]);

  const reviewsToShow = showAllReviews
    ? filteredProduct
    : filteredProduct.slice(0, 5);

  const toggleShowReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const toggleReviewText = (reviewId) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  const myReview = filteredProduct?.filter(
    (product) => product?.id === user?.id
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

   // Edit Modal Handler
   const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-[#F6F5F7]">
      <nav className="bg-[#37424B] font-semibold text-white py-4 text-center flex justify-between items-center px-4">
        <span>{agent?.myAgency[0]?.agency?.name}</span>
        <span className="cursor-pointer" onClick={openReportModal}>
          <CircleAlert className="h-4 w-4 text-gray-300" />
        </span>

        {isReportModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md max-w-md w-full">
              <h2 className="text-lg font-semibold mb-4">Report Form</h2>
              <textarea
                value={complain}
                onChange={handleComplainChange}
                className="w-full text-black h-32 border border-gray-300 rounded-md p-2"
                placeholder="Write your complain here..."
              />
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={handleReportSubmit}
                >
                  Submit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={closeReportModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
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
            {agent?.myAgency[0]?.agency?.name && (
              <p>
                Sales Consultant at{" "}
                <Link className="underline">
                  {agent?.myAgency[0]?.agency?.name}
                </Link>{" "}
              </p>
            )}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-500">
                <AiFillStar />
                <span className="font-medium">{averageRating}.0</span>
                <span className="text-gray-600 ml-1">
                  ({totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <button className="hover:bg-rose-50 p-2 rounded-md transition duration-500">
            <Edit onClick={() => handleOpenEditModal()} className="h-5 w-5" />
          </button>
          {/* Edit Modal */}
          <EditAgentModal
            isOpen={isEditModalOpen}
            closeModal={handleCloseEditModal}
            agentInfo={agent}
            // refetch={refetch}
          />
          <div className="relative inline-block">
            <button
              onClick={() => setIsMenuOpenOption(!isMenuOpenOption)}
              className="flex items-center p-2 hover:bg-rose-50 rounded-md transition duration-500"
            >
              {!isMenuOpenOption ? (
                <MenuSquare className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </button>

            {isMenuOpenOption && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform origin-top-right"
                style={{
                  opacity: isMenuOpenOption ? 1 : 0,
                  transform: isMenuOpenOption ? "scaleY(1)" : "scaleY(0)",
                }}
              >
                <div className="p-2 space-y-2">
                  <Link
                    to="/dashboard/agency"
                    className="flex items-center p-2 text-gray-700 rounded hover:bg-rose-50 hover:text-rose-500 transition duration-300"
                  >
                    <Briefcase className="h-5 w-5 mr-2" />
                    My Agency
                  </Link>
                  <Link
                    to="/dashboard/my-lists"
                    className="flex items-center p-2 text-gray-700 rounded hover:bg-rose-50 hover:text-rose-500 transition duration-300"
                  >
                    <CogIcon className="h-5 w-5 mr-2" />
                    Manage List
                  </Link>
                </div>
              </div>
            )}
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
              </div>
              <div className="py-4">
                <p>
                  {showMore
                    ? agent?.description
                    : `${agent?.description.slice(0, 150)}...`}
                </p>
                <button
                  onClick={handleToggle}
                  className="font-semibold hover:underline mt-2"
                >
                  {showMore ? "Show Less" : "Show More"}
                </button>
              </div>
              <div id="enquiry" className="flex justify-center">
                <button className="flex mt-2 w-4/5 justify-center items-center gap-1 bg-rose-500 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition duration-500 font-semibold">
                  <span>
                    <BiEnvelope />
                  </span>
                  Request a free appraisal
                </button>
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
                        <span className="font-medium">{averageRating}.0</span>
                        <span className="text-gray-600 ml-1">
                          ({totalReviews} reviews)
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

            {totalReviews > 0 && (
              <div className="space-y-2 my-4 bg-white p-4 rounded-md shadow-md">
                <p className="text-lg">
                  <b>{averageRating}</b> ({totalReviews} reviews)
                </p>
                {reviewsToShow?.map((review) => (
                  <div key={review._id} className="bg-[#F6F5F7] p-4 rounded-md">
                    <div className="flex justify-between items-start">
                      <div className="flex-[2]">
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-500">
                            {[...Array(review?.rating)].map((_, index) => (
                              <AiFillStar key={index} />
                            ))}
                          </div>
                          <p className="ml-2 text-gray-700 font-semibold text-lg">
                            {review?.rating}.0
                          </p>
                        </div>
                        <p className="font-semibold text-gray-800 text-base">
                          {review?.name}
                        </p>
                        <p>
                          {formatDistanceToNow(new Date(review.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                        <div className="py-4 text-gray-800 text-sm">
                          <p>
                            {expandedReviews[review._id]
                              ? review.reviews
                              : review.reviews.length > 200
                              ? review.reviews.slice(0, 200) + "..."
                              : review.reviews}
                          </p>
                          {review.reviews.length > 200 && (
                            <button
                              onClick={() => toggleReviewText(review._id)}
                              className="text-[#005180] font-semibold hover:underline mt-2"
                            >
                              {expandedReviews[review._id]
                                ? "Show Less"
                                : "Show More"}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MdVerified className="text-gray-600" />
                        <p className="text-sm font-semibold">Verified review</p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredProduct.length > 5 && (
                  <div className="flex justify-center">
                    <span
                      onClick={toggleShowReviews}
                      className="mt-4 px-4 py-2 rounded-md border hover:bg-rose-50 transition duration-500 cursor-pointer font-semibold"
                    >
                      {showAllReviews
                        ? "Show less reviews"
                        : "Show more reviews"}
                    </span>
                  </div>
                )}
              </div>
            )}

            {!myReview.length ? (
              <div className="mt-10 border-t pt-10 mb-10">
                <h2 className="text-2xl font-semibold">Leave a Review</h2>
                <div className="mt-4">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer ${
                          star <= rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <textarea
                    className="w-full border p-2 rounded-md resize-none"
                    rows="4"
                    placeholder="Write your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                  <button
                    className="mt-4 bg-rose-600 text-white py-2 px-4 rounded-md"
                    onClick={handleReviewSubmit}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
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
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Portfolio;
