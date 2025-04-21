import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useAuth } from '../../context/auth.jsx';
const CheckInOut = () => {

    const [access, setAccess] = useState([]);
    const navigate = useNavigate();
     const [auth] = useAuth();

    useEffect(() => {
        const fetchAccess = async () => {
          try {
            const response = await axios.get(`${API_URL}/api/v1/user/access-details/${auth.user.userId}`);
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
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2  p-0">
                    <UserMenu></UserMenu>
                </div>
                <div className="col-md-10">
                <div className="pt-3 pb-2 mb-3">
                        <h1 className="h2">Locker Access History</h1>
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
                                {/* <th name="srno">S.R. No.</th> */}
                                <th>Locker Access ID</th>
                                <th name="date">Date</th>
                                <th name="locker_no">Locker No.</th>
                                <th name="account_no">Account No.</th>
                                <th name="in_time">In Time</th>
                                <th name="out_time">Out Time</th>
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
                      No payment records available.
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

export default CheckInOut;
