import React, { useEffect,useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import "../../components/Layout/AdminMenu.css";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const LockerDetails = () => {
  const [lockers, setLockers] = useState([]);
  useEffect(() => {
    const fetchLockers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/locker/locker-details`);
        setLockers(response.data.locker); // Assuming response.data is an array of lockers
      } catch (error) {
        console.error("Error fetching locker details:", error);
        toast.error('Somthing went Wrong.UI');
      }
    };

    fetchLockers();
  }, []);
  const scrollableStyle = {
    maxHeight: "520px", // Limit height
    overflowY: "auto", // Enable vertical scrolling
    overflowX: "hidden", // Hide horizontal scrolling
    border: "1px solid #ccc",
    padding: "10px",
  };

  //delete locker
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this locker?")) {
      try {
        console.log("Deleting locker with ID:", id);   
        const response = await axios.delete(`${API_URL}/api/v1/locker/delete-locker/${id}`);
        
        if (response.data.success) {
          toast.success("Locker deleted successfully!");
          setLockers(lockers.filter(locker => locker._id !== id)); // Remove deleted locker from state
        } else {
          toast.error("Failed to delete locker.");
        }
      } catch (error) {
        console.error("Error deleting locker:", error);
        toast.error("Something went wrong.");
      }
    }
  };
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-10">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
              <h1 className="h2">About Rentals Lockers</h1>
            </div>
            <div className="table-responsive locker-table text-center" style={scrollableStyle}>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th name="locker_size">Locker Size</th>
                    <th name="locker_price">Locker Price</th>
                    <th name="avilable_lockers">Avilable Lokers</th>
                    <th name="assign_lockerss">Assign Lockers</th>
                    <th name="maintanance_lockers">Maintanance Lockers</th>
                    <th name="total_lockers">Total Lockers</th>
                    <th colSpan={2} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody id="lockerTableBody">
                {lockers.length > 0 ? (
                    lockers.map((locker) => (
                      <tr key={locker._id}>
                        <td>{locker.lockerSize}</td>
                        <td>{locker.lockerPrice}</td>
                        <td>{locker.availableLockers}</td>
                        <td>{locker.assignedLockers}</td>
                        <td>{locker.maintenanceLockers}</td>
                        <td>{locker.availableLockers + locker.assignedLockers + locker.maintenanceLockers}</td>
                        <td>
                          <NavLink to={`/admin/locker/${locker._id}`} className="btn btn-sm btn-danger" >
                            Update
                          </NavLink>
                        </td>
                        <td>
                          <NavLink className="btn btn-sm btn-warning"  onClick={() => handleDelete(locker._id)}>
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
  );
};

export default LockerDetails;
