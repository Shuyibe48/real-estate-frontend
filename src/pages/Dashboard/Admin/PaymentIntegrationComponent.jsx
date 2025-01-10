import React, { useState } from "react";

const PaymentIntegrationComponent = () => {
  const [paymentMethod, setPaymentMethod] = useState("Stripe");
  const [apiKey, setApiKey] = useState("");
  const [clientId, setClientId] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    branchCode: "",
  });

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const integrationData = {
      paymentMethod,
      apiKey: paymentMethod === "Bank Transfer" ? null : apiKey,
      clientId: paymentMethod === "Bank Transfer" ? null : clientId,
      bankDetails: paymentMethod === "Bank Transfer" ? bankDetails : null,
    };

    console.log("Submitted Integration Data: ", integrationData);
    alert("Payment system integrated successfully!");
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-2xl font-semibold mb-4">Payment Integration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Select Payment Method</label>
          <select
            className="select select-accent rounded-md font-light bg-[#F9F9F9] outline-none px-2 py-1 w-full"
            value={paymentMethod}
            onChange={(e) => handlePaymentMethodChange(e.target.value)}
          >
            <option value="Stripe">Stripe</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        {(paymentMethod === "Stripe" || paymentMethod === "PayPal") && (
          <div className="mb-4">
            <label className="block font-semibold mb-2">API Key</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API Key"
              required
            />
          </div>
        )}

        {(paymentMethod === "Stripe" || paymentMethod === "PayPal") && (
          <div className="mb-4">
            <label className="block font-semibold mb-2">Client ID</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Enter Client ID"
              required
            />
          </div>
        )}

        {paymentMethod === "Bank Transfer" && (
          <>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Account Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={bankDetails.accountName}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, accountName: e.target.value })
                }
                placeholder="Enter Account Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Account Number</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={bankDetails.accountNumber}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, accountNumber: e.target.value })
                }
                placeholder="Enter Account Number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Bank Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={bankDetails.bankName}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, bankName: e.target.value })
                }
                placeholder="Enter Bank Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Branch Code</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={bankDetails.branchCode}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, branchCode: e.target.value })
                }
                placeholder="Enter Branch Code"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-rose-500 text-white py-1 px-4 rounded-md mt-4"
        >
          Integrate Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentIntegrationComponent;
