import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './../../style/AuthStyle.css';

import toast from 'react-hot-toast';
const API_URL = import.meta.env.VITE_API_URL;
const ForgetPassword = () => {

        const [email,setEmail] = useState("");
        const [newPassword,setNewPassword] = useState("");
        const [answer,setAnswer] = useState("");
        const navigate = useNavigate();
         const [emailError, setEmailError] = useState("");
            const [passwordError, setPasswordError] = useState("");
        
        //form function
        const handleSubmit = async (e) => {
            e.preventDefault();
            validateEmail(email);
            validatePassword(password);
    
            if(emailError || passwordError){
              return(toast.error( "Password must be 8-16 characters long,include one uppercase, one lowercase, one number,and one special character."))
            }
           try {
            const res = await axios.post(`${API_URL}/api/v1/auth/forget-password`,{email,answer,newPassword});
            if(res.data.success){
              toast.success(res.data.message);
              navigate("/login")
            }else{
              toast.error(res.data.message);
            }
           } catch (error) {
            toast.error('Somthing went Wrong.');
    
           }
        };
     // Email validation
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

  // Password validation
  const validatePassword = (value) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
      if (!value) {
          setPasswordError("Password is required.");
      } else if (!passwordRegex.test(value)) {
          setPasswordError(
              "Password must be 8-16 characters long,\n" +
              "include one uppercase,\n" +
              "one lowercase, one number,\n" +
              "and one special character.\n"
          );
      } else {
          setPasswordError("");
      }
  };

  return (
    <Layout>
      <div className="form-container">
        <h1>FORGET PASSWORD</h1>
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
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange= {(e) => setAnswer(e.target.value)}
              className="form-control"
              id="answer"
              placeholder="Enter Your Answer"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validatePassword(e.target.value);
            }}
              className="form-control"
              id="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={() => {navigate('/forget-password')}}>
            Forget Password
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgetPassword
