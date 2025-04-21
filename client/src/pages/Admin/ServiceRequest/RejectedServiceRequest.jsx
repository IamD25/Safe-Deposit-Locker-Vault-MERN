import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import AdminMenu from '../../../components/Layout/AdminMenu'
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const RejectedServiceRequest = () => {
  const navigation = useNavigate();

    const [users, setUsers] = useState([]);
    useEffect(() => {
      const fetchLockers = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/v1/user/rejected-request`);
          setUsers(response.data.users); // Assuming response.data is an array of lockers
        } catch (error) {
          console.error("Error fetching users details:", error);
          toast.error('Somthing went Wrong.UI');
        }
      };
  
      fetchLockers();
    }, []);
    const scrollableStyle = {
      maxHeight: "600px", // Limit height
      overflowY: "auto", // Enable vertical scrolling
      overflowX: "hidden", // Hide horizontal scrolling
      border: "1px solid #ccc",
        padding: "10px",
        marginRight: "20px"
      };
     
  return (
    <Layout>
        <div className="row">
            <div className="col-md-2">
                <AdminMenu></AdminMenu>
            </div>
            <div className="col-md-10">
                <h1> Rejected User Service Requests</h1>
                                <div className="table-responsive" style={scrollableStyle}>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                    <th name="id">Request ID</th>
                        <th name="userId">User ID</th>
                        <th name="requestType">Request Type</th>
                        <th name="contuserMessageact">User Message</th>
                        <th name="requestStatus">Request Status</th>
                    </tr>
                    </thead>
                    <tbody id="lockerTableBody">
                    {users.length > 0 ? (
                                   users.map((user) => (
                                     <tr key={user._id}>
                                       <td>{user._id}</td>
                                       <td>{user.userId}</td>
                                       <td>{user.requestType}</td>
                                       <td>{user.userMessage}</td>
                                       <td>{user.requestStatus}</td>
                    </tr>
                ))
                                 ) : (
                                   <tr>
                                     <td colSpan="8" className="text-center">
                                       No Rejected User Service Requests available.
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

export default RejectedServiceRequest
