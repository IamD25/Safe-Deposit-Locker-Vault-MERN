import React, { useEffect, useState }  from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useAuth } from '../../context/auth.jsx';
const PaymentHistory = () => {
   const [payments, setPayments] = useState([]);
    const navigate = useNavigate();
    const [auth] = useAuth();

    useEffect(() => {
      const fetchPayments = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/v1/user/payment-details/${auth.user.userId}`);
          if (response.data.success) {
            setPayments(response.data.payments); // Correctly assign response
            toast.success("Payment details fetched successfully!");
            console.log(payments);
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
      <div className="container-fluid">
            <div className="row">
                <div className="col-md-2  p-0">
                    <UserMenu></UserMenu>
                </div>
                <div className="col-md-10">
                <div>
                      <div className="pt-3 pb-2 mb-3">
                        <h1 className="h2">Payment Transaction History</h1>
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
                              <th name="payment_id">Payment ID</th>
                              <th name="amount">Amount</th>
                              <th name="payment_date">Payment Date</th>
                              <th name="assign_lockerss">Due Date</th>
                              <th name="payment_status">Payment Status</th>
                              <th name="payment_method">Payment Method</th>
                              {/* <th colspan="2" class="text-center">Action</th> */}
                            </tr>
                          </thead>
                          <tbody id="paymentTableBody">
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment._id}>
                      <td>{payment._id}</td>
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

                      </div>
                    </div>

                </div>
            </div>
        </div>
    </Layout>
  )
}

export default PaymentHistory;
