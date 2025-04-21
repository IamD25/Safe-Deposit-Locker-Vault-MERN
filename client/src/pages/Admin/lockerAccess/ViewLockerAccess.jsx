import React, { useEffect, useState } from "react";
import Layout from '../../../components/Layout/Layout.jsx'
import AdminMenu from '../../../components/Layout/AdminMenu.jsx'
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ViewLockerAccess = () => {

    const [access, setAccess] = useState([]);
    const navigate = useNavigate();
  
    const scrollableStyle = {
      maxHeight: "600px", // Limit height
      overflowY: "auto", // Enable vertical scrolling
      overflowX: "hidden", // Hide horizontal scrolling
      border: "1px solid #ccc",
      padding: "10px",
      marginRight: "20px",
    };
  
    // Fetch payment data on component load
    useEffect(() => {
      const fetchAccess = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/v1/access/access-details`);
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
  

  return (
    <Layout>
    <div className="row">
        <div className="col-md-2">
            <AdminMenu></AdminMenu>
        </div>
        <div className="col-md-10">
        <div>
                    <div className="row">
                        <div className="col pt-3 pb-2">
                        <h1 className="h2">Locker Check In and Check Out Transaction</h1>
                        </div>
                        <div className="col-md-2 pt-3">
                        <div className="input-group">
                            <ul>
                            <li className="nav-item list-unstyled inout">
                                <NavLink type="btn" to={"/locker/access"} className=" btn btn-primary">Check In and Out</NavLink>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <hr /> 
                        <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                            {/* <th name="locker_size">S.R. Numer</th> */}
                            <th>Access Id</th>
                            <th name="accessDate">Date of Entry</th>
                            <th name="accessDate">Locker Number</th>
                            <th name="lockerNo">Account Number</th>
                            <th name="openTime">Check In Time</th>
                            <th name="closeTime">Check Out Time</th>
                            {/* <th colspan="2" class="text-center">Action</th> */}
                            </tr>
                        </thead>
                        <tbody id="lockerTableBody">
                        {access.length > 0 ? (
                  access.map((access) => (
                    <tr key={access._id}>
                      <td>{access._id}</td>
                      <td>{access.accessDate ? access.accessDate?.split("T")[0] : "N/A"}</td>
                      <td>{access.lockerNo}</td>
                      <td>{access.accountNo}</td>
                      <td>{access.openTime ? access.openTime.split("T")[1].slice(0, 5) : "N/A"}</td>
                      <td>{access.closeTime ? access.closeTime.split("T")[1].slice(0, 5) : "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No locker access records available.
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
}

export default ViewLockerAccess
