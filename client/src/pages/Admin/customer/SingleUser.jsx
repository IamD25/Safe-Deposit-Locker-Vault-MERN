import React, { useEffect,useState } from 'react'
import AdminMenu from "../../../components/Layout/AdminMenu";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import Layout from "../../../components/Layout/Layout.jsx";
const API_URL = import.meta.env.VITE_API_URL;


const SingleUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const scrollableStyle = {
        maxHeight: "600px", // Limit height
        overflowY: "auto", // Enable vertical scrolling
        overflowX: "hidden", // Hide horizontal scrolling
        border: "1px solid #ccc",
          padding: "10px",
          marginRignt:"20px",
        };
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
      });
    
      const lockerOptions = {
        Small: ["A", "B", "C"],
        Medium: ["G", "G1", "F"],
        Large: ["H", "L", "FR"],
      };
    
      const sizeMapping = {
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
    
      useEffect(() => {
        const fetchCustomerData = async () => {
          try {
            
            const res = await axios.get(`${API_URL}/api/v1/auth/user-details/${id}`);
            if (res.data.success) {
              setFormData(res.data.user);
              const userData = res.data.user;
        
              // Convert dateOfBirth to yyyy-MM-dd format if it exists
              if (userData.dateOfBirth) {
                userData.dateOfBirth = userData.dateOfBirth.split("T")[0];
              }
      
              setFormData(userData);
              console.log(res)
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
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
        // Clear error for this field when user types
        // if (errors[name]) {
        //   setErrors({ ...errors, [name]: '' });
        // }
      };
    
      const handleLockerSizeChange = (e) => {
        setFormData({
          ...formData,
          lockerSize: e.target.value,
          lockerType: "", // Reset locker type
          lockerDimensions: "", // Reset locker dimensions
        });
      };
    
      const handleLockerTypeChange = (e) => {
        const selectedType = e.target.value;
        setFormData({
          ...formData,
          lockerType: selectedType,
          lockerDimensions: sizeMapping[selectedType] || "Select Valid Size",
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log(formData);
          const res = await axios.put(`${API_URL}/api/v1/auth/user/${id}`, {
            formData,
          });
          if (res.data.success) {
            toast.success(res.data.message);
              navigate("/customer/manage-customer")
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 p-0">
                <AdminMenu></AdminMenu>
              </div>
              <div className="col-md-10" style={scrollableStyle}>
                <h1 className="text-center border-bottom py-1 ">
                  Update Customer Details
                </h1>
                <form id="customerAdd" onSubmit={handleSubmit}>
                  <div className=" row mb-3">
                    <div className="col">
                      <label htmlFor="fullName" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Name Surname"
                        required
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="emailAddress" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="emailAddress"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email Address"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="contactNumber" className="form-label">
                        Contact Number
                      </label>
                      <input
                        type="number"
                        maxLength={10}
                        className="form-control"
                        id="contactNumber"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        minLength={2}
                        required
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="answer" className="form-label">
                        Security Answer
                      </label>
                      <input
                        maxLength={10}
                        className="form-control"
                        id="answer"
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3 ">
                    <div className="col">
                      <label htmlFor="gender" className="form-label">
                        Gender
                      </label>
                      <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="  " selected>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="dob" className="form-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row  mb-3">
                    <div className="col">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="pincode" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Select Locker Size</label>
                    <select
                      className="form-select form-select mb-3"
                      id="lockersize"
                      name="lockerSize"
                      value={formData.lockerSize}
                      onChange={handleLockerSizeChange}
                      required
                    >
                      <option value="">Select Locker Size</option>
                      {Object.keys(lockerOptions).map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
    
                  {formData.lockerSize && (
                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label">Select Locker Type</label>
                        <select
                          className="form-select"
                          name="lockertype"
                          value={formData.lockerType}
                          onChange={handleLockerTypeChange}
                          required
                        >
                          <option value="">Select Locker Type</option>
                          {lockerOptions[formData.lockerSize].map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col">
                        <label className="form-label">Locker Dimensions</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lockerDimensions"
                          value={formData.lockerDimensions}
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                  <div className="align-item-center px-4">
                    <button type="submit" className="btn btn-dark" name="submit">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      );
}

export default SingleUser
