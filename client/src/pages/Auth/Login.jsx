// // import React,{useState} from "react";
// // import Layout from "../../components/Layout/Layout";
// // import 'react-toastify/dist/ReactToastify.css';
// // import axios from 'axios';
// // import {useLocation, useNavigate} from 'react-router-dom';
// // import './../../style/AuthStyle.css';
// // import {useAuth} from "../../context/auth.jsx";
// // import toast from 'react-hot-toast';
// // const API_URL = import.meta.env.VITE_API_URL;



// // const Login = () => {

  
// //     const [email,setEmail] = useState("");
// //     const [password,setPassword] = useState("");
// //     const navigate = useNavigate();
// //     const [auth, setAuth] = useAuth();
// //     const location = useLocation();
// //     const [emailError, setEmailError] = useState("");
// //     const [passwordError, setPasswordError] = useState("");
    
// //     //form function
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         validateEmail(email);
// //         validatePassword(password);
// //        try {
// //         const res = await axios.post(`${API_URL}/api/v1/auth/login`,{email,password});
// //         if(res.data.success){
         
// //           setAuth({...auth,
// //             user: res.data.user,
// //             token: res.data.token,
// //           });
// //           localStorage.setItem("auth",JSON.stringify(res.data));
// //           toast.success(res.data.message);
// //           navigate(location.state || "/")
// //         }else{
// //           toast.error(res.data.message);
// //         }
// //        } catch (error) {
// //         toast.error('Somthing went Wrong.');
// //         // console.log(error);

// //        }
// //     };
// // const handleChange = (e) => {
// //         const inputValue = e.target.value;
// //         if (/^\d*$/.test(inputValue) && Number(inputValue) > 0) {
// //             setValue(inputValue);
// //         } else if (inputValue === "") {
// //             setValue("");
// //         }
// //     };
// //     // Email Validation
// //     const validateEmail = (email) => {
// //       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //       if (!email) {
// //           setEmailError("Email is required.");
// //       } else if (!emailRegex.test(email)) {
// //           setEmailError("Invalid email format.");
// //       } else {
// //           setEmailError("");
// //       }
// //   };
// //   // Password Validation
// //   const validatePassword = (value) => {
// //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
// //     if (!value) {
// //         setPasswordError("Password is required.");
// //     } else if (!passwordRegex.test(value)) {
// //         setPasswordError(
// //             "Password must be 8-16 characters long,\n"+
// //              "include one uppercase,\n"+
// //               "one lowercase, one number,\n"+ 
// //               "and one special character.\n"
// //         );
// //     } else {
// //         setPasswordError("");
// //     }
// // };
// //   return (
// //     <Layout>
// //       <div className="form-container">
// //         <h1>LOGIN</h1>
// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-3">
// //             <input
// //               type="email"
// //               className="form-control"
// //               id="email"
// //               value={email}
// //               // onChange= {(e) => setEmail(e.target.value)}
// //               onChange={(e) => {
// //                 setEmail(e.target.value);
// //                 validateEmail(e.target.value);
// //             }}
// //                 placeholder="Enter Your Email"
// //                 required
// //             />
// //             {emailError && <p style={{ color: "red" }}>{emailError}</p>}
// //           </div>
// //           <div className="mb-3">
// //             <input
// //               type="password"
// //               value={password}
// //               // onChange= {(e) => setPassword(e.target.value)}
// //               onChange={(e) => {
// //                 setPassword(e.target.value);
// //                 validatePassword(e.target.value);
// //             }}
// //               className="form-control"
// //               id="password"
// //               placeholder="Enter Your Password"
// //               required
// //             />
// //              {passwordError && <pre style={{ color: "red" }}>{passwordError}</pre>}
// //           </div>
// //           <div className="mb-3">
// //           <button type="submit" className="btn btn-primary">
// //             LOGIN
// //           </button>
// //           </div>
          
// //           <button type="submit" className="btn btn-primary" onClick={() => {navigate('/forget-password')}}>
// //             Forget Password
// //           </button>
// //         </form>
// //       </div>
// //     </Layout>
// //   )
// // }

// // export default Login
// import React, { useState } from "react";
// import Layout from "../../components/Layout/Layout";
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './../../style/AuthStyle.css';
// import { useAuth } from "../../context/auth.jsx";
// import toast from 'react-hot-toast';

// const API_URL = import.meta.env.VITE_API_URL;

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();
//     const [auth, setAuth] = useAuth();
//     const location = useLocation();
//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");

//     // Form submission handler
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         validateEmail(email);
//         validatePassword(password);

//         if(emailError || passwordError){
//           return(toast.error( "Password must be 8-16 characters long,include one uppercase, one lowercase, one number,and one special character."))
//         }
//         try {
//             const res = await axios.post(`${API_URL}/api/v1/auth/login`, { email, password });
//             if (res.data.success) {
//                 setAuth({
//                     ...auth,
//                     user: res.data.user,
//                     token: res.data.token,
//                 });
//                 localStorage.setItem("auth", JSON.stringify(res.data));
//                 toast.success(res.data.message);
//                 navigate(location.state || "/");
//             } else {
//                 toast.error(res.data.message);
//             }
//         } catch (error) {
//             toast.error('Something went wrong.');
//         }
//     };

//     // Email validation
//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email) {
//             setEmailError("Email is required.");
//         } else if (!emailRegex.test(email)) {
//             setEmailError("Invalid email format.");
//         } else {
//             setEmailError("");
//         }
//     };

//     // Password validation
//     const validatePassword = (value) => {
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
//         if (!value) {
//             setPasswordError("Password is required.");
//         } else if (!passwordRegex.test(value)) {
//             setPasswordError(
//                 "Password must be 8-16 characters long,\n" +
//                 "include one uppercase,\n" +
//                 "one lowercase, one number,\n" +
//                 "and one special character.\n"
//             );
//         } else {
//             setPasswordError("");
//         }
//     };

