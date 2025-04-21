import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const AddCustomer = () => {
  const scrollableStyle = {
    maxHeight: "600px",
    overflowY: "auto",
    overflowX: "hidden",
    border: "1px solid #ccc",
    padding: "10px",
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

  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLockerSizeChange = (e) => {
    setFormData({
      ...formData,
      lockerSize: e.target.value,
      lockerType: "",
      lockerDimensions: "",
    });
    setErrors((prev) => ({ ...prev, lockerSize: "", lockerType: "" }));
  };

  const handleLockerTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData({
      ...formData,
      lockerType: selectedType,
      lockerDimensions: sizeMapping[selectedType] || "",
    });
    setErrors((prev) => ({ ...prev, lockerType: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/.test(formData.password)) {
      newErrors.password = 'Password must include upper, lower, number & special char';
      // isValid = false;
    }

    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/.test(formData.confirmPassword)) {
      newErrors.password = 'Password must include upper, lower, number & special char';
      // isValid = false;
    }

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";

    if (!formData.answer.trim()) newErrors.answer = "Security answer is required";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "DOB is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";

    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Invalid pincode";

    if (!formData.lockerSize) newErrors.lockerSize = "Locker size is required";
    if (!formData.lockerType) newErrors.lockerType = "Locker type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log(formData);
          const res = await axios.post(`${API_URL}/api/v1/auth/register`, {
            formData,
          });
          if (res.data.success) {
            toast.success(res.data.message);
            //   navigate("/login")
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
  };

  const renderError = (field) => errors[field] && <div className="text-danger small">{errors[field]}</div>;

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <AdminMenu />
          </div>
          <div className="col-md-10 pt-2" style={scrollableStyle}>
            <h1 className="text-center border-bottom py-1">Add New Customer</h1>
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {renderError("name")}
                </div>
                <div className="col">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {renderError("email")}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {renderError("password")}
                </div>
                <div className="col">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {renderError("confirmPassword")}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {renderError("phone")}
                </div>
                <div className="col">
                  <label className="form-label">Security Answer</label>
                  <input
                    type="text"
                    className="form-control"
                    name="answer"
                    value={formData.answer}
                    onChange={handleChange}
                  />
                  {renderError("answer")}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {renderError("gender")}
                </div>
                <div className="col">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                  {renderError("dateOfBirth")}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {renderError("address")}
                </div>
                <div className="col">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {renderError("city")}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  {renderError("state")}
                </div>
                <div className="col">
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                  {renderError("pincode")}
                </div>
              </div>

              <div className="mb-2">
                <label className="form-label">Locker Size</label>
                <select
                  className="form-select"
                  name="lockerSize"
                  value={formData.lockerSize}
                  onChange={handleLockerSizeChange}
                >
                  <option value="">Select Locker Size</option>
                  {Object.keys(lockerOptions).map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {renderError("lockerSize")}
              </div>

              {formData.lockerSize && (
                <div className="row mb-2">
                  <div className="col">
                    <label className="form-label">Locker Type</label>
                    <select
                      className="form-select"
                      name="lockerType"
                      value={formData.lockerType}
                      onChange={handleLockerTypeChange}
                    >
                      <option value="">Select Locker Type</option>
                      {lockerOptions[formData.lockerSize].map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {renderError("lockerType")}
                  </div>
                  <div className="col">
                    <label className="form-label">Locker Dimensions</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.lockerDimensions}
                      readOnly
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCustomer;