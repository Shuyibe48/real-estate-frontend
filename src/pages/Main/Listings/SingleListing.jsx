import { Bath, Bed, Car, HomeIcon, House, Square } from "lucide-react";
import Container from "../../../components/Shared/Container";
import { Link, useLoaderData } from "react-router-dom";
import { MdEventAvailable, MdVerified } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";

import {
  FaEnvelope,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
} from "react-icons/fa";
import Map from "../../../components/Listings/Map/Map";
import Map2 from "../../../components/Listings/Map/Map2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaRegStar } from "react-icons/fa6";
import baseUrl from "../../../api/baseUrl";
import ImageSlider from "../../../components/Listings/Slider/ImageSlider";
// import PromotedList from "./PromotedLIst";

const SingleListing = () => {
  const { user, setUser } = useContext(AuthContext);
  const property = useLoaderData();
  const [save, setSave] = useState(false);

  // চেক করা প্রপার্টি সেভ করা হয়েছে কিনা
  useEffect(() => {
    if (user?.favorites?.some((fav) => fav._id === property?._id)) {
      setSave(true);
    }
  }, [property, user]);

  const saveProperty = async (id) => {
    const res = await baseUrl.post(
      `/buyers/save-favorite-property/${user._id}`,
      {
        propertyId: id,
      }
    );

    if (res.data.data) {
      setSave(!save);
    }

    const updatedUser = { ...user, ...res.data.data }; // নতুন তথ্য দিয়ে ইউজার আপডেট করা
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const removeProperty = async (id) => {
    const res = await baseUrl.post(
      `/buyers/delete-favorite-property/${user._id}`,
      {
        propertyId: id,
      }
    );

    if (res.data.data) {
      setSave(!save);
    }

    const updatedUser = { ...user, ...res.data.data }; // নতুন তথ্য দিয়ে ইউজার আপডেট করা
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState({});

  const handleReviewSubmit = async () => {
    try {
      const res = await baseUrl.post(
        `/reviews/create-reviews-property/${property?._id}`,
        {
          reviews: {
            userId: user?._id,
            id: user?.id,
            toId: property?.id,
            name: user?.fullName,
            rating: rating,
            reviews: review,
          },
        }
      );

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

  const filteredProduct = property?.reviews
    ?.filter(
      (product) => product?.approved === true && product?.blocked === false
    )
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sorting by createdAt

  useEffect(() => {
    if (filteredProduct.length > 0) {
      const total = property.reviews.length;
      const sumRating = property.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const avgRating = sumRating / total;

      setTotalReviews(total);
      setAverageRating(avgRating.toFixed(1)); // Limiting to one decimal point
    }
  }, [property, filteredProduct]);

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


  return (
    <div>
      <Container>
        {/* Image Slider */}
        <div>
          <ImageSlider images={property?.images} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4">
          {/* Left Section */}
          <div className="lg:col-span-8">
            {/* Header Section */}
            <div className="flex justify-between items-start border-b py-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold">{property?.title}</h1>
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="h-4 w-4" />
                  <span>{property?.address}</span>
                </div>
                <div className="font-semibold text-xl">$ {property?.price}</div>
              </div>
            </div>

            {/* Property Information */}
            <div className="border-b py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: "PROPERTY TYPE",
                  icon: <House className="h-5 w-5" />,
                  value: property?.propertyType,
                },
                {
                  label: "BEDROOMS",
                  icon: <Bed className="h-5 w-5" />,
                  value: property?.bedrooms,
                },
                {
                  label: "BATHROOMS",
                  icon: <Bath className="h-5 w-5" />,
                  value: property?.bathrooms,
                },
                {
                  label: "SIZE",
                  icon: <Square className="h-5 w-5" />,
                  value: `${property?.landSize}m²`,
                },
                {
                  label: "CAR SPACES",
                  icon: <Car className="h-5 w-5" />,
                  value: property?.carSpaces,
                },
                {
                  label: "PROPERTY AGE",
                  icon: <HomeIcon className="h-5 w-5" />,
                  value: property?.propertyAge,
                },
                {
                  label: "AVAILABLE DATE",
                  icon: <MdEventAvailable className="h-5 w-5" />,
                  value: new Date(property?.availableDate).toLocaleDateString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  ),
                },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <div className="flex items-center gap-1">
                    {item.icon}
                    <p className="font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-b py-8">
              <Map2 item={property} />
            </div>

            {/* Feature Lists */}
            <div className="border-b py-8 grid grid-cols-2 gap-6">
              {[
                {
                  label: "Property Requirements",
                  list: property?.propertyRequirements,
                },
                { label: "Indoor Features", list: property?.indoorFeatures },
                { label: "Outdoor Features", list: property?.outdoorFeatures },
                {
                  label: "Climate Control And Energy",
                  list: property?.climateControlAndEnergy,
                },
                {
                  label: "Accessibility Features",
                  list: property?.accessibilityFeatures,
                },
                { label: "Near By", list: property?.nearBy },
              ].map((section, idx) => (
                <div key={idx}>
                  <h1 className="font-semibold text-lg">{section.label}</h1>
                  <ul className="space-y-2">
                    {section.list?.map((item, i) => (
                      <li key={i} className="text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Sale Method & Description */}
            <div className="border-b py-8">
              <h5 className="font-semibold text-lg">Sale Method</h5>
              <p className="text-gray-600">{property?.saleMethod}</p>
              <h5 className="font-semibold text-lg mt-6">Description</h5>
              <p className="mt-4">{property?.description}</p>
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
                  <div id="enquiry" className="flex justify-center">
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
              <div className="mt-10 border-t pt-10">
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

          {/* Contact Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-20">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Link to={`/agency/${property?.agencyId?._id}`}>
                  <h2 className="text-xl font-bold mb-4">
                    {property?.agencyId?.name}
                  </h2>
                </Link>
                <img
                  src={property?.agencyId?.logo}
                  alt="Agency"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                {/* <div className="flex items-center justify-center text-yellow-500">
                  <FaStar />
                  <span className="ml-2">5.0 (59 reviews)</span>
                </div> */}
                <p className="text-gray-500 mt-2">
                  {property?.agencyId?.address}
                </p>
                <div className="mt-6 space-y-4">
                  <Link to={`/agency/${property?.agencyId?._id}`}>
                    <button className="w-full bg-red-600 text-white py-2 rounded-md font-semibold">
                      Get in touch
                    </button>
                  </Link>

                  {!save ? (
                    <button
                      onClick={() => saveProperty(property?._id)}
                      className="flex justify-center items-center gap-2 w-full border border-gray-300 py-2 rounded-md"
                    >
                      <span>
                        <FaRegStar className="w-5 h-5" />
                      </span>
                      <span className="font-semibold">Save Property</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => removeProperty(property?._id)}
                      className="flex justify-center items-center gap-2 w-full border border-gray-300 py-2 rounded-md"
                    >
                      <span>
                        <FaStar className="w-5 h-5" />
                      </span>
                      <span className="font-semibold">Save Property</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleListing;