//     return (
//         <Layout>
//             <div className="form-container">
//                 <h1>LOGIN</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <input
//                             type="email"
//                             className="form-control"
//                             id="email"
//                             value={email}
//                             onChange={(e) => {
//                                 setEmail(e.target.value);
//                                 validateEmail(e.target.value);
//                             }}
//                             placeholder="Enter Your Email"
//                             required
//                         />
//                         {emailError && <p style={{ color: "red" }}>{emailError}</p>}
//                     </div>
//                     <div className="mb-3">
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => {
//                                 setPassword(e.target.value);
//                                 validatePassword(e.target.value);
//                             }}
//                             className="form-control"
//                             id="password"
//                             placeholder="Enter Your Password"
//                             required
//                         />
//                         {passwordError && <pre style={{ color: "red" }}>{passwordError}</pre>}
//                     </div>
//                     <div className="mb-3">
//                         <button type="submit" className="btn btn-primary">
//                             LOGIN
//                         </button>
//                     </div>
//                     <button type="submit" className="btn btn-primary" onClick={() => { navigate('/forget-password') }}>
//                         Forget Password
//                     </button>
//                 </form>
//             </div>
//         </Layout>
//     );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import Layout from "../../components/Layout/Layout";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./../../style/AuthStyle.css";
// import { useAuth } from "../../context/auth.jsx";
// import toast from "react-hot-toast";

// const API_URL = import.meta.env.VITE_API_URL;

// const Login = () => {
//   // State Management
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [auth, setAuth] = useAuth();
//   const location = useLocation();
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   // 🔒 Check if the user is already logged in
//   useEffect(() => {
//     if (auth?.token) {
//       navigate("/"); // Redirect to homepage if already logged in
//     }
//   }, [auth, navigate]);

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     validateEmail(email);
//     validatePassword(password);

//     // Prevent API call if errors exist
//     if (emailError || passwordError) {
//       toast.error("Please fix the errors before submitting the form.");
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/v1/auth/login`, {
//         email,
//         password,
//       });

//       if (res.data.success) {
//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.token,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data));
//         toast.success(res.data.message);
//         navigate(location.state || "/"); // Redirect after login
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       toast.error("Something went wrong.");
//     }
//   };

//   // Email validation
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email) {
//       setEmailError("Email is required.");
//     } else if (!emailRegex.test(email)) {
//       setEmailError("Invalid email format.");
//     } else {
//       setEmailError("");
//     }
//   };

//   // Password validation
//   const validatePassword = (value) => {
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
//     if (!value) {
//       setPasswordError("Password is required.");
//     } else if (!passwordRegex.test(value)) {
//       setPasswordError(
//         "Password must be 8-16 characters long,\n" +
//           "include one uppercase, one lowercase,\n" +
//           "one number, and one special character."
//       );
//     } else {
//       setPasswordError("");
//     }
//   };

//   return (
//     <Layout>
//       <div className="form-container">
//         <h1>LOGIN</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 validateEmail(e.target.value);
//               }}
//               placeholder="Enter Your Email"
//               required
//             />
//             {emailError && <p style={{ color: "red" }}>{emailError}</p>}
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 validatePassword(e.target.value);
//               }}
//               className="form-control"
//               id="password"
//               placeholder="Enter Your Password"
//               required
//             />
//             {passwordError && (
//               <pre style={{ color: "red" }}>{passwordError}</pre>
//             )}
//           </div>
//           <div className="mb-3">
//             <button type="submit" className="btn btn-primary">
//               LOGIN
//             </button>
//           </div>
//         </form>

//         {/* 🔐 Moved Forget Password button outside the form */}
//         <button
//           className="btn btn-secondary"
//           onClick={() => {
//             navigate("/forget-password");
//           }}
//         >
//           Forget Password
//         </button>
//       </div>
//     </Layout>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./../../style/AuthStyle.css";
import { useAuth } from "../../context/auth.jsx";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  // State Management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 🔒 Check if the user is already logged in
  useEffect(() => {
    if (auth?.token) {
      navigate("/"); // Redirect to homepage if already logged in
    }
  }, [auth, navigate]);

  // 📝 Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);

    // Prevent API call if errors exist
    if (emailError || passwordError) {
      toast.error("Please fix the errors before submitting the form.");
      return;
    }

    try {
      // 🌐 Check if request is pending before login
      const pendingRes = await axios.post(`${API_URL}/api/v1/auth/check-status`, {
        email,
      });

      if (pendingRes.data.status === "Pending") {
        toast.error("Your account opening request is under process.");
        return;
      }

      // 🚀 Proceed with login if account is not pending
      const res = await axios.post(`${API_URL}/api/v1/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success(res.data.message);
        navigate(location.state || "/"); // Redirect after login
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error in login:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // 📧 Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required.");
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
  };

  // 🔒 Password validation
  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!value) {
      setPasswordError("Password is required.");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be 8-16 characters long,\n" +
          "include one uppercase, one lowercase,\n" +
          "one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              placeholder="Enter Your Email"
              required
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              className="form-control"
              id="password"
              placeholder="Enter Your Password"
              required
            />
            {passwordError && (
              <pre style={{ color: "red" }}>{passwordError}</pre>
            )}
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
          </div>
        </form>

        {/* 🔐 Moved Forget Password button outside the form */}
        <button
          className="btn btn-secondary"
          onClick={() => {
            navigate("/forget-password");
          }}
        >
          Forget Password
        </button>
      </div>
    </Layout>
  );
};

export default Login;
