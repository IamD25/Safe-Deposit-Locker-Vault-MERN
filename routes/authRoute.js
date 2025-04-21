import express from 'express';
import { registerController, loginController, testController, forgetPasswordController, checkAlreadyLoggedIn, checkStatusController} from '../controller/authController.js';
import {requireSignIn, isAdmin, isRequestPending} from "../middleware/authMiddleware.js";
// import {requireSignIn, isAdmin, isRequestPending} from "../middleware/auth.js";
import { registerRequestController, loginController2,forgetPasswordController2, getUserDataController, getUserDetails, updateUserController, getReqUserDataController, getUserIdDataController } from '../controller/registrationRequestController.js';

//route object
const router = express.Router();
  
//routing
//REGISTER || METHOD POST
router.post('/register', registerRequestController);

router.post('/check-status', checkStatusController);

//LOGIN || POST
router.post('/login',checkAlreadyLoggedIn, loginController);

//Forget Password || POST
router.post('/forget-password', forgetPasswordController);


//all users Details get || GET
router.get('/users-details', requireSignIn,isAdmin,getUserDetails);

//Get single user data
router.get('/user-details/:id', requireSignIn,isAdmin, getUserDataController);

//Get single user data usiing UserId
router.get('/userId-details/:id', requireSignIn,isAdmin, getUserIdDataController);


//Get single user data for request
router.get('/user/:id', requireSignIn,isAdmin, getReqUserDataController);


//Update user Details || PUT
router.put('/user/:id', requireSignIn,isAdmin, updateUserController);

//test routes
router.get("/test",requireSignIn, isAdmin, testController);

// Add this inside authRoute.js
console.log("Auth routes loaded");  

//Protected user route auth
router.get("/user-auth",requireSignIn, (req,res) =>{
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.status(200).send({ok: true});
    // console.log(res.error)
});



//Protected admin route auth
router.get("/admin-auth",requireSignIn, isAdmin, (req,res) =>{
    
    res.status(200).send({ok: true});
});


export default router;