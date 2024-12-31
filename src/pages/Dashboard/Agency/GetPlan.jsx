import { useContext, useEffect, useState } from "react";
import Container from "../../../components/Shared/Container";
import baseUrl from "../../../api/baseUrl";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../../../providers/AuthProvider";

const GetPlan = () => {
  // Dummy data for plans
  const [plans, setPlans] = useState([]);
  const { user } = useContext(AuthContext);

  let agencyData;

  if (user?.myAgency) {
    const agencyOwnerObject = user.myAgency.find(
      (agency) => agency.role === "agencyOwner"
    );

    if (agencyOwnerObject) {
      agencyData = agencyOwnerObject;
    } else {
      console.log("No agency owner found.");
    }
  }

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

  const handleGetPlan = async (_id, name, duration, price, agency) => {
    const plan = {
      _id,
      name,
      duration,
      price,
    };

    const stripe = await loadStripe(
      "pk_test_51Pr9oMKuXaDvgCT1V1STQ619J3kOo4aW5rsMFDm9E01aLxRPWyqlY17RJr8TMSwGJXwopHqDCcJTBVWD9TKrDuON00EnKjUjUM"
    );

    try {
      const response = await baseUrl.post("payments/create-payment-intent", {
        plan,
        agency,
      });

      const session = response?.data?.data;

      if (!session.sessionId) {
        throw new Error("Session ID not found");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session?.sessionId,
      });

      if (result.error) {
        console.error("Error during checkout:", result.error);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
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
              className="w-full max-w-sm border rounded-lg shadow-lg p-6 bg-[#f8f9fa] flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
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
                  onClick={() =>
                    handleGetPlan(
                      plan?._id,
                      plan?.name,
                      plan?.duration,
                      plan?.price,
                      {
                        _id: agencyData?.agency?._id,
                        id: agencyData?.agency?.id,
                        name: agencyData?.agency?.name,
                        email: agencyData?.agency?.email,
                      }
                    )
                  }
                  className="w-full px-4 py-2 bg-[#28a745] text-white rounded-lg hover:bg-[#218838] transition-colors"
                >
                  Get {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default GetPlan;
