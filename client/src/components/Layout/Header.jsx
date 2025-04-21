// import React, { useEffect } from 'react'
// import {NavLink, Link,useNavigate } from 'react-router-dom';
// import { GiLockers } from "react-icons/gi";
// import {useAuth} from '../../context/auth.jsx'
// import {toast} from "react-hot-toast"

// const Header = () => {

  
//   const [auth,setAuth] = useAuth();
//   const handleLogout = () => {
//     setAuth(
//      {...auth,
//       user:null,
//       token:"",}
//     );
//     localStorage.removeItem("auth");
//     toast.success("Logout Successfully");
//   }
//   return (
//     <>
//      <nav className="navbar navbar-expand-lg bg-body-tertiary">
//   <div className="container-fluid">
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon" />
//     </button>
//     <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//       <Link to="/" className="navbar-brand" ><GiLockers /> FortressGuard</Link>
//       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <NavLink to="/" className="nav-link">Home</NavLink>
//         </li>
//         {
//           !auth.user ? (<>
//           <li className="nav-item">
//           <NavLink to="/register" className="nav-link">Register</NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink to="/login" className="nav-link">Login</NavLink>
//         </li>
//           </>) : (<>

//           <li className="nav-item dropdown px-2">
//             <navlink className="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown" aria-expanded="false">{auth?.user.name}</navlink>
//             <ul className="dropdown-menu">
//               <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink></li>
//               <li><NavLink to="/login" onClick={handleLogout} className="dropdown-item">Logout</NavLink></li>
//             </ul>
//           </li>

//           </>) 
//         }
//       </ul>
//     </div>
//   </div>
// </nav>

//     </>
//   )
// }

// export default Header;


import React, { useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GiLockers } from "react-icons/gi";
import { useAuth } from "../../context/auth.jsx";
import { toast } from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth(); // Get auth state and setter from context
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // ✅ Auto logout on token expiry
  useEffect(() => {
    const token = auth?.token;

    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        handleLogout(); // Logout if token expired
        toast.error("Session expired. Please log in again.");
      }
    }
  }, [auth?.token]);

  // ✅ JWT Token Parsing Function
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1])); // Decode JWT
    } catch (e) {
      return null;
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth"); // Clear auth data from storage
    toast.success("Logout Successfully");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Navbar Toggler for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Navbar Logo and Brand */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <GiLockers /> FortressGuard
            </Link>

            {/* Navbar Links */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>

              {/* If user is not logged in */}
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                // If user is logged in (Dropdown for Dashboard and Logout)
                <>
                  <li className="nav-item dropdown px-2">
                    {/* Corrected NavLink in dropdown */}
                    <NavLink
                      className="nav-link dropdown-toggle "
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user.name}
                    </NavLink>
                    <ul className="dropdown-menu " > 
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          onClick={handleLogout}
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
