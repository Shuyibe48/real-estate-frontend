import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import baseUrl from "../../../api/baseUrl";
import Loader from "../../../components/Shared/Loader";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/Shared/Container";
import {
  Bath,
  Bed,
  Car,
  Check,
  Edit,
  Shield,
  ShieldAlert,
  ShieldBan,
  ShieldCheck,
  ShieldOff,
  Undo2,
  X,
} from "lucide-react";
import EmptyState from "../../../components/Shared/EmptyState";
import { Link, useParams } from "react-router-dom";
import DeveloperActionModal from "../../../components/Modal/DeveloperActionModal";
import { CiSearch } from "react-icons/ci";

const DeveloperProject = (id) => {
  const { user } = useContext(AuthContext);
  const [actions, setActions] = useState("approved");
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [projectId, setProjectId] = useState("");
  const [entries, setEntries] = useState("approved");
  const [actionOpen, setActionOpen] = useState(false);

  const {
    data: responseData = {
      data: [],
    },
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["developers"],
    queryFn: async ({ queryKey }) => {
      const [_key] = queryKey;
      const { data } = await baseUrl.get(`/developers/${id}`);
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;

  let approved = false;
  let reject = false;
  let block = false;
  let pending = false;

  if (entries === "approved") {
    approved = true;
  } else if (entries === "reject") {
    reject = true;
  } else if (entries === "block") {
    block = true;
  } else if (entries === "pending") {
    pending = true;
  }

  const filteredProject = Array.isArray(responseData?.data?.projects)
    ? responseData?.data?.projects.filter((product) => {
        if (approved) {
          return (
            (product?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
              product?.title
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase())) &&
            product?.approved === true &&
            product?.blocked === false
          );
        }
        if (reject) {
          return (
            (product?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
              product?.title
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase())) &&
            product?.reject === true
          );
        }
        if (block) {
          return (
            (product?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
              product?.title
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase())) &&
            product?.blocked === true
          );
        }
        if (pending) {
          return (
            (product?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
              product?.title
                ?.toLowerCase()
                .includes(searchTerm?.toLowerCase())) &&
            product?.approved === false &&
            product?.reject === false &&
            product?.blocked === false
          );
        }
        // Default return if no conditions match
        return true;
      })
    : []; // Default to empty array if projects is not an array

  // Filter based on the true condition
  //   const filteredProject = responseData?.data?.projects.filter((product) => {
  //     if (approved) {
  //       return (
  //         (product?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  //           product?.title?.toLowerCase().includes(searchTerm?.toLowerCase())) &&
  //         product?.approved === true
  //       );
  //     }
  //     if (reject) {
  //       return (
  //         (product?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  //           product?.title?.toLowerCase().includes(searchTerm?.toLowerCase())) &&
  //         product?.reject === true
  //       );
  //     }
  //     if (block) {
  //       return (
  //         (product?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  //           product?.title?.toLowerCase().includes(searchTerm?.toLowerCase())) &&
  //         product?.blocked === true
  //       );
  //     }
  //     if (pending) {
  //       return (
  //         (product?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  //           product?.title?.toLowerCase().includes(searchTerm?.toLowerCase())) &&
  //         product?.approved === false &&
  //         product?.reject === false &&
  //         product?.blocked === false
  //       );
  //     }
  //     // Default return if no conditions match
  //     return true;
  //   });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEntriesChange = (event) => {
    setEntries(event.target.value); // Convert value to number
  };

  const openModalHandler = (id, action) => {
    setProjectId(id);
    setAction(action);
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const modalHandler = async (action, id) => {
    // Validate action and id
    if (!["approved", "reject", "block", "delete"].includes(action) || !id) {
      window.alert("Invalid action or ID!");
      return;
    }

    // Define base URLs for actions
    const actionUrls = {
      approved: `/projects/approved/${id}`,
      reject: `/projects/reject/${id}`,
      block: `/projects/block/${id}`,
      delete: `/projects/${id}`,
    };

    // Get the corresponding URL
    const url = actionUrls[action];

    try {
      // Make the delete request
      const res = await baseUrl.delete(url);

      // Check for successful response
      if (res?.data?.success) {
        window.alert(
          `${action.charAt(0).toUpperCase() + action.slice(1)} successfully!`
        );
        refetch();
        closeModalHandler();
      } else {
        window.alert(`Failed to ${action}! Please try again.`);
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      window.alert(`An error occurred while trying to ${action}.`);
    }
  };

  return (
    <div className="mt-10">
      <Container>
        {/* <div className="mb-6 flex items-center justify-between border-b pb-2">
          <h1 className="text-xl font-semibold">Projects</h1>
          <div className="flex justify-center items-center relative text-sm w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 font-light outline-none rounded-md bg-[#F9F9F9] w-full sm:w-auto"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="absolute right-2">
              <CiSearch />
            </span>
          </div>
          <select
            className="select select-accent rounded-md font-light bg-[#F9F9F9] outline-none px-2 py-1 w-[120px] text-sm"
            value={entries}
            onChange={handleEntriesChange}
          >
            <option value={"approved"}>Approved</option>
            <option value={"pending"}>Pending</option>
            <option value={"reject"}>Reject</option>
            <option value={"block"}>Blocked</option>
          </select>
        </div> */}
        {filteredProject.length > 0 ? (
          <div>
            {filteredProject?.map((project) => (
              <div
                className="shadow-md w-[260px] rounded-xl overflow-hidden relative"
                key={project?._id}
              >
                <Link to={`/dashboard/single-project/${project?._id}`}>
                  {" "}
                  <div>
                    <img
                      className="w-[260px] h-[140px]"
                      src={project.images[0]}
                      alt=""
                    />
                  </div>
                </Link>
                <div className="p-4 space-y-1">
                  <div>
                    <div className="space-y-1">
                      <h1 className=" flex justify-between items-center">
                        <Link to={`/dashboard/single-project/${project?._id}`}>
                          <span className="font-semibold text-lg">
                            {project?.title}
                          </span>
                        </Link>

                        <div>
                          <span
                            onClick={() => setActionOpen(true)}
                            className="bg-rose-300 hidden px-2 rounded-md text-white cursor-pointer"
                          >
                            Action
                          </span>

                          <div
                            className={`absolute inset-0 flex flex-col items-start justify-start gap-10 bg-orange-50 p-2 rounded-md ml-[80px] ${
                              actionOpen ? "" : "hidden"
                            }`}
                          >
                            <div
                              className="cursor-pointer"
                              onClick={() => setActionOpen(false)}
                            >
                              <X className="w-4 h-4" />
                            </div>

                            <span>
                              {(user?.userId?.role === "5" ||
                                user?.userId?.role === "4" ||
                                user?.userId?.role === "3") && (
                                <div className="flex flex-col gap-1">
                                  <span>
                                    <span className="flex items-center gap-1 cursor-pointer">
                                      <Edit className="w-4 h-4" />
                                      <span>Edit</span>
                                    </span>
                                  </span>
                                  <span
                                    onClick={() =>
                                      openModalHandler(project?._id, "delete")
                                    }
                                  >
                                    <span className="flex items-center gap-1 cursor-pointer">
                                      <X className="w-4 h-4" />
                                      <span>Delete</span>
                                    </span>
                                  </span>
                                </div>
                              )}
                              {(user?.userId?.role === "5" ||
                                user?.userId?.role === "3") && (
                                <div className="flex flex-col gap-1 mt-1">
                                  {!project?.approved ? (
                                    <span
                                      onClick={() =>
                                        openModalHandler(
                                          project?._id,
                                          "approved"
                                        )
                                      }
                                    >
                                      <span className="flex items-center gap-1 cursor-pointer">
                                        <Check className="w-4 h-4" />
                                        <span>Approved</span>
                                      </span>
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        openModalHandler(
                                          project?._id,
                                          "approved"
                                        )
                                      }
                                    >
                                      <span className="flex items-center gap-1 cursor-pointer">
                                        <Shield className="w-4 h-4" />
                                        <span>Pending</span>
                                      </span>
                                    </span>
                                  )}
                                  {!project?.reject ? (
                                    <span
                                      onClick={() =>
                                        openModalHandler(project?._id, "reject")
                                      }
                                    >
                                      <span className="flex items-center gap-1 cursor-pointer">
                                        <ShieldOff className="w-4 h-4" />
                                        <span>Reject</span>
                                      </span>
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        openModalHandler(project?._id, "reject")
                                      }
                                    >
                                      <span className="flex items-center gap-1 cursor-pointer">
                                        <Undo2 className="w-4 h-4" />
                                        <span>Undo From Reject</span>
                                      </span>
                                    </span>
                                  )}
                                  {project?.blocked ? (
                                    <span
                                      onClick={() =>
                                        openModalHandler(project?._id, "block")
                                      }
                                    >
                                      <span className="flex items-center gap-1 cursor-pointer">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span>Undo From Blocked</span>
                                      </span>
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        openModalHandler(project?._id, "block")
                                      }
                                    >
                                      <span className="flex items-center gap-1 cursor-pointer">
                                        <ShieldAlert className="w-4 h-4" />
                                        <span>Blocked</span>
                                      </span>
                                    </span>
                                  )}
                                </div>
                              )}
                            </span>
                          </div>
                        </div>
                      </h1>
                      <Link to={`/dashboard/single-project/${project?._id}`}>
                        <h1>From ${project?.price}</h1>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <Bed className="h-4 w-4" />
                      <h1>{project?.bedrooms}</h1>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <Bath className="h-4 w-4" />
                      <h1>{project?.bathrooms}</h1>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <Car className="h-4 w-4" />
                      <h1>{project?.carSpaces}</h1>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message={"No projects are available!"}
            address={"/"}
            label={""}
          />
        )}
      </Container>
      <DeveloperActionModal
        modalHandler={modalHandler}
        isOpen={isOpen}
        closeModal={closeModalHandler}
        id={projectId}
        action={action}
      />
    </div>
  );
};

export default DeveloperProject;
