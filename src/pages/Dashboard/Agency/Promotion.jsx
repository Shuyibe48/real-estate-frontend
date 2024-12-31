import { useEffect, useState } from "react";
import Container from "../../../components/Shared/Container";
import { useParams } from "react-router-dom";
import baseUrl from "../../../api/baseUrl";

const Promotion = () => {
  const [planData, setPlanData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPlan = async () => {
      setIsLoading(true);
      try {
        const res = await baseUrl.get(`/agencies/${id}`);
        setPlanData(res?.data?.data?.promotedPlan);
        setData(res?.data?.data?.properties);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPlan();
    }
  }, [id]);

  // Handle toggle switch
  // const handleToggle = async (_id) => {
  //   // Find the item by _id
  //   const updatedData = [...data];
  //   const item = updatedData?.find((row) => row?._id === _id); // Find the row by _id

  //   if (item) {
  //     item.isPromoted = !item?.isPromoted; // Toggle the promote state

  //     // Log the row data and its isPromoted state
  //     console.log("Row Data:", item);
  //     console.log("isPromoted State:", item?.isPromoted);

  //     await baseUrl.patch(
  //       `/properties/update-property-promotion-status/${_id}`,
  //       {
  //         isPromoted: item?.isPromoted,
  //       }
  //     );
  //   }

  //   setData(updatedData); // Update the state
  // };

  const handleTimeExpiry = async () => {
    try {
      // Call API to update promotion status for all properties when time is up
      await baseUrl.patch(
        `/properties/update-property-promotion-status2/${id}`
      );

      // Update the local state to reflect changes
      const updatedData = data.map((property) => ({
        ...property,
        isPromoted: false,
      }));
      setData(updatedData);
      console.log("Promotion status updated successfully for all properties.");
    } catch (error) {
      console.error("Error updating promotion status:", error.message);
    }
  };

  const handleToggle = async (_id) => {
    try {
      // Find the item by _id
      const updatedData = [...data];
      const item = updatedData.find((row) => row?._id === _id);

      if (!item) {
        console.error(`Item with _id ${_id} not found.`);
        return;
      }

      // Toggle the isPromoted state
      const newIsPromotedState = !item.isPromoted;

      // Send the updated state to the server
      await baseUrl.patch(
        `/properties/update-property-promotion-status/${_id}`,
        {
          isPromoted: newIsPromotedState,
        }
      );

      // Update the item locally
      item.isPromoted = newIsPromotedState;
      setData(updatedData); // Update the state
    } catch (error) {
      console.error("Error toggling promotion state:", error.message);
    }
  };

  const formatTimeLeft = (time) => {
    const days = Math.floor(time / (3600 * 24)); // Total days
    const hours = Math.floor((time % (3600 * 24)) / 3600); // Remaining hours
    const minutes = Math.floor((time % 3600) / 60); // Remaining minutes
    const seconds = time % 60; // Remaining seconds

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const initializeTimeLeft = () => {
      if (!planData?.endDate) return;

      const diff = Math.floor((new Date(planData?.endDate) - new Date()) / 1000);

      setTimeLeft(diff > 0 ? diff : 0);
    };

    initializeTimeLeft();

    // const interval = setInterval(() => {
    //   setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
    // }, 1000);

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(interval);
          // handleTimeExpiry(); // Call the function when time expires

          baseUrl.patch(`/properties/update-property-promotion-status2/${id}`);

          // Update the local state to reflect changes
          const updatedData = data?.map((property) => ({
            ...property,
            isPromoted: false,
          }));
          setData(updatedData);

          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [planData, data, id]);

  const formatDuration = (days) => {
    if (days < 7) {
      return `${days} Day${days > 1 ? "s" : ""}`;
    } else if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks} Week${weeks > 1 ? "s" : ""}`;
    } else if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months} Month${months > 1 ? "s" : ""}`;
    } else {
      const years = Math.floor(days / 365);
      return `${years} Year${years > 1 ? "s" : ""}`;
    }
  };

  return (
    <div className="mt-10">
      <Container>
        <div>
          <h1 className="mb-8 flex justify-between">
            <span>
              <span className="font-semibold text-xl underline">
                Real Estate Ads
              </span>{" "}
              (formerly Promoted Properties)
            </span>
            <span className="text-white bg-green-500 p-4 rounded-md">
              <p className="mb-1 text-white font-semibold text-xl uppercase">
                {planData?.planId?.name}
              </p>
              <p className="mb-1 text-white font-semibold text-md uppercase">
                {formatDuration(planData?.planId?.duration)}
              </p>

              <p className="text-sm mb-1 text-white">
                <span className="font-semibold">End Date:</span>{" "}
                {new Date(planData?.endDate).toLocaleDateString()}
              </p>

              <p className="font-bold text-rose-500 text-center shadow-md py-2 rounded-md">
                {formatTimeLeft(timeLeft)}
              </p>
            </span>
          </h1>
          <p className="font-semibold mb-2">Ad performance</p>
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300">Campaign</th>
                <th className="px-4 py-2 border border-gray-300">Promote</th>
                <th className="px-4 py-2 border border-gray-300">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, index) => (
                <tr key={row._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300 flex items-center gap-2">
                    <img
                      src={
                        row?.images && row?.images.length > 0
                          ? row?.images[0]
                          : "https://via.placeholder.com/40"
                      } // Default image if images is undefined or empty
                      alt="Campaign"
                      className="w-10 h-10 object-cover rounded"
                    />

                    {row.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={row.isPromoted}
                        onChange={() => handleToggle(row._id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-rose-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-600"></div>
                      <span className="peer-checked:translate-x-6 peer-checked:bg-white absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></span>
                    </label>
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    {row.clicks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default Promotion;
