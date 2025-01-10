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
  Delete,
  Edit,
  Shield,
  ShieldAlert,
  ShieldBan,
  ShieldCheck,
  ShieldOff,
  X,
} from "lucide-react";
import EmptyState from "../../../components/Shared/EmptyState";
import { useParams } from "react-router-dom";

const Projects = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [actions, setActions] = useState("approved");

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

  const filteredProject = responseData?.data?.projects.filter(
    (product) => product?.approved === actions
  );

  console.log(user);

  return (
    <div className="mt-10">
      <Container>
        <div className="mb-6 flex items-center justify-between border-b pb-2">
          <h1 className="text-xl font-semibold">Projects</h1>
          <select
            className="cursor-pointer select select-accent rounded-md font-light bg-[#F9F9F9] outline-none px-2 py-1 w-[120px] text-sm"
            onChange={(e) => setActions(e.target.value === "approved")}
          >
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        {filteredProject.length > 0 ? (
          <div>
            {filteredProject?.map((project) => (
              <div
                className="shadow-md w-[260px] rounded-xl overflow-hidden"
                key={project?._id}
              >
                <div>
                  <img
                    className="w-[260px] h-[140px]"
                    src={project.images[0]}
                    alt=""
                  />
                </div>
                <div className="p-4 space-y-1">
                  <div>
                    <div className="space-y-1">
                      <h1 className=" flex justify-between items-center">
                        <span className="font-semibold text-lg">
                          {project?.title}
                        </span>
                        <span>
                          {(user?.userId?.role === "5" ||
                            user?.userId?.role === "4" ||
                            user?.userId?.role === "3") && (
                            <div className="flex items-center gap-2">
                              <span>
                                <X className="w-4 h-4" />
                              </span> 
                              <span>
                                <Edit className="w-4 h-4" />
                              </span>
                            </div>
                          )}
                          {(user?.userId?.role === "4" ||
                            user?.userId?.role === "3") && (
                            <div>
                              <span>
                                <Check className="w-4 h-4" />
                              </span>
                              <span>
                                <Shield className="w-4 h-4" />
                              </span>
                              <span>
                                <ShieldOff className="w-4 h-4" />
                              </span>
                              <span>
                                <ShieldBan className="w-4 h-4" />
                              </span>
                              <span>
                                <ShieldCheck className="w-4 h-4" />
                              </span>
                              <span>
                                <ShieldAlert className="w-4 h-4" />
                              </span>
                            </div>
                          )}
                        </span>
                      </h1>
                      <h1>From ${project?.price}</h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <h1>{project?.bedrooms}</h1>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <h1>{project?.bathrooms}</h1>
                    </div>
                    <div className="flex items-center gap-1">
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
    </div>
  );
};

export default Projects;
