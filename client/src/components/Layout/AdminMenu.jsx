// import React, { useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// const AdminMenu = () => {
//   const location = useLocation(); //    Get the current route

//   useEffect(() => {
//     //    Automatically open the correct menu based on the current route
//     const path = location.pathname;
//     const collapseMenus = [
//       { path: "/dashboard/admin", target: "#dashboard-collapse" },
//       { path: "/admin/locker-details", target: "#lockers-collapse" },
//       { path: "/admin/create-locker", target: "#lockers-collapse" },
//       { path: "/customer/customer-details", target: "#customers-collapse" },
//       { path: "/customer/manage-customer", target: "#customers-collapse" },
//       { path: "/customer/add-customer", target: "#customers-collapse" },
//       { path: "/requests/pending", target: "#request-collapse" },
//       { path: "/requests/approved", target: "#request-collapse" },
//       { path: "/requests/rejected", target: "#request-collapse" },
//       { path: "/requests/all", target: "#request-collapse" },
//       { path: "/locker/today-locker-access", target: "#transaction-collapse" },
//       { path: "/locker/view-locker-access", target: "#transaction-collapse" },
//       { path: "/payment/today", target: "#payment-collapse" },
//       { path: "/payment/view", target: "#payment-collapse" },
//       { path: "/payment/add", target: "#payment-collapse" },
//     ];

//     //    Open the correct collapse menu based on the active path
//     collapseMenus.forEach(({ path: menuPath, target }) => {
//       const collapseElement = document.querySelector(target);

//       if (collapseElement) {
//         const collapseInstance = new bootstrap.Collapse(collapseElement, {
//           toggle: false,
//         });

//         if (path.startsWith(menuPath)) {
//           collapseInstance.show(); //    Show the relevant menu
//         } else {
//           collapseInstance.hide(); //    Hide others
//         }
//       }
//     });
//   }, [location.pathname]); //    Re-run when route changes

//   return (
//     <>
//       <div className="p-3 sidebar d-md-block">
//         <span className="fs-5 fw-semibold">NAVIGATION</span>
//         <ul className="list-unstyled ps-0">
//           {/* Dashboard */}
//           <li className="my-1">
//             <button
//               className="sidebar-btn align-items-center rounded collapsed"
//               data-bs-toggle="collapse"
//               data-bs-target="#dashboard-collapse"
//               aria-expanded="false"
//             >
//               Dashboard
//             </button>
//             <div className="collapse" id="dashboard-collapse">
//               <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//                 <li>
//                   <NavLink
//                     to="/dashboard/admin"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Dashboard
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </li>

//           {/* Lockers */}
//           <li className="mb-1">
//             <button
//               className="sidebar-btn align-items-center rounded collapsed"
//               data-bs-toggle="collapse"
//               data-bs-target="#lockers-collapse"
//               aria-expanded="false"
//             >
//               Lockers
//             </button>
//             <div className="collapse" id="lockers-collapse">
//               <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//                 <li>
//                   <NavLink
//                     to="/admin/locker-details"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Lockers Details
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/admin/create-locker"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Add Lockers
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </li>

//           {/* Customers */}
//           <li className="mb-1">
//             <button
//               className="sidebar-btn align-items-center rounded collapsed"
//               data-bs-toggle="collapse"
//               data-bs-target="#customers-collapse"
//               aria-expanded="false"
//             >
//               Customers
//             </button>
//             <div className="collapse" id="customers-collapse">
//               <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//                 <li>
//                   <NavLink
//                     to="/customer/customer-details"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Customers Details
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/customer/manage-customer"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Manage Customers
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/customer/add-customer"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Add Customers
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </li>

//           {/* Requests */}
//           <li className="mb-1">
//             <button
//               className="sidebar-btn align-items-center rounded collapsed"
//               data-bs-toggle="collapse"
//               data-bs-target="#request-collapse"
//               aria-expanded="false"
//             >
//               Requests
//             </button>
//             <div className="collapse" id="request-collapse">
//               <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//                 <li>
//                   <NavLink
//                     to="/requests/pending"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Pending Requests
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/requests/approved"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Approved Requests
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/requests/rejected"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Rejected Requests
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/requests/all"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     All Requests
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </li>

//           {/* Payment */}
//           <li className="mb-1">
//             <button
//               className="sidebar-btn align-items-center rounded collapsed"
//               data-bs-toggle="collapse"
//               data-bs-target="#payment-collapse"
//               aria-expanded="false"
//             >
//               Payment
//             </button>
//             <div className="collapse" id="payment-collapse">
//               <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//                 <li>
//                   <NavLink
//                     to="/payment/today"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Today's Payment
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/payment/view"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     All Payments
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/payment/add"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Add Payment
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default AdminMenu;

import React, { useEffect } from 'react'
import { NavLink,useLocation } from 'react-router-dom'

