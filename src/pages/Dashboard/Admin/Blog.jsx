import { useContext, useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Container from "../../../components/Shared/Container";
import baseUrl from "../../../api/baseUrl";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";

const Blog = () => {
  const { user } = useContext(AuthContext);
  const [editPlan, setEditPlan] = useState(null);
  const [deletePlan, setDeletePlan] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await baseUrl.get("/blogs/get-blogs");
        setPlans(response?.data?.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchPlans();
  }, []);

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
      const response = await baseUrl.delete(`/blogs/${deletePlan?._id}`);
      console.log(`Blog deleted with ID: ${deletePlan?._id}`);
      setIsDeleteModalOpen(false);
      // Optionally, you can update the plans state to remove the deleted plan
      setPlans((prevPlans) =>
        prevPlans.filter((plan) => plan._id !== deletePlan?._id)
      );
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await baseUrl.patch(`/blogs/${editPlan?._id}`, {
        updatedData: {
          title: editPlan?.duration,
          description: editPlan?.price,
        },
      });

      if (response?.data?.success) {
        window.alert("Updated successfully!");
      }
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

  return (
    <div className="mt-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Link to={`/blog/${plan?._id}`}
              key={plan._id}
              className="w-72 h-64 max-w-sm border rounded-lg overflow-hidden shadow-lg p-4 hover:shadow-xl transition-shadow relative"
              style={{
                backgroundImage: `url(${
                  plan?.image || "default-placeholder.jpg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 h-full card flex flex-col justify-end p-4">
                <div
                  className={`absolute top-4 right-4 flex gap-2 ${
                    user?.userId?.role === "3" || user?.userId?.role === "4"
                      ? "hidden"
                      : "hidden"
                  }`}
                >
                  <AiFillEdit
                    className="text-white cursor-pointer"
                    size={20}
                    onClick={() => handleEdit(plan)}
                  />
                  <AiFillDelete
                    className="text-white cursor-pointer"
                    size={20}
                    onClick={() => handleDelete(plan)}
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {plan.title}
                </h2>
                <p className="text-gray-200 mb-4">
                  {plan.description.length > 100
                    ? `${plan.description.slice(0, 100)}...`
                    : plan.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Edit Plan</h3>
              <form>
                <p className="mb-1">Title</p>
                <input
                  type="text"
                  name="duration"
                  value={editPlan?.duration}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border rounded"
                />
                <p className="mb-1">Description</p>
                <textarea
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

export default Blog;
