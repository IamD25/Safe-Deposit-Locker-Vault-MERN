import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout.jsx";
import AdminMenu from "../../../components/Layout/AdminMenu.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const LockerAccessEntry = () => {
  const navigation = useNavigate();
  // const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    userId:"",
    accessDate: "",
    openTime: "",
    closeTime: "",
  });
  // const [accessDate, setAccessDate] = useState("");
  // const [openTime, setOpenTime] = useState("");
  // const [closeTime, setCloseTime] = useState("");


  const {id}  = useParams();
  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  // Fetch user data by ID (either from URL or input)
  const fetchUserData = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/auth/userId-details/${id}`);
      if (res.data.success) {
        let userData = res.data.user;
        if (userData.dateOfBirth) {
          userData.dateOfBirth = userData.dateOfBirth.split("T")[0];
        }
        setFormData({ ...formData, ...userData });
        toast.success("User data fetched successfully!");
      } else {
        toast.error(res.data.message || "No user found.");
      }
    } catch (error) {
      toast.error("Error fetching customer data.");
      console.error(error);
    }
  };

  // Search function to fetch customer details
  const search = async (e) => {
    e.preventDefault();
    if (!formData.userId) {
      toast.error("Please enter a valid User ID.");
      return;
    }
    
    try {
      // API call to fetch user details
      const res = await axios.get(
        `${API_URL}/api/v1/auth/userId-details/${formData.userId}`
      );

      if (res.data.success) {
        let userData = res.data.user;

        // Convert dateOfBirth to 'yyyy-MM-dd' format
        if (userData.dateOfBirth) {
          userData.dateOfBirth = userData.dateOfBirth.split("T")[0];
        }

        setFormData(userData);
        console.log("User Data:", userData);
        toast.success("User data fetched successfully!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error fetching customer data.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user types
    // if (errors[name]) {
    //   setErrors({ ...errors, [name]: '' });
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      console.log(formData);
      const res = await axios.post(
        `${API_URL}/api/v1/access/create-access`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // navigation("/requests/rejected");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };
  
  const scrollableStyle = {
    maxHeight: "600px", // Limit height
    overflowY: "auto", // Enable vertical scrolling
    overflowX: "hidden", // Hide horizontal scrolling
    border: "1px solid #ccc",
      padding: "10px",
      marginRignt:"20px",
    };
  return (
    <Layout>
      <div className="row ">
        <div className="col-md-2">
          <AdminMenu></AdminMenu>
        </div>
        <div className="col-md-10 " style={scrollableStyle} >
          <h3 class="py-2">Locker Check-In and Check-Out</h3>
          <div>
            <div id="useridin" className="row my-2 ">
              <h4 className="p-2">Search User</h4>
              <div className="row">
                <div className="col-9 p-2">
                  <input
                    className=" form-control"
                    type="number"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="User ID"
                  />
                </div>
                <div className="col-3 p-2">
                  <button
                    type="submit"
                    className="btn btn-md btn-primary"
                    onClick={search}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div id="userdata">
              <div className="row userdata my-2 border">
                <h3 className="p-1">User Details</h3>
                <div className="col-md-6 p-1">
                  <strong>Customer Name : </strong>
                  {formData.name}
                </div>
                <div className="col-md-6 p-1">
                  <strong>Email : </strong>
                  {formData.email}
                </div>
                <div className="col-md-6 p-1">
                  <strong>Locker Size : </strong>
                  {formData.lockerSize}
                </div>
                <div className="col-md-6 p-1">
                  <strong>Locker Type : </strong>
                  {formData.lockerType}
                </div>
                <div className="col-md-6 p-1">
                  <strong>Locker Dimensions : </strong>
                  {formData.lockerDimensions}
                </div>
                <div className="col-md-6 p-1">
                  <strong>Rent : </strong>
                  {formData.rent}
                </div>
                <div className="col-md-6 p-1">
                  <strong>Account No : </strong>
                  {formData.accountNo}
                </div>
                <div className="col-md-6 p-1">
                  <strong>User ID : </strong>
                  {formData.userId}
                </div>
                <div className="col-md-6 p-1">
                  <strong>Locker Number : </strong>
                  {formData.lockerNo}
                </div>
                <div className="col-md-6 p-1">
                  <strong>Key Number : </strong>
                  {formData.keyNo}
                </div>
                <div className="col-md-6 p-1">
                  <strong>Start Date : </strong>
                  {formData.startDate}
                </div>
                <div className="col-md-6 p-1">
                  <strong>Renew Date : </strong>
                  {formData.renewDate}
                </div>
                <div className="col-md-6 p-1">
                  <strong>Locker Status : </strong>
                  {formData.lockerStatus}
                </div>
              </div>
              <form id="assign">
                <div className="row check my-2 border">
                  <div className="row m-2">
                    <label htmlFor="accessDate" className="col-sm-2 form-label">
                      Date
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="date"
                        className="form-control"
                        id="accessDate"
                        name="accessDate"
                        value={formData.accessDate}
                    onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row m-2">
                    <label htmlFor="openTime" className="col-sm-2 form-label">
                      Check In Time
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="time"
                        className="form-control"
                        id="openTime"
                        name="openTime"
                        value={formData.openTime}
                    onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row m-2">
                    <label htmlFor="closeTime" className="col-sm-2 form-label">
                      Check Out Time
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="time"
                        className="form-control"
                        id="closeTime"
                        name="closeTime"
                        value={formData.closeTime}
                    onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      name="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LockerAccessEntry;
