import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Policy from './pages/Policy.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login.jsx';
import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard.jsx';
import PrivateRoute from './components/Layout/Routes/Private.jsx';
import ForgetPassword from './pages/Auth/ForgetPassword.jsx';
import AdminRoute from './components/Layout/Routes/AdminRoute.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import LockerDetails from './pages/Admin/LockerDetails.jsx';
import LockerAdd from './pages/Admin/LockerAdd.jsx';
import PaymentHistory from './pages/user/PaymentHistory.jsx';
import CheckInOut from './pages/user/CheckInOut.jsx';
import SingleLockerDetails from './pages/Admin/singleLocker.jsx';
import AddCustomer from './pages/Admin/customer/AddCustomer.jsx';
import ManageCustomer from './pages/Admin/customer/ManageCustomer.jsx';
import SingleUser from './pages/Admin/customer/SingleUser.jsx';
import UserDetails from './pages/Admin/customer/UserDetails.jsx';
import MoreDetails from './pages/Admin/customer/MoreDetails.jsx'
import PendingRequests from './pages/Admin/Requests/PendingRequests.jsx';
import ApprovedRequests from './pages/Admin/Requests/ApprovedRequests.jsx';
import RejectedRequests from './pages/Admin/Requests/RejectedRequest.jsx';
import AllRequests from './pages/Admin/Requests/AllRequests.jsx';
import AssignLocker from './pages/Admin/Requests/AssignLocker.jsx';
import LockerAccessEntry from './pages/Admin/lockerAccess/LockerAccessEntry.jsx';
import PaymentEntry from './pages/Admin/payment/PaymentEntry.jsx';
import AllPayment from './pages/Admin/payment/AllPayment.jsx'
import TodayPayment from './pages/Admin/payment/TodayPayment.jsx';
import ViewLockerAccess from './pages/Admin/lockerAccess/ViewLockerAccess.jsx';
import TodayLockerAccess from './pages/Admin/lockerAccess/TodayLockerAccess.jsx';
import ServiceRequest from './pages/user/ServiceRequest.jsx';
import RequestHistory from './pages/user/RequestHistory.jsx';
import AllServiceRequests from './pages/Admin/ServiceRequest/AllServiceRequests.jsx';
import PendingServiceRequests from './pages/Admin/ServiceRequest/PendingServiceRequests.jsx';
import ApprovedServiceRequests from './pages/Admin/ServiceRequest/ApprovedServiceRequests.jsx';
import RejectedServiceRequest from './pages/Admin/ServiceRequest/RejectedServiceRequest.jsx';
import AcceptServiceRequest from './pages/Admin/ServiceRequest/AcceptServiceRequest.jsx';


function App() {

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
          <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/register' element={<Register/>} /> 
          <Route path='/login' element={<Login/>} /> 
          <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<Dashboard/>} /> 
          </Route>
          <Route path='/user'element={<PrivateRoute/>}>
            <Route path='payment-history' element={<PaymentHistory/>} /> 
            <Route path='access-history' element={<CheckInOut/>} /> 
            <Route path='service-request' element={<ServiceRequest/>} />
            <Route path='request-history' element={<RequestHistory/>} /> 
          </Route>

          <Route path='/dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}/>
            <Route path='locker-details' element={<LockerDetails/>}/>
          </Route>
          <Route path='/admin' element={<AdminRoute/>}>
            <Route path='create-locker' element={<LockerAdd/>}/>
            <Route path='locker-details' element={<LockerDetails/>}/>
            <Route path='locker/:id' element={<SingleLockerDetails/>}/>
          </Route>
          <Route path='/customer' element={<AdminRoute/>}>
            <Route path='add-customer' element={<AddCustomer/>}/>
            <Route path='manage-customer' element={<ManageCustomer/>}/>
            <Route path='customer-details' element={<UserDetails/>}/>
            <Route path='customer-more-details/:id' element={<MoreDetails/>}/>
            <Route path='user/:id' element={<SingleUser/>}/>
          </Route>
          <Route path='/requests' element={<AdminRoute/>}>
            <Route path='pending' element={<PendingRequests/>}/> 
            <Route path='approved' element={<ApprovedRequests/>}/>
            <Route path='rejected' element={<RejectedRequests/>}/>
            <Route path='all' element={<AllRequests/>}/>
            <Route path='assign-locker/:id' element={<AssignLocker/>}/>
          </Route>
          <Route path='/service' element={<AdminRoute/>}>
            <Route path='pending-requests' element={<PendingServiceRequests/>}/> 
            <Route path='approved-requests' element={<ApprovedServiceRequests/>}/>
            <Route path='rejected-requests' element={<RejectedServiceRequest/>}/>
            <Route path='all-requests' element={<AllServiceRequests/>}/>
            <Route path='accept-request/:id' element={<AcceptServiceRequest/>}/>
          </Route>
          <Route path='/locker' element={<AdminRoute/>}>
            <Route path='access' element={<LockerAccessEntry/>}/> 
            <Route path='access/:id' element={<LockerAccessEntry/>}/> 
            <Route path='today-locker-access' element={<TodayLockerAccess/>}/> 
            <Route path='view-locker-access' element={<ViewLockerAccess/>}/> 
          </Route>
          
          <Route path='/payment' element={<AdminRoute/>}>
            <Route path='add' element={<PaymentEntry/>}/> 
            <Route path='add/:id' element={<PaymentEntry/>}/> 
            <Route path='view' element={<AllPayment/>}/> 
            <Route path='today' element={<TodayPayment/>}/> 
          </Route>
          <Route path='/forget-password' element={<ForgetPassword/>} /> 
          <Route path='/about' element={<About/>} /> 
          <Route path='/contact' element={<Contact/>} /> 
          <Route path='/policy' element={<Policy/>} /> 
          <Route path='*' element={<PageNotFound/>} /> 
          </Routes>
    </>
  )
}

export default App
