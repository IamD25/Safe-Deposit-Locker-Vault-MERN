import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import '../../components/Layout/AdminMenu.css'
import { NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
    const [lockerSummary, useLockerSummary] = useState([]);
    console.log(lockerSummary);
      useEffect(() => {
        const fetchLockers = async () => {
          try {
            const response = await axios.get(`${API_URL}/api/v1/locker/locker-summary`);
            useLockerSummary(response.data.lockerSummary); // Assuming response.data is an array of lockers
          } catch (error) {
            console.error("Error fetching locker details:", error);
            toast.error('Somthing went Wrong.UI');
          }
        };
    
        fetchLockers();
      }, []);
  return (
    <Layout>
      <div className="container-fluid">
       <div className="row">
       <div className="col-md-2 p-0"><AdminMenu></AdminMenu></div>
       <div className="col-md-10">
       <div class="row">
                    
            <div className="col pt-2 pb-2 mb-3">
                <h1 className="h2">Dashboard</h1>
            </div>
            <div className="col-md-2 pt-3 pb-2 mb-3">
                <div className="input-group">
                <ul>
                    <li className="nav-item list-unstyled inout">
                    <NavLink to={"/locker/access"} type="btn" className=" btn btn-primary">Check In and Out</NavLink>   
                    </li>
                </ul>
                </div>
            </div>
            <div className="col-md-2 pt-3 pb-2 mb-3">
                <div className="input-group">
                <ul>
                    <li className="nav-item list-unstyled inout">
                    <NavLink to="/payment/add" type="btn" className=" btn btn-primary">Add Rent</NavLink>   
                    </li>
                </ul>
                </div>
            </div>
            {/* About Lockers */}
            <div className="overview-box p-00">
                <div className="head">
                <h3 className="mt-4 mx-4">Overview of Lockers</h3>
                <p className="mx-4 color-light">Key metics for your safe deposit locker business</p>
                </div>
                <div className="row">
                <div className="col-md-3 mt-4 text-center">
                    <h1 name="totalLockers">{lockerSummary.totalLockers}</h1>
                    <p>Total Lockers</p>
                </div>
                <div className="col-md-3 mt-4 text-center">
                    <h1 name="asignedLockers">{lockerSummary.assignedLockers}</h1>
                    <p>Asigned Lockers</p>
                </div>
                <div className="col-md-3 mt-4  text-center">
                    <h1 name="avilableLockers">{lockerSummary.availableLockers}</h1>
                    <p>Avilable Lockers</p>
                </div>
                <div className="col-md-3 mt-4  text-center">
                    <h1 name="MaintananceLocers">{lockerSummary.maintenanceLockers}</h1>
                    <p>Maintanance Lockers</p>
                </div>
                </div>
            </div>
            {/* About Users */}
            <div className="overview-box mt-3">
                <div className="head">
                <h3 className="mt-4 mx-4">Overview of Users</h3>
                <p className="mx-4 color-light">Key metics for your safe deposit locker business</p>
                </div>
                <div className="row">
                <div className="col-md-3 mt-4 text-center">
                    <h1 name="totalUsers">10</h1>
                    <p>Total Users</p>
                </div>
                <div className="col-md-3 mt-4 text-center">
                    <h1 name="paidRentUsers">7</h1>
                    <p>Paid Rent Users</p>
                </div>
                <div className="col-md-3 mt-4  text-center">
                    <h1 name="unpaidRentUsers">3</h1>
                    <p>Unpaid Rent Users</p>
                </div>
                <div className="col-md-3 mt-4  text-center">
                    <h1 name="pendingUserReequests">5</h1>
                    <p>Pending User Requests</p>
                </div>
                </div>
            </div>
            </div>

       </div>
       </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
