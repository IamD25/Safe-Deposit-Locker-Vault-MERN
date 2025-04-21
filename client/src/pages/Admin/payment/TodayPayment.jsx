import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout.jsx";
import AdminMenu from "../../../components/Layout/AdminMenu.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const TodayPayment = () => {
  const [payments, setPayments] = useState([]);
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
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/payment/today-payment-details`);
        if (response.data.success) {
          setPayments(response.data.payments); // Correctly assign response
          toast.success("Payment details fetched successfully!");
        } else {
          toast.error(response.data.message || "Unable to fetch payment details.");
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
        toast.error("Something went wrong while fetching payment details.");
      }
    };

    fetchPayments();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-2">
          <AdminMenu />
        </div>
        <div className="col-md-10 p-0 m-0" style={scrollableStyle}>
          <div className="row">
            <div className="col pt-3">
              <h1 className="h2">Payment Transaction History</h1>
            </div>
            <div className="col-md-2 pt-3">
              <ul className="list-unstyled">
                <li className="nav-item inout">
                  <NavLink to="/admin/add-payment" className="btn btn-primary">
                    Add Rent
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Table */}
          <div className="table-responsive">
            <hr />
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>User ID</th>
                  <th>Account No.</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Due Date</th>
                  <th>Payment Status</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody id="paymentTableBody">
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment._id}>
                      <td>{payment._id}</td>
                      <td>{payment.userId}</td>
                      <td>{payment.accountNo}</td>
                      <td>{payment.amount || payment.rent}</td>
                      <td>{payment.paymentDate ? payment.paymentDate.split("T")[0] : "N/A"}</td>
                      <td>{payment.dueDate ? payment.dueDate.split("T")[0] : "N/A"}</td>
                      <td>{payment.paymentStatus || "N/A"}</td>
                      <td>{payment.paymentMethod || "N/A"}</td>
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
            {/* {payments.length === 0 && (
              <h5 className="text-center" id="notran">
                There are no transactions.
              </h5>
            )} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TodayPayment;
