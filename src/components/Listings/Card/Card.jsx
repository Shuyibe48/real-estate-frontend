import { Bath, Bed, Car, CookingPotIcon, Square, Star } from "lucide-react";
import { Link } from "react-router-dom";
import baseUrl from "../../../api/baseUrl";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaRegStar, FaStar } from "react-icons/fa6";

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

  return (
    <Link
      ref={linkRef}
      onClick={() => clickProperty(items?._id)}
      to={`/list/${items?._id}`}
    >
      {/* <Link> */}
      <div className="border rounded-lg bg-white shadow-md">
        <div className="relative py-4 ps-2 pr-24 bg-rose-500 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">
              {agencyId.name}
            </h2>
            <h5 className="font-semibold text-white">
              {uploaderAgentId.fullName}
            </h5>
          </div>
          <div className="absolute top-2 right-4">
            <img
              className="h-[80px] w-[80px] rounded-full"
              src={uploaderAgentId.profileImage}
              alt="Owner"
            />
          </div>
        </div>
        <div>
          <img className="w-full h-[400px]" src={images[0]} alt="" />
        </div>
        <div className="p-6">
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
          <div className="mt-4">
            <p>{address}</p>
          </div>
          <div className="flex items-center gap-4 my-2">
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
