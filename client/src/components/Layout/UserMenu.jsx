import React, { useEffect } from 'react'
import { NavLink,useLocation } from 'react-router-dom'

const UserMenu = () => {
    const location = useLocation(); //      Get the current route

    useEffect(() => {
      //     Automatically open the correct menu based on the current route
      const path = location.pathname;
      const collapseMenus = [
        { path: "/dashboard/user", target: "#dashboard-collapse" },
        { path: "/user/payment-history", target: "#payment-collapse" },
        { path: "/user/access-history", target: "#locker-collapse" },
        { path: "/user/service-request", target: "#Request-collapse" },
        { path: "/user/request-history", target: "#Request-collapse" },

      ];
  
      collapseMenus.forEach(({ path: menuPath, target }) => {
        const collapseElement = document.querySelector(target);
        if (collapseElement) {
          const collapseInstance = new bootstrap.Collapse(collapseElement, {
            toggle: false,
          });
  
          if (path.startsWith(menuPath)) {
            collapseInstance.show(); //     Show the relevant menu on route change
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
                <button className="sidebar-btn bi-speedometer2 align-items-center rounded collapsed" id="btnDashboard" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="true">
                    Dashboard   
                </button>
                <div className="collapse" id="dashboard-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><NavLink to="/dashboard/user" id="udash" className="link-dark rounded">Dashboard</NavLink></li>

                    </ul>
                </div>
                </li>

                <li className="mb-1">
                <button className="sidebar-btn bi-bell align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#payment-collapse" aria-expanded="false">
                    Payment
                </button>
                <div className="collapse" id="payment-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><NavLink to="/user/payment-history" id="transaction" className="link-dark rounded">Payment History</NavLink></li>

                    </ul>
                </div>
                </li>
                <li className="mb-1">
                <button className="sidebar-btn align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#locker-collapse" aria-expanded="false">
                    <i className="bi-solid bi-list" /> Locker Access
                </button>
                <div className="collapse" id="locker-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                    <li><NavLink to="/user/access-history" id="inouttran" className="link-dark rounded">Access History</NavLink></li>
                    </ul>
                </div>
                </li>
                <li className="mb-1">
                <button className="sidebar-btn align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#Request-collapse" aria-expanded="false">
                    <i className="bi-solid bi-list" /> Service Request
                </button>
                <div className="collapse" id="Request-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                    <li><NavLink to="/user/service-request" id="request" className="link-dark rounded">Request</NavLink></li>
                    <li><NavLink to="/user/request-history" id="history" className="link-dark rounded">Request History</NavLink></li>
                    </ul>
                </div>
                </li>
            </ul>
            </div>

          
    </>
  )
}

export default UserMenu

// import React, { useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// const UserMenu = () => {
//   const location = useLocation(); //     Get the current route

//   useEffect(() => {
//     //     Automatically open the correct menu based on the current route
//     const path = location.pathname;
//     const collapseMenus = [
//       { path: "/dashboard/user", target: "#dashboard-collapse" },
//       { path: "/user/payment-history", target: "#payment-collapse" },
//       { path: "/user/access-history", target: "#locker-collapse" },
//       { path: "/user/request-history", target: "#Request-collapse" },
//     ];

//     //     Open the correct collapse menu based on the active path
//     collapseMenus.forEach(({ path: menuPath, target }) => {
//       const collapseElement = document.querySelector(target);

//       if (collapseElement) {
//         const collapseInstance = new bootstrap.Collapse(collapseElement, {
//           toggle: false,
//         });

//         if (path.startsWith(menuPath)) {
//           collapseInstance.show(); //     Show the relevant menu
//         } else {
//           collapseInstance.hide(); //     Hide others
//         }
//       }
//     });
//   }, [location.pathname]); //     Re-run when route changes

//   return (
//     <>
//       <div className="p-3 sidebar d-md-block">
//         <span className="fs-5 fw-semibold">NAVIGATION</span>
//         <ul className="list-unstyled ps-0">
//           {/* Dashboard */}
//           <li className="my-1">
//             <button
//               className="sidebar-btn bi-speedometer2 align-items-center rounded collapsed"
//               id="btnDashboard"
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
//                     to="/dashboard/user"
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

//           {/* Payment */}
//           <li className="mb-1">
//             <button
//               className="sidebar-btn bi-bell align-items-center rounded collapsed"
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
//                     to="/user/payment-history"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Payment History
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </li>

//           {/* Locker Access */}
//           <li className="mb-1">
//             <button
//               className="sidebar-btn align-items-center rounded collapsed"
//               data-bs-toggle="collapse"
//               data-bs-target="#locker-collapse"
//               aria-expanded="false"
//             >
//               <i className="bi-solid bi-list" /> Locker Access
//             </button>
//             <div className="collapse" id="locker-collapse">
//               <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//                 <li>
//                   <NavLink
//                     to="/user/access-history"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Access History
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </li>

//           {/* Service Request */}
//           <li className="mb-1">
//             <button
//               className="sidebar-btn align-items-center rounded collapsed"
//               data-bs-toggle="collapse"
//               data-bs-target="#Request-collapse"
//               aria-expanded="false"
//             >
//               <i className="bi-solid bi-list" /> Service Request
//             </button>
//             <div className="collapse" id="Request-collapse">
//               <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//                 <li>
//                   <NavLink
//                     to="/user/request-history"
//                     className={({ isActive }) =>
//                       isActive ? "link-dark rounded btn-active" : "link-dark rounded"
//                     }
//                   >
//                     Request History
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

// export default UserMenu;
