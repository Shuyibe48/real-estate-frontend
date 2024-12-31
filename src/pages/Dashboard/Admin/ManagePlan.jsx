import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Container from "../../../components/Shared/Container";
import baseUrl from "../../../api/baseUrl";

const ManagePlan = () => {
  const [editPlan, setEditPlan] = useState(null);
  const [deletePlan, setDeletePlan] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await baseUrl.get("/plans/get-plans");
        setPlans(response?.data?.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const handleGetPlan = (planId) => {
    console.log(`Plan purchased with ID: ${planId}`);
  };

  const handleEdit = (plan) => {
    setEditPlan(plan);
    setIsEditModalOpen(true);
  };

  const handleDelete = (plan) => {
    setDeletePlan(plan);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await baseUrl.delete(`/plans/${deletePlan?._id}`);
      console.log(`Plan deleted with ID: ${deletePlan?._id}`);
      setIsDeleteModalOpen(false);
      // Optionally, you can update the plans state to remove the deleted plan
      setPlans((prevPlans) =>
        prevPlans.filter((plan) => plan._id !== deletePlan?._id)
      );
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await baseUrl.patch(`/plans/${editPlan?._id}`, {
        duration: editPlan?.duration,
        price: editPlan?.price,
      });
      console.log("Edited Plan:", {
        id: editPlan._id,
        duration: editPlan.duration,
        price: editPlan.price,
      });
      setIsEditModalOpen(false);
      // Optionally, update the plans state to reflect the changes
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan._id === editPlan._id
            ? { ...plan, duration: editPlan.duration, price: editPlan.price }
            : plan
        )
      );
    } catch (error) {
      console.error("Error editing plan:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

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
    <div className="mt-6">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="w-full max-w-sm border rounded-lg shadow-lg p-6 bg-[#f8f9fa] flex flex-col justify-between hover:shadow-xl transition-shadow relative"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <AiFillEdit
                  className="text-gray-300 cursor-pointer"
                  size={20}
                  onClick={() => handleEdit(plan)}
                />
                <AiFillDelete
                  className="text-rose-300 cursor-pointer"
                  size={20}
                  onClick={() => handleDelete(plan)}
                />
              </div>
              <h2 className="text-2xl font-bold text-[#212529] mb-2">
                {plan.name}
              </h2>
              <p className="text-[#495057] mb-4">{plan.description}</p>
              <ul className="mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-[#212529]">
                    ✔ {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#212529] mb-1">
                  ${plan.price}
                </p>
                <p className="text-sm text-[#6c757d] mb-4">
                  {formatDuration(plan.duration)}
                </p>
                <button
                  onClick={() => handleGetPlan(plan._id)}
                  className="w-full px-4 py-2 bg-[#28a745] text-white rounded-lg hover:bg-[#218838] transition-colors"
                >
                  Get {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Edit Plan</h3>
              <form>
                <p className="mb-1">Duration</p>
                <input
                  type="text"
                  name="duration"
                  value={editPlan?.duration}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border rounded"
                />
                <p className="mb-1">Price</p>
                <input
                  type="number"
                  name="price"
                  value={editPlan?.price}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border rounded"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg mr-2"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
              <p className="mb-4">
                Are you sure you want to delete "{deletePlan.name}"?
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-lg mr-2"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ManagePlan;