// import "./AdminMenu.css";
const AdminMenu = () => {
  const location = useLocation(); //    Get the current route
  
      useEffect(() => {
        //    Automatically open the correct menu based on the current route
        const path = location.pathname;
        const collapseMenus = [
          { path: "/dashboard/admin", target: "#dashboard-collapse" },
                { path: "/admin/locker-details", target: "#lockers-collapse" },
                { path: "/admin/create-locker", target: "#lockers-collapse" },
                { path: "/customer/customer-details", target: "#customers-collapse" },
                { path: "/customer/manage-customer", target: "#customers-collapse" },
                { path: "/customer/add-customer", target: "#customers-collapse" },
                { path: "/requests/pending", target: "#request-collapse" },
                { path: "/requests/approved", target: "#request-collapse" },
                { path: "/requests/rejected", target: "#request-collapse" },
                { path: "/requests/all", target: "#request-collapse" },
                { path: "/locker/today-locker-access", target: "#transaction-collapse" },
                { path: "/locker/view-locker-access", target: "#transaction-collapse" },
                { path: "/payment/today", target: "#payment-collapse" },
                { path: "/payment/view", target: "#payment-collapse" },
                { path: "/payment/add", target: "#payment-collapse" },
                { path: "/service/pending-requests", target: "#service-request-collapse" },
                { path: "/service/approved-requests", target: "#service-request-collapse" },
                { path: "/service/rejected-requests", target: "#service-request-collapse" },
                { path: "/service/all-requests", target: "#service-request-collapse" },
                { path: "/service/accept-request/", target: "#service-request-collapse" },

        ];
    
        collapseMenus.forEach(({ path: menuPath, target }) => {
          const collapseElement = document.querySelector(target);
          if (collapseElement) {
            const collapseInstance = new bootstrap.Collapse(collapseElement, {
              toggle: false,
            });
    
            if (path.startsWith(menuPath)) {
              collapseInstance.show(); //    Show the relevant menu on route change
            } else {
              collapseInstance.hide(); // Hide other menus
            }
          }
        });
      }, [location.pathname]); // Run this when route changes
  return (
    <>

      <div className="p-3 sidebar d-md-block ">
        <span className="fs-5 fw-semibold">NAVIGATION</span>
        <ul className="list-unstyled ps-0">
          <li className="my-1">
            <button
              className="sidebar-btn bi-speedometer2 align-items-center rounded collapsed"
              id="btnDashboard"
              data-bs-toggle="collapse"
              data-bs-target="#dashboard-collapse"
              aria-expanded="true"
            >
              Dashboard
            </button>
            <div className="collapse" id="dashboard-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to="/dashboard/admin"
                    id="dash"
                    className="link-dark rounded"
                  >
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="sidebar-btn bi-lock align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#lockers-collapse"
              aria-expanded="false"
            >
              Lockers
            </button>
            <div className="collapse " id="lockers-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to="/admin/locker-details"
                    id="lockerdetails"
                    className="link-dark rounded"
                  >
                    Lockers Details
                  </NavLink>
                </li>
                {/* <li><NavLink to="#" class="link-dark rounded">Manage Lockers</NavLink></li> */}
                <li>
                  <NavLink
                    to="/admin/create-locker"
                    id="addlocker"
                    className="link-dark rounded"
                  >
                    Add Lockers
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="sidebar-btn bi-people align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#customers-collapse"
              aria-expanded="false"
            >
              Customers
            </button>
            <div className="collapse" id="customers-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to="/customer/customer-details"
                    id="customerdet"
                    className="link-dark rounded"
                  >
                    Customers Details
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/customer/manage-customer"
                    id="customerman"
                    className="link-dark rounded"
                  >
                    Manage Customers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/customer/add-customer"
                    id="customeradd"
                    className="link-dark rounded"
                  >
                    Add Customers
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          {/* <li class="border-top my-3"></li> */}
          <li className="mb-1">
            <button
              className="sidebar-btn bi-bell align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#request-collapse"
              aria-expanded="false"
            >
            Registration Request
            </button>
            <div className="collapse" id="request-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to="/requests/pending"
                    id="reqpen"
                    className="link-dark rounded"
                  >
                    Pending Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/requests/approved"
                    id="reqapr"
                    className="link-dark rounded"
                  >
                    Aproved Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/requests/rejected"
                    id="reqrej"
                    className="link-dark rounded"
                  >
                    Reject Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/requests/all"
                    id="reqall"
                    className="link-dark rounded"
                  >
                    All Request
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="sidebar-btn bi-bell align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#service-request-collapse"
              aria-expanded="false"
            >
            User Service Request
            </button>
            <div className="collapse" id="service-request-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to="/service/pending-requests"
                    id="serreqpen"
                    className="link-dark rounded"
                  >
                    Pending Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/service/approved-requests"
                    id="serreqapr"
                    className="link-dark rounded"
                  >
                    Aproved Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/service/rejected-requests"
                    id="serreqrej"
                    className="link-dark rounded"
                  >
                    Reject Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/service/all-requests"
                    id="serreqall"
                    className="link-dark rounded"
                  >
                    All Request
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="sidebar-btn align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#transaction-collapse"
              aria-expanded="false"
            >
              <i className="fa-solid fa-list" /> Locker Access
            </button>
            <div className="collapse" id="transaction-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to="/locker/today-locker-access"
                    id="trantod"
                    className="link-dark rounded"
                  >
                    Today's Transaction
                  </NavLink>
                </li>
                {/* <li><NavLink to="transactionYesterday.php" class="link-dark rounded">Yesterday's Transaction</NavLink></li> */}
                <li>
                  <NavLink
                    to="/locker/view-locker-access"
                    id="tranall"
                    className="link-dark rounded"
                  >
                    All Time Transaction
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="sidebar-btn align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#payment-collapse"
              aria-expanded="false"
            >
              <i className="fa-solid fa-list" /> Payment
            </button>
            <div className="collapse" id="payment-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to="/payment/today"
                    id="paymentToday"
                    className="link-dark rounded"
                  >
                    Today's Payment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/payment/view"
                    id="paymentAll"
                    className="link-dark rounded"
                  >
                    All Payment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/payment/add"
                    id="paymentAdd"
                    className="link-dark rounded"
                  >
                    Add Payment{" "}
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
