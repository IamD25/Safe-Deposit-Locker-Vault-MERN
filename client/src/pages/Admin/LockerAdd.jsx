import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import '../../components/Layout/AdminMenu.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import LockerManagement from "./locker/AddLocker.jsx"
const API_URL = import.meta.env.VITE_API_URL;


const LockerAdd = () => {
    const navigate = useNavigate();
    const [lockerSize,setLockerSize] = useState("");
    const [lockerPrice,setLockerPrice] = useState("");
    const [availableLockers,setAvailableLockers] = useState("");
    const [assignedLockers,setAssignedLockers] = useState("");
    const [maintenanceLockers,setMaintenanceLockers] = useState("");
    const [priceError, setPriceError] = useState("");
    const [assignError, setAssignError] = useState("");
    const [avilError, setAvilError] = useState("");
    const [manError, setManError] = useState("");
    const [sizeError, setSizeError] = useState("");


    let [totalLockers,setTotalLockers] = useState(maintenanceLockers + assignedLockers);
    useEffect(() => {
        setTotalLockers(Number(availableLockers) + Number(maintenanceLockers) + Number(assignedLockers));
    }, [maintenanceLockers, assignedLockers]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(priceError || assignError || avilError || manError){
            return(toast.error( "Please enter only positive digits."))
          }
        try {
            const res = await axios.post(`${API_URL}/api/v1/locker/create-locker`,{lockerSize,lockerPrice,availableLockers,assignedLockers,maintenanceLockers,totalLockers});
                if(res.data.success){
                  toast.success(res.data.message);
                  navigate("/admin/locker-details")
                }else{
                  toast.error(res.data.message);
                }
        } catch (error) {
            console.log(error);
            toast.error('Somthing went Wrong.UI');
        }
    }
    
    // digit validation
    // const validLockerPrice = (lockerPrice) => {
    //     const digitRegex = /^\d+$/;
    //     if (!lockerPrice) {
    //         setPriceError("Locker Price is required.");
    //     } else if (!digitRegex.test(lockerPrice)) {
    //         setPriceError("Only Positive Number are allowed.");
    //     } else {
    //         setPriceError("");
    //     }
    // };
    // const [contactNumber, setContactNumber] = useState("");
    const [error, setError] = useState(false);

    const lockerSizeVal = (e) => {
        let value = e.target.value;

    // Regex to allow only alphabets and spaces
    const alphaRegex = /^[A-Za-z\s]+$/;
    
    if (value === "" || alphaRegex.test(value)) {
        setLockerSize(value);
        setSizeError(""); // Clear error if valid
    } else {
        setSizeError("Only alphabets and spaces are allowed.");
    }
    };

    //locekr avilable 
    const lockerAvlVal = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        value = value.substring(0, 2); // Limit to 5 digits
    
        setAvailableLockers(value);
    
        if (value === "") {
            setAvilError("Available Lockers is required.");
        } else if (!/^\d+$/.test(value)) {
            setAvilError("Only positive numbers are allowed.");
        } else {
            setAvilError("");
        }
    };
    // Locker Price Validation (Only Positive Numbers, Max 6 Digits)
const lockerPriceVal = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    value = value.substring(0, 6); // Limit to 6 digits
    setLockerPrice(value);

    if (value === "") {
        setPriceError("Locker Price is required.");
    } else {
        setPriceError(""); // Clear error if valid
    }
};

// Assigned Lockers Validation (Only Positive Numbers, Max 2 Digits)
const lockerAsiVal = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    value = value.substring(0, 2); // Limit to 2 digits
    setAssignedLockers(value);

    if (value === "") {
        setAssignError("Assigned Lockers is required.");
    } else {
        setAssignError(""); // Clear error if valid
    }
};

// Maintenance Lockers Validation (Only Positive Numbers, Max 2 Digits)
const lockerManVal = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    value = value.substring(0, 2); // Limit to 2 digits
    setMaintenanceLockers(value);

    if (value === "") {
        setManError("Maintenance Lockers is required.");
    } else {
        setManError(""); // Clear error if valid
    }
};


  return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0"><AdminMenu></AdminMenu></div>
                        <div className="col-md-10">
                            <h1>Locker Add</h1>
                            <div class="container add-locker">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="text-center">Add New Locker</h3>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label htmlFor="lockerSize" className="form-label">Locker Size</label>
                                                    <input type="text" onChange={lockerSizeVal} className="form-control" id="lockerSize" value={lockerSize} required />
                                                    {sizeError && <p style={{ color: "red" }}>{sizeError}</p>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="lockerPrice" className="form-label">Locker Price</label>
                                                    <input type="number"  onChange={lockerPriceVal} className="form-control" id="lockerPrice" value={lockerPrice} required />
                            {priceError && <p style={{ color: "red" }}>{priceError}</p>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="availableLockers" className="form-label">Avilable Lockers</label>
                                                    <input type="number" onChange={lockerAvlVal} className="form-control" id="availableLockers" value={availableLockers} required />
                                                    {avilError && <p style={{ color: "red" }}>{avilError}</p>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="assignedLockers" className="form-label">Assigned Lockers</label>
                                                    <input type="number" onChange={lockerAsiVal} className="form-control" id="assignedLockers" value={assignedLockers} required />
                                                    {assignError && <p style={{ color: "red" }}>{assignError}</p>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="maintenanceLockers" className="form-label">Maintenance Lockers</label>
                                                    <input type="number" onChange={lockerManVal} className="form-control" id="maintenanceLockers" value={maintenanceLockers} required />
                                                    {manError && <p style={{ color: "red" }}>{manError}</p>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="totalLockers" className="form-label">Total Lockers</label>
                                                    <input type="number" onChange={(e) => setTotalLockers(e.target.value)} className="form-control" id="totalLockers" value={totalLockers} disabled />
                                               
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-dark w-100 mt-3" value="addlocker">Add Locker</button>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </Layout>
  )
}

export default LockerAdd
