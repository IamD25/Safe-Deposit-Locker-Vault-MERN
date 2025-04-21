import express from 'express';
import { deleteLockerController, getLockerDetails, getSingleLockerController, newLockerController, updateLockerController } from '../controller/lockerController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { photoUplodControler, registerRequestController } from '../controller/registrationRequestController.js';

const router = express.Router();

//Register Request  || POST
router.post('/register-request', requireSignIn,isAdmin, registerRequestController);
//LOGIN || POST
router.post('/login', loginController);

//Forget Password || POST
router.post('/forget-password', forgetPasswordController);

// Get User Data || GET


//test routes
router.get("/test",requireSignIn, isAdmin, testController);

// Add this inside authRoute.js
console.log("Auth routes loaded");  


//Protected user route auth
router.get("/user-auth",requireSignIn, (req,res) =>{
    res.status(200).send({ok: true});
});

//Protected admin route auth
router.get("/admin-auth",requireSignIn, isAdmin, (req,res) =>{
    res.status(200).send({ok: true});
});
