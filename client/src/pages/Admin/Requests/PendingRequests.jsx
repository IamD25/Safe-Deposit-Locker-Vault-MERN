import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import AdminMenu from '../../../components/Layout/AdminMenu'
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const PendingRequests = () => {
  const navigation = useNavigate();
    const [users, setUsers] = useState([]);
    useEffect(() => {
      const fetchLockers = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/v1/request/pending-request`);
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
            const response = await axios.put(`${API_URL}/api/v1/request/reject/${id}`);
            if(response){
              toast.success('Request Rejected Successfully');
              navigation("/requests/rejected");
            }
            // setUsers(users.filter((user) => user.id !== id));
            } catch (error) {
              console.error("Error Rejecting user:", error);
              toast.error('Somthing went Wrong.UI',error);
              } 
          
              };
              const handleApprove = async (id) => {
                try {
                  const response = await axios.put(`${API_URL}/api/v1/request/assign-locker/${id}`);
                  if(response){
                    toast.success('Request Approved Successfully');
                    navigation("/requests/approved");
                  }
                  // setUsers(users.filter((user) => user.id !== id));
                  } catch (error) {
                    console.error("Error approving user:", error);
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
                <h1> Pending User Requests</h1>
                                <div className="table-responsive" style={scrollableStyle}>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th name="id">Request ID</th>
                        <th name="name">Name</th>
                        <th name="email">Email</th>
                        <th name="contact">Contact</th>
                        <th name="locker_size">Locker Size</th>
                        <th name="locker_type">Locker Type</th>
                        <th name="locker_sizex">Locker Size(00x00x00)</th>
                        <th colSpan={2} className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody id="lockerTableBody">
                    {users.length > 0 ? (
                                   users.map((user) => (
                                     <tr key={user._id}>
                                       <td>{user._id}</td>
                                       <td>{user.name}</td>
                                       <td>{user.email}</td>
                                       <td>{user.phone}</td>
                                       <td>{user.lockerSize}</td>
                                       <td>{user.lockerType}</td>
                                       <td>{user.lockerDimensions}</td>

                        <td><NavLink className="btn btn-sm btn-danger" id="update" to={`/requests/assign-locker/${user._id}`} >Accept</NavLink></td>
                        <td><NavLink className="btn btn-sm btn-warning" id="btndelete" onClick={() => handleReject(user._id)}>Reject</NavLink></td>

                    </tr>
                ))
                                 ) : (
                                   <tr>
                                     <td colSpan="8" className="text-center">
                                       No locker details available.
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

export default PendingRequests
