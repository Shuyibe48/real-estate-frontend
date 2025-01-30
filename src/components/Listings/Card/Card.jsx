import {
  Bath,
  Bed,
  Car,
  ChevronLeft,
  ChevronRight,
  CookingPotIcon,
  Square,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import baseUrl from "../../../api/baseUrl";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Card = ({ items }) => {
  const { user, setUser } = useContext(AuthContext);
  const [save, setSave] = useState(false);
  const linkRef = useRef(null);

  const {
    _id,
    id,
    title,
    description,
    type,
    propertyType,
    price,
    landSize,
    latitude,
    address,
    longitude,
    carSpaces,
    bedrooms,
    bathrooms,
    images,
    agencyId,
    uploaderAgentId,
  } = items;

  // চেক করা প্রপার্টি সেভ করা হয়েছে কিনা
  useEffect(() => {
    if (user?.favorites?.some((fav) => fav._id === _id)) {
      setSave(true);
    }
  }, [user, _id]);

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

  const clickProperty = async (id) => {
    await baseUrl.patch(`/properties/update-property-clicks/${id}`);
  };

  // Intersection Observer ব্যবহার করে স্ক্রিনে দৃশ্যমান হলে ফাংশন কল
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // লিংকটি স্ক্রিনে আসলে viewProperty কল হবে
            viewProperty(_id);
          }
        });
      },
      { threshold: 0.5 } // ৫০% এলিমেন্ট স্ক্রিনে আসলে কল হবে
    );

    if (linkRef.current) {
      observer.observe(linkRef.current);
    }

    return () => {
      if (linkRef.current) {
        observer.unobserve(linkRef.current);
      }
    };
  }, [_id]);

  const viewProperty = async (id) => {
    await baseUrl.patch(`/properties/update-property-views/${id}`);
  };

  const PreviousArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 text-white z-10"
    >
      <ChevronLeft className="w-10 h-10" />
    </button>
  );

  // Custom Next Button
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-white z-10"
    >
      <ChevronRight className="w-10 h-10" />
    </button>
  );

  const settings = {
    dots: false, // ডট বাটন বন্ধ
    infinite: true, // লুপ চালানোর জন্য
    speed: 500, // অ্যানিমেশন স্পিড
    slidesToShow: 1, // একবারে একটি ইমেজ দেখাবে
    slidesToScroll: 1, // একবারে একটি করে স্ক্রল করবে
    nextArrow: <NextArrow />, // কাস্টম পরবর্তী বাটন
    prevArrow: <PreviousArrow />, // কাস্টম পূর্ববর্তী বাটন
    autoplay: false, // অটোপ্লে বন্ধ
  };

  return (
    <Link
      ref={linkRef}
      onClick={() => clickProperty(items?._id)}
      to={`/list/${items?._id}`}
    >
      {/* <Link> */}
      <div className="border rounded-lg bg-white shadow-md">
        <div className="relative py-2 ps-2 pr-24 bg-[#11828D] rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {agencyId.name}
            </h2>
            <h5 className="font-semibold text-white">
              {uploaderAgentId.fullName}
            </h5>
          </div>
          <div className="absolute top-2 right-4 z-50">
            <img
              className="h-[80px] w-[80px] rounded-full"
              src={uploaderAgentId.profileImage}
              alt="Owner"
            />
          </div>
        </div>
        <div className="relative w-full h-[350px]">
          <Slider {...settings}>
            {images?.map((image, index) => (
              <div key={index}>
                <img
                  className="w-full h-[350px] object-cover"
                  src={image}
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="p-4">
          {!save ? (
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">{title}</h1>
              <span
                onClick={() => saveProperty(_id)}
                className="p-2 hover:bg-rose-50 rounded-md transition duration-500"
              >
                <FaRegStar className="w-5 h-5" />
              </span>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">{title}</h1>
              <span
                onClick={() => removeProperty(_id)}
                className="p-2 hover:bg-rose-50 rounded-md transition duration-500"
              >
                <FaStar className="w-5 h-5" />
              </span>
            </div>
          )}
          <div className="mt-2">
            <p>{address}</p>
          </div>
          <div className="flex items-center gap-4 my-1">
            <span className="flex justify-center items-center gap-2">
              <Bed className="h-4 w-4" />
              <span>{bedrooms}</span>
            </span>
            <span className="flex justify-center items-center gap-2">
              <Bath className="h-4 w-4" />
              <span>{bathrooms}</span>
            </span>
            <span className="flex justify-center items-center gap-2">
              <Car className="h-4 w-4" />
              <span>{carSpaces}</span>
            </span>
            <span className="flex justify-center items-center gap-2">
              <Square className="h-4 w-4" />
              <span>
                {landSize}m<sup>2</sup>
              </span>
            </span>
            <span className="capitalize border-l pl-2">{propertyType}</span>
          </div>
          <p>Inspection Sat 2 Nov 9:00am</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
