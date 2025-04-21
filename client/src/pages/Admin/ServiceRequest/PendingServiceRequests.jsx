import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import AdminMenu from '../../../components/Layout/AdminMenu'
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const PendingServiceRequests = () => {
  const navigation = useNavigate();
    const [users, setUsers] = useState([]);
    useEffect(() => {
      const fetchLockers = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/v1/user/pending-request`);
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
        const handleReject = async (id) => {
          try {
            const response = await axios.put(`${API_URL}/api/v1/user/reject/${id}`);
            if(response){
              toast.success('Service request rejected successfully.');
              navigation("/service/rejected-requests");
            }
            // setUsers(users.filter((user) => user.id !== id));
            } catch (error) {
              console.error("Error Rejecting user service request:", error);
              toast.error('Somthing went Wrong.UI',error);
              } 
          
              };
  
  return (
    <Layout>
        <div className="row">
            <div className="col-md-2">
                <AdminMenu></AdminMenu>
            </div>
            <div className="col-md-10">
                <h1> Pending User Service Requests</h1>
                                <div className="table-responsive" style={scrollableStyle}>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                    <th name="id">Request ID</th>
                        <th name="userId">User ID</th>
                        <th name="requestType">Request Type</th>
                        <th name="contuserMessageact">User Message</th>
                        <th name="requestStatus">Request Status</th>
                        <th colSpan={2} className="text-center">Action</th>
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

                        <td><NavLink className="btn btn-sm btn-danger" id="update" to={`/service/accept-request/${user._id}`} >Accept</NavLink></td>
                        {/* <td><NavLink className="btn btn-sm btn-warning" id="btndelete" onClick={handleReject(user._id)} >Reject</NavLink></td> */}
                        <td><NavLink className="btn btn-sm btn-warning" id="btndelete" onClick={() => handleReject(user._id)}>Reject</NavLink></td>

                    </tr>
                ))
                                 ) : (
                                   <tr>
                                     <td colSpan="8" className="text-center">
                                       No Pending User Service Requests available.
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

export default PendingServiceRequests
