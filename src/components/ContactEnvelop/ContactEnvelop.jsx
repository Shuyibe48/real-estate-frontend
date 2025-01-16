import { useContext } from "react";
import { FaStar, FaEnvelope, FaPhone, FaFacebook } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const ContactEnvelop = () => {
  const { user } = useContext(AuthContext);
  return (
    <div></div>
  );
};

export default ContactEnvelop;
