import {useState, useEffect} from 'react';
import { useAuth } from '../../../context/auth';
import {Outlet} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../Spinner';
const API_URL = import.meta.env.VITE_API_URL;


export default function PrivateRoute(){
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();

    useEffect(()=> {
       const authCheck = async() => {
        const res = await axios.get(`${API_URL}/api/v1/auth/user-auth`);
        if(res.data.ok){
            setOk(true);
        }else{
            setOk(false);
        }
       };
       if(auth?.token) authCheck();
    }, [auth?.token]);
    return ok ? <Outlet/> : <Spinner/>;
}

// import { useState, useEffect } from "react";
// import { useAuth } from "../../../context/auth.jsx";
// import { Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Spinner from "../../Spinner.jsx";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function PrivateRoute() {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate(); // ✅ Use navigate for redirection

//   useEffect(() => {
//     const authCheck = async () => {
//       try {
//         // ✅ Send auth token in headers to verify user
//         const res = await axios.get(`${API_URL}/api/v1/auth/user-auth`, {
//           headers: {
//             Authorization: auth?.token,
//           },
//         });

//         // ✅ Check response success and set access
//         if (res.data.success) {
//           setOk(true);
//         } else {
//           setOk(false);
//           navigate("/login"); // Redirect to login if unauthorized
//         }
//       } catch (error) {
//         console.error("Error verifying user:", error);
//         setOk(false);
//         navigate("/login"); // Redirect to login if error occurs
//       }
//     };

//     // ✅ Check if token exists before making API call
//     if (auth?.token) {
//       authCheck();
//     } else {
//       setOk(false);
//       navigate("/login");
//     }
//   }, [auth?.token, navigate]);

//   // ✅ Render content if authenticated, otherwise show spinner
//   return ok ? <Outlet /> : <Spinner />;
// }
// import { useState, useEffect } from "react";
// import { useAuth } from "../../../context/auth.jsx";
// import { Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Spinner from "../../Spinner.jsx";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function PrivateRoute() {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate(); // ✅ Use navigate for redirection

//   useEffect(() => {
//     const authCheck = async () => {
//       try {
//         // ✅ Check if token exists before making API call
//         if (!auth?.token) {
//           setOk(false);
//           navigate("/login");
//           return;
//         }

//         // ✅ Send auth token in headers to verify user
//         const res = await axios.get(`${API_URL}/api/v1/auth/user-auth`, {
//           headers: {
//             Authorization: auth?.token,
//           },
//         });

//         // ✅ Check response success and set access
//         if (res.data.ok) {
//           setOk(true);
//         } else {
//           setOk(false);
//           navigate("/login"); // Redirect to login if unauthorized
//         }
//       } catch (error) {
//         console.error("Error verifying user:", error);
//         setOk(false);
//         navigate("/login"); // Redirect to login if error occurs
//       }
//     };

//     authCheck(); // Call the function when component loads
//   }, [auth?.token, navigate]);

//   // ✅ Render content if authenticated, otherwise show spinner
//   return ok ? <Outlet /> : <Spinner />;
// }
