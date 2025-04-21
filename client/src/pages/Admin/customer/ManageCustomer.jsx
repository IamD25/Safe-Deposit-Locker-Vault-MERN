import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const ManageCustomer = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
      const fetchLockers = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/v1/auth/users-details`);
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <AdminMenu />
        </div>
        <div className="col-md-10">
            
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" >
            <h1 className="h2">Manage Customer's</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search lockers..." id="searchInput" />
                <button className="btn btn-outline-secondary" type="button" >Search</button>
              </div>
            </div>
          </div>
          <div className="table-responsive" style={scrollableStyle}>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    Are you sure you want to delete this customer?
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
 
                  </div>
                </div>
              </div>
            </div><table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th name="_id">User ID</th>
                  {/* <th name="locker_price">Username</th> */}
                  <th name="name">Name</th>
                  <th name="email">Email</th>
                  <th name="phone">Contact</th>
                  <th name="lockerStatus">Locker Status</th>
                  <th className="text-center">Action</th>
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
                                       <td>{user.lockerStatus}</td>
                                       
                                       <td>
                                         <NavLink to={`/customer/user/${user._id}`} className="btn btn-sm btn-danger" >
                                           Update
                                         </NavLink>
                                       </td>
                                       <td>
                                         <NavLink className="btn btn-sm btn-warning"  onClick={() => handleDelete(user._id)}>
                                           Delete
                                         </NavLink>
                                       </td>
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
    </div>
  </Layout>
 )
};

export default ManageCustomer;
