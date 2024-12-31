import { useEffect, useState } from "react";
import {
  FaRegCalendarAlt,
  FaUserTie,
  FaMapMarkerAlt,
  FaClipboardList,
} from "react-icons/fa";
import Container from "../../../components/Shared/Container";

const Enquires = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: "Property Sale Discussion",
      date: new Date(Date.now() + 3600 * 1000), // 1 hour from now
      agentName: "John Doe",
      location: "Downtown Office",
      details: "Discuss the sale terms and legal requirements.",
      status: "Approved",
    },
    {
      id: 2,
      title: "Buying Consultation",
      date: new Date(Date.now() + 7200 * 1000), // 2 hours from now
      agentName: "Jane Smith",
      location: "West End Branch",
      details: "Explore property options and budget alignment.",
      status: "Pending",
    },
  ]);

  const formatTimeLeft = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [timeLeft, setTimeLeft] = useState(
    appointments.map((appointment) => {
      const diff = Math.floor((appointment.date - new Date()) / 1000);
      return diff > 0 ? diff : 0;
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) =>
        prevTimeLeft.map((time, index) => (time > 0 ? time - 1 : 0))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
                key={appointment.id}
                className={`border rounded-md p-6 shadow-md  ${
                  appointment.status === "Approved"
                    ? "border-rose-500"
                    : "border-rose-500"
                }`}
              >
                <h3 className="text-xl font-semibold border-b text-gray-800 flex items-center gap-2 mb-4 pb-2">
                  <FaUserTie className="text-rose-500" /> {appointment.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1 flex items-start gap-2">
                  <FaClipboardList className="text-gray-500" />{" "}
                  <span className="font-semibold">Details:</span>{" "}
                  {appointment.details}
                </p>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />{" "}
                  <span className="font-semibold">Location:</span>{" "}
                  {appointment.location}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Agent:</span>{" "}
                  {appointment.agentName}
                </p>
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
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Time Left:</span>{" "}
                  <span className="font-bold text-rose-500">
                    {formatTimeLeft(timeLeft[index])}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Enquires;
