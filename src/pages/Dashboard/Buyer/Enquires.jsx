import { useContext, useEffect, useState } from "react";
import Container from "../../../components/Shared/Container";
import {
  FaRegCalendarAlt,
  FaUserTie,
  FaClipboardList,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaHourglassStart,
} from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import baseUrl from "../../../api/baseUrl";
import { Check, X } from "lucide-react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Enquires = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [timeLeft, setTimeLeft] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await baseUrl.get(`/users/get-user/${user?.userId?._id}`);
        const currentUser = res?.data?.data;
        setAppointments(currentUser[0]?.appointments || []);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    getMe();
  }, [user]);

  const formatTimeLeft = (time) => {
    const days = Math.floor(time / (3600 * 24)); // Total days
    const hours = Math.floor((time % (3600 * 24)) / 3600); // Remaining hours
    const minutes = Math.floor((time % 3600) / 60); // Remaining minutes
    const seconds = time % 60; // Remaining seconds

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const initializeTimeLeft = () => {
      setTimeLeft(
        appointments.map((appointment) => {
          if (!appointment.date) return 0;
          const diff = Math.floor(
            (new Date(appointment.date) - new Date()) / 1000
          );
          return diff > 0 ? diff : 0;
        })
      );
    };

    initializeTimeLeft();

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) =>
        prevTimeLeft.map((time) => (time > 0 ? time - 1 : 0))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [appointments]);

  // Modal Open Handler
  const openModal = (type, index) => {
    setModalType(type);
    setIsOpen(true);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedDate(new Date());
    setModalType(null);
  };

  // const handleOk = async () => {
  //   if (modalType === "calendar" && currentIndex !== null) {
  //     const formattedDate = selectedDate.toISOString(); // Date in ISO format
  //     const appointmentId = appointments[currentIndex]._id; // Get the appointment ID

  //     try {
  //       // Make API call to update the appointment date
  //       const response = await baseUrl.patch(`/appointments/${appointmentId}`, {
  //         newDate: formattedDate,
  //       });

  //       // Update UI or provide success feedback
  //       console.log("Appointment Updated Successfully:", response.data);
  //       console.log("Appointment ID:", appointmentId);
  //       console.log("Selected Date:", formattedDate);

  //       // Optionally refresh appointments data
  //       setAppointments((prevAppointments) =>
  //         prevAppointments.map((appointment) =>
  //           appointment._id === appointmentId
  //             ? { ...appointment, date: formattedDate }
  //             : appointment
  //         )
  //       );
  //     } catch (error) {
  //       console.error("Failed to update appointment:", error.message);
  //     }
  //   } else if (modalType === "cancel") {
  //     console.log("Appointment Cancelled");
  //   } else if (modalType === "approve") {
  //     console.log("Appointment Approved");
  //   }

  //   closeModal();
  // };

  const handleOk = async () => {
    if (currentIndex === null) return;

    const appointmentId = appointments[currentIndex]._id; // Get the appointment ID

    try {
      if (modalType === "calendar") {
        // Update appointment date
        const formattedDate = selectedDate.toISOString();
        const response = await baseUrl.patch(`/appointments/${appointmentId}`, {
          newDate: formattedDate,
        });

        console.log("Appointment Date Updated Successfully:", response.data);

        // Update UI
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, date: formattedDate }
              : appointment
          )
        );
      } else if (modalType === "cancel") {
        // Cancel appointment (DELETE request)
        await baseUrl.delete(`/appointments/${appointmentId}`);
        console.log("Appointment Cancelled Successfully");

        // Update UI
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
      } else if (modalType === "approve") {
        // Cancel appointment (DELETE request)
        await baseUrl.delete(`/appointments/${appointmentId}`);
        console.log("Appointment Cancelled Successfully");

        // Update UI
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
      }
    } catch (error) {
      console.error(`Failed to ${modalType} appointment:`, error.message);
    }

    closeModal();
  };

  return (
    <div className="mt-6">
      <Container>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <FaRegCalendarAlt className="text-rose-500" /> Appointments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment, index) => (
              <div
                key={appointment._id}
                className={`border rounded-md p-6 shadow-md ${
                  appointment.status === "Approved"
                    ? "border-green-500"
                    : "border-yellow-500"
                }`}
              >
                {/* Title */}
                <h3 className="text-xl font-semibold border-b text-gray-800 mb-4 pb-2">
                  <span className="flex justify-between items-center gap-2">
                    <span className="flex items-center gap-2">
                      <FaUserTie className="text-rose-500" />{" "}
                      {appointment.fullName}
                    </span>
                    <span className="flex justify-center items-center gap-2">
                      {user?.userId?.role === "2" && (
                        <FaRegCalendarAlt
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => openModal("calendar", index)}
                        />
                      )}

                      <X
                        className="w-4 h-4 cursor-pointer text-red-500"
                        onClick={() => openModal("cancel", index)}
                      />
                      <Check
                        className="w-4 h-4 cursor-pointer text-green-500"
                        onClick={() => openModal("approve", index)}
                      />
                    </span>
                  </span>
                </h3>

                {/* Property Details */}
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <FaHome className="text-blue-500" />
                  <span className="font-semibold">Property Address:</span>{" "}
                  {appointment.propertyAddress}
                </p>

                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <FaClipboardList className="text-gray-500" />
                  <span className="font-semibold">Property Type:</span>{" "}
                  {appointment.propertyType}
                </p>

                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <FaHourglassStart className="text-orange-500" />
                  <span className="font-semibold">Usage:</span>{" "}
                  {appointment.propertyUsage}
                </p>

                {/* Contact Info */}
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <FaPhoneAlt className="text-green-500" />{" "}
                  <span className="font-semibold">Mobile:</span>{" "}
                  {appointment.mobileNumber}
                </p>

                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <FaEnvelope className="text-red-500" />{" "}
                  <span className="font-semibold">Email:</span>{" "}
                  {appointment.email}
                </p>

                {/* Appointment Status */}
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-bold ${
                      appointment.status === "Approved"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </p>

                {/* Date or Pending */}
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Date:</span>{" "}
                  {appointment.date
                    ? new Date(appointment.date).toLocaleDateString()
                    : "Pending"}
                </p>

                <p className="text-sm bg-green-500 text-white text-center py-2 rounded-md">
                  <span className="font-semibold">Time Left: </span>
                  <span className="font-bold text-rose-500">
                    {appointment.date
                      ? formatTimeLeft(timeLeft[index])
                      : "Pending"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Appointment Modal"
        className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <h2 className="text-xl font-semibold mb-4">
          {modalType === "calendar" && "Select a Date"}
          {modalType === "cancel" && "Cancel Appointment"}
          {modalType === "approve" && "Completed Appointment"}
        </h2>
        {modalType === "calendar" && (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
          />
        )}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleOk}
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Enquires;
