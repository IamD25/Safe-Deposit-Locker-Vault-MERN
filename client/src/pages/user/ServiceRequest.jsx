import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import UserMenu from "../../components/Layout/UserMenu.jsx";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth.jsx";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ServiceRequest = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  //   Locker Categories and Sizes
  const lockerCategories = {
    Small: ["A", "B", "C"],
    Medium: ["G", "G1", "F"],
    Large: ["H", "L", "FR"],
  };

  const lockerSizes = {
    A: "05x07x21",
    B: "06x08x21",
    C: "05x14x21",
    G: "06x17x21",
    G1: "08x21x21",
    F: "11x14x21",
    H: "13x17x21",
    L: "16x21x21",
    FR: "20x18x21",
  };

     //   State Management
  const [requestType, setRequestType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocker, setSelectedLocker] = useState("");
  const [userMessage, setUserMessage] = useState("");

  //   Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //   Form Validations
    if (!requestType) {
      return toast.error("Request Type is required.");
    }
    if (
      (requestType === "Locker-Upgrade" || requestType === "Locker-Downgrade") &&
      (!selectedCategory || !selectedLocker)
    ) {
      return toast.error("Please select a valid locker category and type.");
    }
    if (!userMessage) {
      return toast.error("Request reason is required.");
    }

    //   Prepare Request Data
    let requestDetails = {
      requestType,
      lockerSize: selectedCategory || "",
      lockerType: selectedLocker || "",
      lockerDimensions: lockerSizes[selectedLocker] || "",
      userId: auth?.user?.userId,
      userMessage,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/user/new-service-request`,
        requestDetails
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/user/request-history");

        //   Reset Form After Submission
        // setRequestType("");
        // setSelectedCategory("");
        // setSelectedLocker("");
        // setUserMessage("");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error(
        error.response?.data?.message || "Error in submitting service request"
      );
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-2">
          <UserMenu />
        </div>
        <div className="col-md-10">
          <div className="container mt-5">
            <h2 className="text-center mb-4">Service Request</h2>

            {/*   Request Type Selection */}
            <div className="mb-3">
              <label className="form-label">Select Request Type:</label>
              <select
                className="form-select"
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
              >
                <option value="">Choose Request Type</option>
                <option value="Locker-Upgrade">Locker Upgrade</option>
                <option value="Locker-Downgrade">Locker Downgrade</option>
                <option value="Locker-Cancel">Locker Cancel</option>
                {/* <option value="Break-Open">Break Open</option> */}
              </select>
            </div>

            {/*   Conditional Form for Upgrade/Downgrade */}
            {(requestType === "Locker-Upgrade" || requestType === "Locker-Downgrade") && (
              <>
                <div className="mb-3">
                  <label className="form-label">Select Locker Category:</label>
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Choose Locker Category</option>
                    {Object.keys(lockerCategories).map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCategory && (
                  <div className="mb-3">
                    <label className="form-label">Select Locker Type:</label>
                    <select
                      className="form-select"
                      value={selectedLocker}
                      onChange={(e) => setSelectedLocker(e.target.value)}
                    >
                      <option value="">Choose Locker Type</option>
                      {lockerCategories[selectedCategory].map(
                        (locker, index) => (
                          <option key={index} value={locker}>
                            {locker} ({lockerSizes[locker]})
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </>
            )}

            <div className="mb-3">
              <label className="form-label">Reason for Request:</label>
              <textarea
                className="form-control"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                rows="3"
                placeholder="Enter the reason for your request"
              />
            </div>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handleSubmit}
              disabled={!requestType}
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceRequest;
