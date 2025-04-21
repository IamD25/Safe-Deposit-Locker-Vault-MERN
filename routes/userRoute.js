import express from 'express';
import {requireSignIn} from "../middleware/authMiddleware.js";
import { userPaymentDetailsController } from '../controller/paymentController.js';
import { userAccessController, userLockerAccessDetailsController } from '../controller/lockerAccessController.js';
import { approvedController, getUserPhoto, lockerCancleController, lockerChange, registerUserRequestController, uploadPhotoController, userDetailsController, userRequestAprovedController, userRequestController, userRequestDetailController, userRequestDetailsController, userRequestPendingController, userRequestRejectController, userRequestRejectedController } from '../controller/userRequestController.js';
import { upload } from '../middleware/upload.js';


const router = express.Router();


//User Payment Details get || GET
router.get('/payment-details/:id', requireSignIn,userPaymentDetailsController);

//User Locker Access Details get || GET
router.get('/access-details/:id', requireSignIn, userLockerAccessDetailsController);

//Locer Details get || GET
router.get('/access-one/:id', requireSignIn,userAccessController);

//User New Service Request Details || POST
router.post('/new-service-request', requireSignIn, registerUserRequestController );

//Get User Service Request Details || GET
router.get('/request-history/:id', requireSignIn, userRequestDetailsController );

//Get single user data
router.get('/user-photo/:id', requireSignIn, getUserPhoto);


//Admin Side

//get user details
router.get('/details/:id',requireSignIn,userDetailsController);


//Pending users Details get || GET
router.get('/pending-request', requireSignIn, userRequestPendingController);

//Aproved users Details get || GET
router.get('/aproved-request', requireSignIn,userRequestAprovedController);

//Reject users Details get || GET
router.get('/rejected-request', requireSignIn, userRequestRejectedController);

//all users Details get || GET
router.get('/all-request', requireSignIn,userRequestController);

//pending to reject request
router.put('/reject/:id',requireSignIn,userRequestRejectController);

// //pending to aprrove request
// router.put('/approved/:id',requireSignIn,approvedController);

//get data for approving request
router.get('/approve/:id',requireSignIn,userRequestDetailController);


//Assign Locker
router.post('/request-accept/:id',requireSignIn,);

//approving user service request Locker
router.post('/locker-Cancle/:id',requireSignIn,lockerCancleController);

//for approving service request 
router.post('/request-cancle-approved/:userId',requireSignIn,approvedController);


//approving user service request Locker for upgrade and downgrade
router.post('/locker-Change/:id',requireSignIn,lockerChange);

// Upload Photo Route
router.post("/upload-photo/:id", upload.single("photo"), uploadPhotoController);

export default router