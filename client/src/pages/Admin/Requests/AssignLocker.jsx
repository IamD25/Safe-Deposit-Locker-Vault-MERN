import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu";
import toast from 'react-hot-toast';
const AssignLocker = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const scrollableStyle = {
    maxHeight: "600px", // Limit height
    overflowY: "auto", // Enable vertical scrolling
    overflowX: "hidden", // Hide horizontal scrolling
    border: "1px solid #ccc",
    padding: "10px",
    marginRight: "20px",
  };
  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password:"",
    phone: "",
    gender: "",
    dateOfBirth: "",
    answer: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    lockerSize: "",
    lockerType: "",
    lockerDimensions: "",
    accountNo: "",
    userId: "",
    lockerNo: "",
    keyNo: "",
    startDate: "",
    renewDate: "",
    deposite: "",
    rent: "",
    entryFee: "",

  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/auth/user/${id}`);
        if (res.data.success) {
          setFormData(res.data.user);
          const userData = res.data.user;

          // Convert dateOfBirth to yyyy-MM-dd format if it exists
          if (userData.dateOfBirth) {
            userData.dateOfBirth = userData.dateOfBirth.split("T")[0];
          }

          setFormData(userData);
          console.log(res);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Error fetching customer data.");
        console.error(error);
      }
    };

    if (id) {
      fetchCustomerData();
    }
  }, [id]);

  const [lockers, setLockers] = useState([]);
  useEffect(() => {
    const fetchLockers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/locker/locker-details`);
        setLockers(response.data.locker); // Assuming response.data is an array of lockers
      } catch (error) {
        console.error("Error fetching locker details:", error);
        toast.error('Somthing went Wrong.UI');
      }
    };

    fetchLockers();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user types
    // if (errors[name]) {
    //   setErrors({ ...errors, [name]: '' });
    // }
  };
  const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            // console.log(formData);
            const res = await axios.post(`${API_URL}/api/v1/request/assign-locker/${id}`,{formData},{
  headers: {
    "Content-Type": "application/json",
  },
});
            if (res.data.success) {
            const res2 = await axios.put(`${API_URL}/api/v1/request/approved/${id}`)
              // toast.success(res.data.message);
              if (res2.data.success) {
                  toast.success(res.data.message);
                  
                    navigate("/requests/approved")
                } else {
                  toast.error(res.data.message);
                }
                // navigate("/customer/manage-customer")
            } else {
              toast.error(res.data.message);
            }
          } catch (error) {
            toast.error("Somthing went Wrong.");
            console.log(error);
          }
          // console.log("Submitted Data:", formData);
          // alert("Form Submitted Successfully!");
        };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-2">
          <AdminMenu></AdminMenu>
        </div>
        <div className="col-md-10" >
         <div className='mt-3' style={scrollableStyle}>
         <h2 className="m-1">Customer Basic Details</h2>
          <div className="userdata" >
            <div className="row">
              <label htmlFor="name" className="col-sm-1">
                Customer Name
              </label>
              <div className="col-sm-3">
                <input className="form-control" type="text" id="name" name="name"
                        value={formData.name}
                        onChange={handleChange} readOnly />
              </div>
              <label htmlFor="phone" className="col-sm-1">
                Phone
              </label>
              <div className="col-sm-3">
                <input className="form-control" type="number" id="phone"name="phone"
                        value={formData.phone}
                        onChange={handleChange} readOnly />
              </div>
              <label htmlFor="email" className="col-sm-1">
                Email Address
              </label>
              <div className="col-sm-3">
                <input className="form-control" type="email" id="email"name="email"
                        value={formData.email}
                        onChange={handleChange} readOnly />
              </div>
              <label htmlFor="lockerSize" className="col-sm-1">
                Locker Size
              </label>
              <div className="col-sm-3">
                <input className="form-control"
                  type="text"
                  id="lockerSize"
                  name="lockerSize"
                  value={formData.lockerSize}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <label htmlFor="lockerType" className="col-sm-1">
                Locker Type
              </label>
              <div className="col-sm-3">
                <input className="form-control"
                  type="text"
                  id="lockerType"
                  name="lockerType"
                  value={formData.lockerType}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <label htmlFor="lockerDimensions" className="col-sm-1">
                Locker Dimensions
              </label>
              <div className="col-sm-3">
                <input className="form-control"
                  type="text"
                  id="lockerDimensions"
                  name="lockerDimensions"
                  value={formData.lockerDimensions}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
          </div>
          <form id="assign" onSubmit={handleSubmit}>
            <div className="row m-2">
              <label htmlFor="accountNo" className="col-sm-2 form-label">
                Account No
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  className="form-control"
                  id="accountNo"
                  name="accountNo"
                  value={formData.accountNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <label htmlFor="userId" className="col-sm-2 form-label">
                User ID
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  className="form-control"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row m-2">
              <label htmlFor="lockerNo" className="col-sm-2 form-label">
                Locker No
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  className="form-control"
                  id="lockerNo"
                  name="lockerNo"
                  value={formData.lockerNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <label htmlFor="keyNo" className="col-sm-2 form-label">
                Key No
              </label>
              <div className="col-sm-4">
                <input
                  type="number"
                  className="form-control"
                  id="keyNo"
                  name="keyNo"
                  value={formData.keyNo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row m-2">
              <label htmlFor="startDate" className="col-sm-2 form-label">
                Start Date
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <label htmlFor="renewDate" className="col-sm-2 form-label">
                Renew Date
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="renewDate"
                  name="renewDate"
                  value={formData.renewDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row m-2">
              <label htmlFor="deposite" className="col-sm-1 form-label">
                Deposite
              </label>
              <div className="col-sm-2">
                <input
                  type="number"
                  className="form-control"
                  id="deposite"
                  name="deposite"
                  value={formData.deposite}
                  onChange={handleChange}
                  required
                />
              </div>
              <label htmlFor="rent" className="col-sm-1 form-label rent">
                Rent
              </label>
              <div className="col-sm-2 ">
                <input
                  type="number"
                  className="form-control"
                  id="rent"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  required
                />
              </div>
              <label htmlFor="ertryFee" className="col-sm-1 form-label entry">
                Entry Fee
              </label>
              <div className="col-sm-2">
                <input
                  type="number"
                  className="form-control"
                  id="entryFee"
                  name="entryFee"
                  value={formData.entryFee}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary" name="assign">
                Assign
              </button>
            </div>
          </form>
         </div>
        </div>

        {/* </div> */}
      </div>
    </Layout>
  );
};

export default AssignLocker;
