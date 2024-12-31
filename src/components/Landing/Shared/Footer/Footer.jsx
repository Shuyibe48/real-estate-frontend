import {
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      {/* Social Media Section */}
      <div className="bg-gray-50 py-8 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Social Icons */}
        <div className="flex space-x-4">
          <FaFacebookF className="text-gray-600 hover:text-blue-600 cursor-pointer" />
          <FaTwitter className="text-gray-600 hover:text-blue-400 cursor-pointer" />
          <FaPinterest className="text-gray-600 hover:text-red-600 cursor-pointer" />
          <FaLinkedinIn className="text-gray-600 hover:text-blue-700 cursor-pointer" />
          <FaYoutube className="text-gray-600 hover:text-red-500 cursor-pointer" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
          <a href="#" className="hover:underline">
            Advertise with us
          </a>
          <a href="#" className="hover:underline">
            Contact us
          </a>
          <a href="#" className="hover:underline">
            Agent admin
          </a>
          <a href="#" className="hover:underline">
            Media sales
          </a>
          <a href="#" className="hover:underline">
            Legal
          </a>
          <a href="#" className="hover:underline">
            Privacy settings
          </a>
          <a href="#" className="hover:underline">
            Site map
          </a>
          <a href="#" className="hover:underline">
            Careers
          </a>
        </div>
      </div>

      {/* Logos and International/Partner Sites */}
      <div className="max-w-7xl mx-auto px-4 border-t">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Logos Section */}

          {/* International and Partner Sites */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-2">
              International sites
            </h4>
            <p className="text-gray-600 mb-4">
              India | Malaysia | Singapore | Thailand | United States | Vietnam
              | International properties
            </p>
            <h4 className="text-gray-800 font-semibold mb-2">Partner sites</h4>
            <p className="text-gray-600">
              news.com.au | foxsports.com.au | homeguru.com.au | Mansion Global
              | askizzy.org.au | hipages.com.au | makaan.com | proptiger.com |
              thinkofliving.com
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto px-4 mt-8 border-t pt-8 text-center text-gray-500 text-sm">
        realestate.com.au is owned and operated by ASX-listed REA Group Ltd
        (REA:ASX) © REA Group Ltd.
      </div>
    </footer>
  );
};

export default Footer;
