import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { CiViewTable } from "react-icons/ci";
import Pagination from "@mui/material/Pagination";
import { DeleteOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
// import { deleteUserFunction } from "../../api/users";
import EmptyState from "../../../components/Shared/EmptyState";
import DeleteModal from "../../../components/Modal/DeleteModal";
import ViewModal from "../../../components/Modal/ViewModal";
import Loader from "../../../components/Shared/Loader";
import baseUrl from "../../../api/baseUrl";
import Container from "../../../components/Shared/Container";
import { Check, CornerUpLeft, User, X } from "lucide-react";
import {
  approvedListFunction,
  deleteAgentFunction,
  rejectListFunction,
} from "../../../api/users";
import { Link } from "react-router-dom";

const ModerateLists = () => {
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedProduct] = useState(null); // For edit modal
  const [isViewModalOpen, setIsEditModalOpen] = useState(false);

  const [deleteUser, setDeleteProductId] = useState(null); // For delete modal
  const [approved, setApprovedProductId] = useState(null); // For delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isApprovedModalOpen, setIsApprovedModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [action, setAction] = useState(false);

  const {
    data: responseData = {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["properties/get-properties", entries, currentPage],
    queryFn: async ({ queryKey }) => {
      const [_key, entries, currentPage] = queryKey;
      const { data } = await baseUrl.get(`properties/get-properties`, {
        params: {
          limit: entries,
          page: currentPage,
        },
      });
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [entries, currentPage, refetch]);

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;

  // Edit Modal Handler
  const handleOpenEditModal = (product) => {
    setSelectedProduct(product); // Pass the selected product
    setIsEditModalOpen(true);
  };
  const handlePaginationChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleCloseViewModal = () => {
    setIsEditModalOpen(false);
  };

  // Delete Modal Handler
  const handleOpenDeleteModal = (id) => {
    setDeleteProductId(id); // Pass the selected product id
    setIsDeleteModalOpen(true);
  };

  // Delete Modal Handler
  const handleOpenApprovedModal = (id) => {
    setApprovedProductId(id); // Pass the selected product id
    setIsApprovedModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCloseApprovedModal = () => {
    setIsApprovedModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    rejectListFunction(id).then((data) => {
      refetch();
      console.log(data);
      window.alert("Rejected Successfully!");
    });
    handleCloseDeleteModal();
  };

  const handleApprovedUser = (id) => {
    approvedListFunction(id).then((data) => {
      console.log(data);
      refetch();
      window.alert("Approved Successfully!");
    });
    handleCloseApprovedModal();
  };

  const handleEntriesChange = (event) => {
    setEntries(Number(event.target.value)); // Convert value to number
  };

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  const startProductIndex = (responseData.page - 1) * responseData.limit + 1;
  const endProductIndex = Math.min(
    responseData.page * responseData.limit,
    responseData.total
  );
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProduct = responseData?.data?.filter(
    (product) =>
      product?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) &&
      product?.approved === false &&
      product?.reject === action
  );

  return (
    <div className="mt-8">
      <Container>
        <div className="mb-4">
          <h5 className="text-[1.5rem] font-bold">Moderate Property</h5>
          <p className="text-[#9bbcd1] text-[1rem]">
            Welcome to the Moderate Property Table!
          </p>
        </div>
        <div className="overflow-x-auto min-w-[300px] flex flex-col justify-between mb-4 mt-6 bg-[#FDF8F4] shadow-lg p-6 rounded-lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
            <div className="mb-4">
              <h5 className="text-xl font-semibold">All Properties List</h5>
              <p className="font-light text-sm">Welcome to the Page!</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <select
                className="select select-accent rounded-md font-light bg-[#F9F9F9] outline-none px-2 py-1 w-[120px] text-sm"
                onChange={(e) => setAction(e.target.value === "false")}
              >
                <option value="true">Pending</option>
                <option value="false">Reject</option>
              </select>
              <select
                className="select select-accent rounded-md font-light bg-[#F9F9F9] outline-none px-2 py-1 w-[80px] text-sm"
                value={entries}
                onChange={handleEntriesChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <div className="flex justify-center items-center relative text-sm w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search by ID"
                  className="px-2 py-1 font-light outline-none rounded-md bg-[#F9F9F9] w-full sm:w-auto"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <span className="absolute right-2">
                  <CiSearch />
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredProduct &&
            Array.isArray(filteredProduct) &&
            filteredProduct?.length > 0 ? (
              <table className="min-w-[700px] lg:min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3 bg-[#FDF8F4]  border-b border-gray-100 text-[#99A1B7]  text-left text-sm uppercase font-semibold"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="py-3 bg-[#FDF8F4]  border-b border-gray-100 text-[#99A1B7]  text-left text-sm uppercase font-semibold"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="py-3 bg-[#FDF8F4]  border-b border-gray-100 text-[#99A1B7]  text-left text-sm uppercase font-semibold"
                    >
                      Property ID
                    </th>
                    <th
                      scope="col"
                      className="py-3 bg-[#FDF8F4]  border-b border-gray-100 text-[#99A1B7]  text-left text-sm uppercase font-semibold"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="py-3 bg-[#FDF8F4]  border-b border-gray-100 text-[#99A1B7]  text-left text-sm uppercase font-semibold"
                    >
                      Price
                    </th>

                    <th
                      scope="col"
                      className="py-3 bg-[#FDF8F4]  border-b border-gray-100 text-[#99A1B7]  text-left text-sm uppercase font-semibold"
                    >
                      Uploaded At
                    </th>

                    <th
                      scope="col"
                      className="py-3 bg-[#FDF8F4]  border-b border-gray-100 text-[#99A1B7]  text-left text-sm uppercase font-semibold"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProduct &&
                    filteredProduct?.map((user) => (
                      <tr key={user?._id}>
                        <td className="py-2 border-b border-gray-100 bg-[#FDF8F4] text-sm">
                          <div className="w-[40px] h-[40px] flex justify-center items-center">
                            {user?.images[0] ? (
                              <img
                                className="w-full h-full rounded-full"
                                src={user?.images[0]}
                                alt="profile"
                              />
                            ) : (
                              <User className="h-5 w-5 rounded-full text-gray-400" />
                            )}
                          </div>
                        </td>

                        <td className="py-2 border-b border-gray-100 bg-[#FDF8F4] text-sm">
                          <span className="font-light text-sm rounded-md">
                            {user?.title}
                          </span>
                        </td>
                        <td className="py-2 border-b border-gray-100 bg-[#FDF8F4] text-sm">
                          <span className="font-light text-sm rounded-md">
                            {user?.id}
                          </span>
                        </td>
                        <td className="py-2 border-b border-gray-100 bg-[#FDF8F4] text-sm">
                          <span className="font-light text-sm rounded-md">
                            {user?.type}
                          </span>
                        </td>

                        <td className="py-2 border-b border-gray-100 bg-[#FDF8F4] text-sm">
                          <span className="font-light text-sm rounded-md">
                            $ {user?.price}
                          </span>
                        </td>

                        <td className="py-2 border-b border-gray-100 bg-[#FDF8F4] text-sm">
                          <span className="font-light text-sm rounded-md">
                            {new Date(user?.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="py-2 border-b border-gray-100 bg-[#FDF8F4] text-sm">
                          <div className="flex items-center gap-2">
                            <Link to={`/list/${user?._id}`}>
                              <span className="text-[#99A1B7] hover:text-blue-500 transition duration-150 cursor-pointer">
                                <CiViewTable size={18} />
                              </span>
                            </Link>

                            {!action && (
                              <span
                                onClick={() =>
                                  handleOpenApprovedModal(user?._id)
                                } // Pass the ID for deletion
                                className="text-[#99A1B7] hover:text-green-500 transition duration-150 cursor-pointer"
                              >
                                <Check size={18} />
                              </span>
                            )}

                            <span
                              onClick={() => handleOpenDeleteModal(user?._id)} // Pass the ID for deletion
                              className="text-[#99A1B7] hover:text-red-500 transition duration-150 cursor-pointer"
                            >
                              {action ? (
                                <CornerUpLeft size={18} />
                              ) : (
                                <X size={18} />
                              )}
                            </span>
                          </div>

                          {/* Edit Modal */}
                          <ViewModal
                            isOpen={isViewModalOpen}
                            closeModal={handleCloseViewModal}
                            userInfo={selectedUser}
                          />

                          {/* Delete Modal */}
                          <DeleteModal
                            isOpen={isDeleteModalOpen}
                            closeModal={handleCloseDeleteModal}
                            modalHandler={() => handleDeleteUser(deleteUser)} // Pass the ID for delete
                            id={deleteUser}
                          />

                          {/* Delete Modal */}
                          <DeleteModal
                            isOpen={isApprovedModalOpen}
                            closeModal={handleCloseApprovedModal}
                            modalHandler={() => handleApprovedUser(approved)} // Pass the ID for delete
                            id={approved}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <EmptyState
                message={"No lists are available!"}
                address={"/dashboard/moderate-lists"}
                label={"Go to Dashboard"}
              />
            )}
          </div>
          <div className="pagination mt-6 flex justify-between items-center">
            <p className="font-light text-xs text-gray-500">
              Showing {startProductIndex} to {endProductIndex} of{" "}
              {responseData?.total} results
            </p>
            <Pagination
              count={responseData?.totalPages}
              page={currentPage}
              onChange={handlePaginationChange}
              shape="rounded"
              size="small"
              siblingCount={1}
              boundaryCount={1}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ModerateLists;
