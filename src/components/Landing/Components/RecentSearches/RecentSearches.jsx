import React, { useContext, useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Container from "../../../Shared/Container";
import { Search } from "lucide-react";
import { AuthContext } from "../../../../providers/AuthProvider";
import baseUrl from "../../../../api/baseUrl";
import { useNavigate } from "react-router-dom";

const RecentSearches = () => {
  const { user, setSearchContent } = useContext(AuthContext);
  const [saved, setSaved] = useState([]);
  const navigate = useNavigate();

  const handleSave = (index) => {
    if (!saved.includes(index)) {
      alert("Saved");
      setSaved((prev) => [...prev, index]);
    } else {
      alert("Removed from Saved");
      setSaved((prev) => prev.filter((item) => item !== index));
    }
  };

  const [searches, setSearches] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await baseUrl.get(`/users/get-user/${user?.userId?._id}`);
        const reversedSearchHistory = res?.data?.data[0]?.searchHistory
          ?.slice(-3)
          .reverse(); // রিভার্স করা ডেটা
        setSearches(reversedSearchHistory || []); // ডেটা রিভার্স করে সেট করুন
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, [user]);

  const handleSearchClick = async (type, text) => {
    console.log(type, text);
    const res = await baseUrl.post(
      `/users/save-search-history/${user?.userId?._id}`,
      { type: type, searchText: text }
    );

    setSearchContent({ type: type, searchText: text });
    localStorage.setItem(
      "query",
      JSON.stringify({ type: type, searchText: text })
    );
    navigate("/listings");
  };

  return (
    <div className="mt-10 mb-6">
      <Container>
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent searches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {searches?.map((search) => (
              <div
                onClick={() =>
                  handleSearchClick(search?.type, search?.searchText)
                }
                key={search?._id}
                className="flex cursor-pointer items-center justify-between bg-white border rounded-lg p-4 w-full"
              >
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Search className="w-4 h-4" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">
                      {search?.searchText}
                    </p>
                    <p className="text-sm text-gray-500">{search?.type}</p>
                  </div>
                </div>
                <button onClick={() => handleSave(search?._id)}>
                  {saved.includes(search?._id) ? (
                    <AiFillStar className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <AiOutlineStar className="w-6 h-6 text-gray-600" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RecentSearches;
