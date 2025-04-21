import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import UserMenu from "../../components/Layout/UserMenu.jsx";
import "../../components/Layout/AdminMenu.css";
import "./Dashboard.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth.jsx";
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(auth?.user?.photo || "");
  const [access, setAccess] = useState([]);
  const [photo, setPhoto] = useState("");
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

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

  useEffect(() => {
    const fetchAccess = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/user/access-one/${auth.user.userId}`);
        if (response.data.success) {
          setAccess(response.data.access); // Correctly assign response
          toast.success("Locker access details fetched successfully!");
        } else {
          toast.error(response.data.message || "Unable to fetch payment details.");
        }
      } catch (error) {
        console.error("Error fetching locker access details:", error);
        toast.error("Something went wrong while fetching locker access details.");
      }
    };

    fetchAccess();
  }, []);

  useEffect(() => {
    const fetchUserPhoto = async () => {
      try {
        
        const res = await axios.get(`${API_URL}/api/v1/user/user-photo/${auth.user.userId}`);
        if (res.data.success) {
          setPhoto(res.data.user.photo);
          setPreview(`${API_URL}${res.data.user.photo}`);
          // const userData = res.data.user;
          // setFormData(userData);
          // console.log(res)
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Error fetching customer data.");
        console.error(error);
      }
    };

    
      fetchUserPhoto();
    
  }, []);
  console.log(`${API_URL}${photo.photo}`)

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <UserMenu />
          </div>
          <div className="col-md-10">
            <div className="dashboard-container">
              <h1 className="h2">Dashboard</h1>
              <div className="row">
              <div className="col-md-3 profile-section">
                  <div className="card p-3 text-center">
                    <h5>Profile Photo</h5>
                    <img
                      src={preview || `${API_URL}${photo.photo}`}
                      alt="User Profile"
                      className="profile-img rounded-circle"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        alignItems: "center",
                      }}
                    />

                    {photo === "uploads/default.jpg" ? (
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
                    ) : (
                      <>
                        <button className="btn btn-warning mt-2" onClick={() => document.getElementById("fileInput").click()}>
                          Edit Photo
                        </button>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="form-control mt-2 d-none"
                        />
                        {selectedFile && (
                          <button className="btn btn-success mt-2" onClick={handleUpload}>
                            Save Changes
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="card p-3"  style={{ width: "920px", height: "265px", objectFit: "cover" }}>
                    <h5>Personal Details</h5>
                    <p>Quick overview of your safe deposit lockers</p>
                    <div><strong>Name:</strong> {auth?.user?.name}</div>
                    <div><strong>Email:</strong> {auth?.user?.email}</div>
                    <div><strong>Contact:</strong> {auth?.user?.phone}</div>
                    <div><strong>Gender:</strong> {auth?.user?.gender}</div>
                    <div><strong>Date of Birth:</strong> {auth?.user?.dateOfBirth}</div>
                    <div><strong>Address:</strong> {auth?.user?.address}</div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card p-3">
                    <h5>Locker Details</h5>
                    <div><strong>Account No:</strong> {auth?.user?.accountNo}</div>
                    <div><strong>User ID:</strong> {auth?.user?.userId}</div>
                    <div><strong>Locker Size:</strong> {auth?.user?.lockerSize}</div>
                    <div><strong>Locker Type:</strong> {auth?.user?.lockerType}</div>
                    <div><strong>Locker Number:</strong> {auth?.user?.lockerNo}</div>
                    <div><strong>Rent:</strong> {auth?.user?.rent}</div>
                    <div><strong>Start Date:</strong> {auth?.user?.startDate}</div>
                    <div><strong>Renew Date:</strong> {auth?.user?.renewDate}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card p-3">
                    <h5>Recent Locker Access Details</h5>
                    <div><strong>Locker Access ID :</strong> {access._id}</div>
                    <div><strong>Date :</strong> {access.accessDate ? access.accessDate?.split("T")[0] : "N/A"}</div>
                    <div><strong>Locker No. :</strong> {access.lockerNo}</div>
                    <div><strong>Account No. :</strong> {access.accountNo}</div>
                    <div><strong>In Time :</strong> {access.openTime ? access.openTime.split("T")[1].slice(0, 5) : "N/A"}</div>
                    <div><strong>Out Time :</strong> {access.closeTime ? access.closeTime.split("T")[1].slice(0, 5) : "N/A"}</div>
          
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
