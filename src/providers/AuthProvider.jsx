import { createContext, useEffect, useState } from "react";
import baseUrl from "../api/baseUrl";
import { verifyToken } from "../utils/verifyToken";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // global
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true);

  // ---------------

  // landing
  const [foldMenu, setFoldMenu] = useState(false);

  // ------------

  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // [[[[[[[[[]]]]]]]]]

  // listings and search filters state
  const [query, setQuery] = useState({
    type: "Buy",
    searchText: "",
    propertyType: "",

    // নির্দিষ্ট প্রপার্টিগুলো ডিফল্ট ভ্যালু হিসেবে দেয়া হলো
    price: {
      min: "",
      max: "",
    },
    bedrooms: "",
    bathrooms: "",
    carSpaces: "",
    landSize: "",
    propertyAge: "",

    // arrays বা lists গুলোর জন্য ডিফল্ট মান সেট করা হলো
    selectedIndoorFeatures: "",
    selectedOutdoorFeatures: "",
    selectedClimateControl: "",
    selectedAccessibility: "",

    selectedSaleMethod: "",
  });

  const [searchContent, setSearchContent] = useState({});

  // [[[[[[[[[]]]]]]]]]

  // ইউজার ডাটা আপডেট বা লগআউটের জন্য ফাংশন তৈরি
  const loginUser = async (email, password) => {
    try {
      const response = await baseUrl.post(`/auth/login`, {
        email,
        password,
      });
      const token = response?.data?.data?.accessToken;

      // টোকেনকে লোকাল স্টোরেজে সংরক্ষণ
      localStorage.setItem("access-token", token);

      // টোকেন ডিকোড করে ইউজার সেট করা
      // const decodedUser = verifyToken(token);

      const res = await baseUrl.get(`/users/me`, {
        headers: {
          Authorization: token,
        },
      });

      const currentUser = res?.data?.data;

      setUser(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");
    localStorage.removeItem("query");
    setUser(null);
  };

  useEffect(() => {
    // অ্যাপ রিলোড হলে লোকাল স্টোরেজ থেকে ইউজার লোড
    const storedUser = localStorage.getItem("user");
    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  useEffect(() => {
    // অ্যাপ রিলোড হলে লোকাল স্টোরেজ থেকে query লোড
    const storedQuery = localStorage.getItem("query");
    if (storedQuery) {
      setSearchContent(JSON.parse(storedQuery));
    }
    setLoading(false);
  }, []);

  const authInfo = {
    user,
    setUser,
    loginUser,
    logoutUser,
    loading,
    setLoading,
    foldMenu,
    setFoldMenu,
    showProjects,
    setShowProjects,
    showPriority,
    setShowPriority,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    query,
    setQuery,
    searchContent,
    setSearchContent,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
