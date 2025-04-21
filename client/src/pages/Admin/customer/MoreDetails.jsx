import React, { useEffect,useState } from 'react'
import AdminMenu from "../../../components/Layout/AdminMenu";
import axios from "axios";
import { NavLink,useNavigate, useParams } from 'react-router-dom';
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
          // marginRight: "20px"
        };
      const [formData, setFormData] = useState({
        name: "",
        email: "",
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
        accountNo:"",
        userId:"",
        lockerNo:"",
        keyNo:"",
        startDate:"",
        renewDate:"",
        lockerStatus:"",
        photo:"",
        rent:"",
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
       const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
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
    
      const handleUpload = async () => {
        if (!selectedFile) return toast.error("Please select a file!");
    
        const formData = new FormData();
        formData.append("photo", selectedFile);
    
        try {
          const { data } = await axios.post(
            `${API_URL}/api/v1/user/upload-photo/${auth?.user?.userId}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
    
          if (data.success) {
            toast.success("Photo uploaded successfully!");
            setAuth({ ...auth, user: { ...auth.user, photo: data.photo } });
            setPhoto(data.photo); // Update the user photo state
            setPreview(`${API_URL}${data.photo}`); // Update preview with uploaded photo
          }
        } catch (error) {
          console.error("Error uploading photo:", error);
          toast.error("Failed to upload photo!");
        }
      };
      return (
        <Layout>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 p-0">
                <AdminMenu></AdminMenu>
              </div>
              <div className="col-md-10" style={scrollableStyle}>
               
                <div className="row">
            <div className="col pt-3">
            <h1 className="text-center border-bottom py-1 ">
                Customer Details
                </h1>
            </div>
            <div className="col-md-2 pt-3">
              <ul className="list-unstyled">
                <li className="nav-item inout">
                  <NavLink to={`/payment/add/${formData.userId}`} className="btn btn-primary">
                    Add Rent 
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-md-2 pt-3">
              <ul className="list-unstyled">
                <li className="nav-item inout">
                  <NavLink to={`/locker/access/${formData.userId}`} className="btn btn-primary">
                    Add Locker Access
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
              
                <div id="userdata">
                  <div className="row userdata ">
                    <h3 className="p-1 mx-3">User Details</h3> 
                    <div className="row">
                    <div className="col-md-3 m-2 profile-section">
                        <div className="card p-3 text-center">
                          <h5>Profile Photo</h5>
                          <img
                            src={`${API_URL}${formData?.photo}`}
                            alt="User Profile"
                            className="profile-img rounded-circle"
                            style={{ width: "200px", height: "200px", objectFit: "cover", alignItems:"center"}}  
                          />
                          {/* {formData?.photo == "uploads/default.jpg" ?(
                            <>
                              <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="form-control mt-3"
                            />
                            <button className="btn btn-primary mt-2" onClick={handleUpload}>
                              Upload Photo
                            </button>
                            </>
                          ):(<></>)} */}
                        </div>
                      </div>
                      <div className="col-md-4 card m-2">
                      <div className="col-md p-1"><strong>Customer Name : </strong>{formData.name}</div>
                      <div className="col-md p-1"><strong>Email : </strong>{formData.email}</div>
                      <div className="col-md p-1"><strong>Contact : </strong>{formData.phone}</div>
                      <div className="col-md p-1"><strong>Gender : </strong>{formData.gender}</div>
                      <div className="col-md p-1"><strong>Date of Birth : </strong>{formData.dateOfBirth}</div>
                      </div>
                      <div className="col-md-4 card m-2">
                      <div className="col-md p-1"><strong>Address : </strong>{formData.address}</div>
                      <div className="col-md p-1"><strong>City : </strong>{formData.city}</div>
                      <div className="col-md p-1"><strong>State : </strong>{formData.state}</div>
                      <div className="col-md p-1"><strong>Pincode : </strong>{formData.pincode}</div>
                      <div className="col-md p-1"><strong>Rent : </strong>{formData.rent}</div>
                      </div>
                    </div>
                    
                    <div className="col-md-12 mx-3 p-1 pt-2"><h3>Locker Details </h3></div>
                    <div className="row m-2 " >
                      <div className="col-md-6 card">
                      <div className="col-md p-1"><strong>Account No : </strong>{formData.accountNo}</div>
                    <div className="col-md p-1"><strong>User ID : </strong>{formData.userId}</div>
                    <div className="col-md p-1"><strong>Locker Number : </strong>{formData.lockerNo}</div>
                    <div className="col-md p-1"><strong>Key Number : </strong>{formData.keyNo}</div>
                    <div className="col-md p-1"><strong>Locker Size : </strong>{formData.lockerSize}</div>
                      </div>
                      <div className="col-md-6 card">
                      <div className="col-md p-1"><strong>Locker Type : </strong>{formData.lockerType}</div>
                    <div className="col-md p-1"><strong>Locker Dimensions : </strong>{formData.lockerDimensions}</div>
                    <div className="col-md p-1"><strong>Locker Status : </strong>{formData.lockerStatus}</div>
                    <div className="col-md p-1"><strong>Start Date : </strong>{formData.startDate}</div>
                    <div className="col-md p-1"><strong>Renew Date : </strong>{formData.renewDate}</div>
                      </div>
                    </div>
                    
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Layout>
      );
}

export default SingleUser
