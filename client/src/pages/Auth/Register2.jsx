import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
// import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './../../style/AuthStyle.css';
import {toast} from 'react-hot-toast';
const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [answer,setAnswer] = useState("");
    const navigate = useNavigate();
    
    
    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
       try {
        const res = await axios.post(`${API_URL}/api/v1/auth/register`,{name,email,password,phone,address,answer});
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

  return (
    <Layout>
      <div className="form-container">
        <h1>REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange= {(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange= {(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange= {(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              id="phone"
              value={phone}
              onChange= {(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone Number"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange= {(e) => setAddress(e.target.value)}
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="address"
              value={answer}
              onChange= {(e) => setAnswer(e.target.value)}
              placeholder="What is your Favorite sports?"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
