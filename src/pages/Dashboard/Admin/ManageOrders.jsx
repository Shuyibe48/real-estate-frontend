import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Pagination from "@mui/material/Pagination";
import EmptyState from "../../../components/Shared/EmptyState";
import Loader from "../../../components/Shared/Loader";
import Container from "../../../components/Shared/Container";
import baseUrl from "../../../api/baseUrl";
import { Link } from "react-router-dom";
import { History, X } from "lucide-react";
import InvoiceComponent from "./InvoiceComponent";

const ManageOrders = () => {
  // States for managing entries, pagination, and search
  const [editPlan, setEditPlan] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const res = await baseUrl.get(`/payments/get-payments`);
        setPaymentData(res?.data?.data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleEdit = (invoice) => {
    setEditPlan(invoice);
    setIsEditModalOpen(true);
  };

  // Filtered data based on search term
  const filteredData = paymentData?.filter((item) =>
    item?.agency?.id?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  // Paginated data
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Event Handlers
  const handlePaginationChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleEntriesChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
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

  const invoiceData = {
    invoiceNumber: editPlan?.sessionId,
    date: editPlan?.createdAt,
    customerName: editPlan?.agency?.name,
    amount: editPlan?.plan?.price,
  };

  return (
    <div className="mt-8">
      <Container>
        <div>
          <div className="mb-4">
            <h5 className="text-[1.5rem] font-bold">Payment History</h5>
            <p className="text-[#9bbcd1] text-[1rem]">
              Welcome to the Payment Table!
            </p>
          </div>

          <div className="overflow-x-auto min-w-[300px] flex flex-col justify-between mb-4 mt-6 bg-[#FDF8F4] shadow-lg p-6 rounded-lg">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
              <div className="mb-4">
                <h5 className="text-xl font-semibold">All Payments List</h5>
                <p className="font-light text-sm">Welcome to the Page!</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <select
                  className="select select-accent rounded-md font-light bg-[#F9F9F9] outline-none px-2 py-1 w-[80px] text-sm"
                  value={entriesPerPage}
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
                    placeholder="Search by Agency Id"
                    className="px-2 py-1 font-light outline-none rounded-md bg-[#F9F9F9] w-full sm:w-auto"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <span className="absolute right-2">
                    <CiSearch />
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <Loader />
              ) : paginatedData && paginatedData.length > 0 ? (
                <table className="min-w-[900px] lg:min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="py-3 bg-[#FDF8F4] border-r border-t border-b  border-gray-200 text-[#99A1B7] text-left text-sm uppercase font-semibold">
                        Agency Name
                      </th>
                      <th className="py-3 bg-[#FDF8F4] border-r border-t border-b px-2 border-gray-200 text-[#99A1B7] text-left text-sm uppercase font-semibold">
                        Agency Id
                      </th>
                      <th className="py-3 bg-[#FDF8F4] border-r border-t border-b px-2 border-gray-200 text-[#99A1B7] text-left text-sm uppercase font-semibold">
                        Agency Email
                      </th>
                      <th className="py-3 bg-[#FDF8F4] border-r border-t border-b px-2 border-gray-200 text-[#99A1B7] text-left text-sm uppercase font-semibold">
                        Plan Name
                      </th>
                      <th className="py-3 bg-[#FDF8F4] border-r border-t border-b px-2 border-gray-200 text-[#99A1B7] text-left text-sm uppercase font-semibold">
                        Duration
                      </th>
                      <th className="py-3 bg-[#FDF8F4] border-r border-t border-b px-2 border-gray-200 text-[#99A1B7] text-left text-sm uppercase font-semibold">
                        Price
                      </th>
                      <th className="py-3 bg-[#FDF8F4] border-r border-t border-b px-2 border-gray-200 text-[#99A1B7] text-left text-sm uppercase font-semibold">
                        Payment Status
                      </th>
                      <th className="py-3 bg-[#FDF8F4] border-r border-t border-b px-2 border-gray-200 text-[#99A1B7] text-left text-sm uppercase font-semibold">
                        Session ID
                      </th>
                      <th className="py-3 bg-[#FDF8F4] border-r border-t border-b px-2 border-gray-200 text-[#99A1B7] text-left text-sm uppercase font-semibold">
                        Created At
                      </th>
                      <th className="py-3 bg-[#FDF8F4] border-r border-t border-b px-2 border-gray-200 text-[#99A1B7] text-left text-sm uppercase font-semibold">
                        History
                      </th>
                      <th className="py-3 bg-[#FDF8F4] border-r border-t border-b px-2 border-gray-200 text-[#99A1B7] text-left text-sm uppercase font-semibold">
                        Invoice
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item) => (
                      <tr key={item._id}>
                        <td className="py-2 border-r border-t border-b border-gray-200 bg-[#FDF8F4] text-sm">
                          {item.agency.name}
                        </td>
                        <td className="py-2 border-r border-t border-b px-2 border-gray-200 bg-[#FDF8F4] text-sm">
                          {item.agency.id}
                        </td>
                        <td className="py-2 border-r border-t border-b px-2 border-gray-200 bg-[#FDF8F4] text-sm">
                          {item.agency.email}
                        </td>
                        <td className="py-2 border-r border-t border-b px-2 border-gray-200 bg-[#FDF8F4] text-sm">
                          {item.plan.name}
                        </td>
                        <td className="py-2 border-r border-t border-b px-2 border-gray-200 bg-[#FDF8F4] text-sm">
                          {formatDuration(item.plan.duration)}
                        </td>
                        <td className="py-2 border-r border-t border-b px-2 border-gray-200 bg-[#FDF8F4] text-sm">
                          ${item.plan.price}
                        </td>
                        <td className="py-2 border-r border-t border-b px-2 border-gray-200 bg-[#FDF8F4] text-sm">
                          {item.paymentStatus}
                        </td>
                        <td
                          className="py-2 border-r border-t border-b px-2 border-gray-200 bg-[#FDF8F4] text-sm relative cursor-pointer group"
                          onClick={() => {
                            navigator.clipboard.writeText(item.sessionId);
                            alert("Session ID copied to clipboard!");
                          }}
                        >
                          <span className="inline-block truncate w-full">
                            {item.sessionId.slice(0, 10)}...
                          </span>
                          <div
                            className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-black text-white text-xs rounded px-4 py-2 w-[300px] break-words opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10"
                            style={{
                              whiteSpace: "normal",
                              textAlign: "center",
                            }}
                          >
                            {item.sessionId}
                          </div>
                        </td>

                        <td className="py-2 border-t border-b ps-2 border-gray-200 bg-[#FDF8F4] text-sm">
                          {new Date(item.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="py-2 border-r border-t border-b px-2 border-gray-200 bg-[#FDF8F4] text-sm">
                          <Link to={`/dashboard/payment/${item?.agency?._id}`}>
                            <History className="h-4 w-4" />
                          </Link>
                        </td>
                        <td className="py-2 border-r border-t border-b px-2 border-gray-200 bg-[#FDF8F4] text-sm">
                          <span
                            onClick={() => handleEdit(item)}
                            className="cursor-pointer"
                          >
                            Download PDF
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <EmptyState
                  message={"No payments available!"}
                  address={"/products"}
                  label={"Go Add Domain"}
                />
              )}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                  <span className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Invoice</h3>

                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>

                  <span>
                    <InvoiceComponent invoiceData={invoiceData} />
                  </span>
                </div>
              </div>
            )}

            <div className="pagination mt-6 flex justify-between items-center">
              <p className="font-light text-xs text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredData.length)} of{" "}
                {filteredData.length} results
              </p>
              <Pagination
                count={Math.ceil(filteredData.length / entriesPerPage)}
                page={currentPage}
                onChange={handlePaginationChange}
                shape="rounded"
                size="small"
                siblingCount={1}
                boundaryCount={1}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ManageOrders;
