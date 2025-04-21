import React, { useEffect, useState }  from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useAuth } from '../../context/auth.jsx';
const RequestHistory = () => {
    const [requests, setRequests] = useState([]);
        const navigate = useNavigate();
        const [auth] = useAuth();
        
     useEffect(() => {
          const fetchRequests = async () => {
            try {
              const response = await axios.get(`${API_URL}/api/v1/user/request-history/${auth.user.userId}`);
              if (response.data.success) {
                setRequests(response.data.requests); // Correctly assign response
                toast.success("Request details fetched successfully!");
              } else {
                toast.error(response.data.message || "Unable to fetch service request details.");
              }
            } catch (error) {
              console.error("Error fetching payment details:", error);
              toast.error("Something went wrong while fetching service request details.");
             
            }
          };
      
          fetchRequests();
        }, []);
  return (
    <Layout>
        <div className="row"> 
            <div className="col-md-2 p-0">
                <UserMenu></UserMenu>
            </div>
            <div className="col-md-10">
            <div className="pt-3 pb-2 mb-3">
                        <h1 className="h2">Service Request History</h1>
                        {/* <div class="btn-toolbar mb-2 mb-md-0">
                                          <div class="input-group">
                                              <input type="text" class="form-control" placeholder="Search lockers..." id="searchInput">
                                              <button class="btn btn-outline-secondary" type="button" onclick="searchLockers()">Search</button>
                                          </div>
                                      </div> */}
                      </div>
                      {/* About Lockers */}
                      <div className="table-responsive">
                        <hr /><table className="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th name="requestId">Request ID</th>
                              <th name="requestType">Request Type</th>
                              <th name="requestStatus">Request Status</th>
                              <th name="adminMessage">Message</th>
                              <th name="userMessage">Your Message</th>
                           
                              {/* <th colspan="2" class="text-center">Action</th> */}
                            </tr>
                          </thead>
                          <tbody id="paymentTableBody">
                {requests.length > 0 ? (
                  requests.map((request) => (
                    <tr key={requests._id}>
                      <td>{request._id}</td>
                      <td>{request.requestType}</td>
                      <td>{request.requestStatus}</td>
                      <td>{request.adminMessage ? request.adminMessage : "N/A"}</td>
                      <td>{request.userMessage ? request.userMessage : "N/A"}</td>
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No payment records available.
                    </td>
                  </tr>
                )}
              </tbody>
                        </table>

                      </div>
            </div>
        </div>
    </Layout>
  )
}

export default RequestHistory
