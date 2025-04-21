import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import AdminMenu from '../../../components/Layout/AdminMenu'
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { GiH2O } from 'react-icons/gi';
const API_URL = import.meta.env.VITE_API_URL;

const AcceptServiceRequest = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const h1= "";
  const [adminMessage, setAdminMessage] = useState("");
  
const [formData, setFormData] = useState({

    userId: "",
    requestType:"",
    lockerSize: "",
    lockerType: "",
    lockerDimensions: "",  
    requestStatus:"",
    userMessage:"",
    adminMessage:"",
  });
  const [userData, setUserData] = useState({

    userId: "",
   
    lockerSize: "",
    lockerType: "",
    lockerDimensions: "",  
   
  });
  useEffect(() => {
    const fetchCustomerRequestData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/user/approve/${id}`);
        if (res.data.success) {
          setFormData(res.data.request);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Error fetching customer data.");
        console.error(error);
      }
    };

    if (id) {
      fetchCustomerRequestData();
    }
  }, [id]);
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/user/details/${formData.userId}`);
        if (res.data.success) {
            setUserData(res.data.user);
            console.log(res.data.user)
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Error fetching customer data.");
        console.error(error);
      }
    };

    if (formData.userId) {
      fetchCustomerData();
    }
  }, [formData.userId]);

  //   Handle Form Submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!adminMessage) {
        return toast.error("Request reason is required.");
      }
  
      //   Prepare Request Data
      let requestDetails = {
        requestType:formData.requestType,
        lockerSize: formData.lockerSize || "",
        lockerType: formData.lockerType || "",
        lockerDimensions: formData.lockerDimensions || "",
        userId:formData.userId,
        userMessage:formData.userMessage,
        adminMessage
      };
  
      if(formData.requestType == "Locker-Downgrade" || formData.requestType == "Locker-Upgrade"){
        try {
          let userId = formData.userId
            const response = await axios.post(
              `${API_URL}/api/v1/user/locker-Change/${userId}`,
              requestDetails
            );
      
            if (response.data.success) {
              const response2 = await axios.post(`${API_URL}/api/v1/user/locker-Cancle/${id}`,requestDetails);
              toast.success(response2.data.message);
              navigate("/service/approved-requests");
            }
          } catch (error) {
            console.error("Error submitting request:", error);
            toast.error(
              error.response?.data?.message || "Error in submitting service request"
            );
          }
      }

      if(formData.requestType == "Locker-Cancel"){
        try {
            const response = await axios.post(
              `${API_URL}/api/v1/user/locker-Cancle/${id}`,requestDetails
            );
      
            if (response.data.success) {
              let userId = formData.userId
              const reject = await axios.post(`${API_URL}/api/v1/user/request-cancle-approved/${userId}`)
              if(reject.data.success){
              toast.success(response.data.message);
    
              }
              toast.success(response.data.message);
              navigate("/service/approved-requests");
            }
          } catch (error) {
            console.error("Error Rejecting request:", error);
            toast.error(
              error.response?.data?.message || "Error in Rejecting service request"
            );
          }
      }

      
    };
    
  return (
    <Layout>
        <div className="row">
            <div className="col-md-2">
            <AdminMenu></AdminMenu>
            </div>
            <div className="col-md-10">
            <div class="pt-3 pb-2 mb-3">
            <div>
              <h1 className="h2">Service Request Details</h1>
                <div className="row mb-4">
                  <div className="col-md mx-2">
                    <div className="card p-3 ">
                      <h5></h5>
                     
                      <div className="col-md p-1"><strong>User ID : </strong> {formData.userId }</div>
                      <div className="col-md p-1"><strong>Request Type : </strong> {formData.requestType}</div>
                      <div className="col-md p-1"><strong>Request Status : </strong> {formData.requestStatus}</div>
                      <div className="col-md p-1"><strong>User Message : </strong> {formData.userMessage}</div>
                      <div className="row">
                      {formData.requestType == "Locker-Downgrade" || formData.requestType == "Locker-Upgrade" ? (
                        <>
                        <div className='col-md-6 mt-2'>
                        <h4>Requested User's Locker Details</h4>

                         <div className="col-md p-1"><strong>Locker Size : </strong> {formData.lockerSize}</div>
                         <div className="col-md p-1"><strong>Locker Type : </strong> {formData.lockerType}</div>
                         <div className="col-md p-1"><strong>Locker Dimensions : </strong> {formData.lockerDimensions}</div>
                        </div>
                         <div className='col-md-6'>
                         <h4>Existing User's Locker Details</h4>
                         <div className="col-md p-1"><strong>Locker Size : </strong> {userData.lockerSize}</div>
                         <div className="col-md p-1"><strong>Locker Type : </strong> {userData.lockerType}</div>
                         <div className="col-md p-1"><strong>Locker Dimensions : </strong> {userData.lockerDimensions}</div>
                         </div>
                        </>
                     ) : (
                      <div className='col-md-6'>
                      <h4>Existing User's Locker Details</h4>
                      <div className="col-md p-1"><strong>Locker Size : </strong> {userData.lockerSize}</div>
                      <div className="col-md p-1"><strong>Locker Type : </strong> {userData.lockerType}</div>
                      <div className="col-md p-1"><strong>Locker Dimensions : </strong> {userData.lockerDimensions}</div>
                      </div>
                     )}

                      </div>
                    </div>
                    <div className="mb-3">
              <label className="form-label">Reason for Request:</label>
              <textarea
                className="form-control"
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
                rows="3"
                placeholder="Enter the reason for your request"
              />
            </div>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handleSubmit}
              
            >
              Submit Request
            </button>
                  </div>
                </div>
              </div>
          </div>
            </div>
        </div>
    </Layout>
  )
}

export default AcceptServiceRequest
