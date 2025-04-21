import express from 'express';
import {requireSignIn, isAdmin} from "../middleware/authMiddleware.js";
import { newPaymentController, paymentDetailsController, todayPaymentDetailsController } from '../controller/paymentController.js';


const router = express.Router();

//Loker Access Add || POST
router.post('/new', requireSignIn,isAdmin, newPaymentController);

//all Payment Details get || GET
router.get('/payment-details', requireSignIn,isAdmin,paymentDetailsController);

//today Payment Details get || GET
router.get('/today-payment-details', requireSignIn,isAdmin,todayPaymentDetailsController);


//Update Locker || PUT
router.put('/update-locker/:id',requireSignIn,isAdmin,);

//single locker details
router.get('/locker/:id',requireSignIn,isAdmin,);

//delete locker
router.delete('/delete-locker/:id',requireSignIn,isAdmin,);

export default router