import { useState, useContext } from "react";
import { Bell, Lightbulb, StarIcon } from "lucide-react";
import Button from "../../../Button/Button";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthProvider";
import { BiEnvelope } from "react-icons/bi";
import { GiInvisible } from "react-icons/gi";

const MenuDropdown = () => {
  const { user } = useContext(AuthContext);
  const [showStarDropdown, setShowStarDropdown] = useState(false);
  const [showBellDropdown, setShowBellDropdown] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New sales in Queensland", date: "Saturday", viewed: false },
    {
      id: 2,
      text: "Update available for your profile",
      date: "2 November",
      viewed: false,
    },
    { id: 3, text: "Message from support", date: "1 November", viewed: false },
    {
      id: 4,
      text: "New feature added to your dashboard",
      date: "31 October",
      viewed: false,
    },
    // Additional demo notifications
  ]);

  const toggleStarDropdown = () => {
    setShowStarDropdown(!showStarDropdown);
    setShowBellDropdown(false);
  };

  const toggleBellDropdown = () => {
    setShowBellDropdown(!showBellDropdown);
    setShowStarDropdown(false);
    if (hasNewNotifications) {
      setHasNewNotifications(false);
    }
  };

  const handleNotificationClick = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, viewed: true }
          : notification
      )
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 font-semibold">
        {user ? (
          ""
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hover:bg-gray-100 px-3 py-[7px] rounded-md transition duration-300"
            >
              Sign in
            </Link>
            <Link to="/signUp" className="hidden sm:block">
              <Button text="Join" />
            </Link>
          </div>
        )}

        {/* User logged-in menu */}
        {user ? (
          <div className="flex items-center relative">
            {(user?.userId?.role === "1" ||
              user?.userId?.role === "2" ||
              user?.userId?.role === "5") && (
              <Link
                to="/inbox"
                className="hover:bg-gray-100 py-2 px-3 rounded-md transition duration-300 cursor-pointer"
              >
                <BiEnvelope className="w-5 h-5 text-gray-700" />
              </Link>
            )}

            {user?.userId?.role === "1" && (
              <div
                className="hover:bg-gray-100 py-2 px-3 rounded-md transition duration-300 cursor-pointer"
                onClick={toggleStarDropdown}
              >
                <StarIcon className="w-5 h-5 text-gray-700" />
              </div>
            )}

            {/* Star Icon Dropdown */}
            {showStarDropdown && (
              <div className="absolute top-12 right-0 w-56 bg-white border border-gray-200 shadow-lg rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-3">Collections</h3>
                <ul className=" text-gray-600">
                  <li className="font-normal cursor-pointer border-t py-4 flex items-center gap-2 hover:text-black transition-colors">
                    <StarIcon className="w-5 h-5" />
                    <Link to="/dashboard/favorite-properties">
                      Saved properties
                    </Link>
                  </li>
                  <li className="font-normal cursor-pointer border-t py-4 flex items-center gap-2 hover:text-black transition-colors">
                    <BiEnvelope className="w-5 h-5" />
                    <Link to="/dashboard/enquiries">Enquired</Link>
                  </li>
                </ul>
              </div>
            )}

            {user?.userId?.role === "6" && (
              <div
                className="relative hover:bg-gray-100 py-2 px-3 rounded-md transition duration-300 cursor-pointer"
                onClick={toggleBellDropdown}
              >
                <Bell className="w-5 h-5 text-gray-700" />
                {hasNewNotifications && (
                  <span className="absolute top-1 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
            )}

            {/* Bell Icon Dropdown */}
            {showBellDropdown && (
              <div className="absolute top-12 right-0 w-64 bg-white border border-gray-200 shadow-lg rounded-xl p-4 max-h-64 overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Notifications
                  </h3>
                  <Link to="/settings" className="text-blue-600 text-sm">
                    Settings
                  </Link>
                </div>
                <ul className="space-y-3 text-gray-600">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer ${
                        notification.viewed
                          ? "bg-gray-50"
                          : "bg-blue-50 font-semibold"
                      } hover:bg-gray-100`}
                    >
                      <Bell className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-gray-800">{notification.text}</p>
                        <span className="text-gray-500 text-xs">
                          {notification.date}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="hover:bg-gray-100 py-2 px-3 rounded-md transition duration-300">
              <Link
                to={`${
                  user.userId.role === "1"
                    ? "/dashboard/profile"
                    : user.userId.role === "2"
                    ? `/dashboard/portfolio/${user?._id}`
                    : user.userId.role === "3" || user.userId.role === "4"
                    ? "/dashboard/dashboard-overview"
                    : user.userId.role === "5"
                    ? `/dashboard/developer-profile/${user._id}`
                    : "/"
                }`}
                className="cursor-pointer"
              >
                <RxAvatar className="w-5 h-5 text-gray-700" />
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MenuDropdown;
