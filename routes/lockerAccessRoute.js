import express from 'express';
import {requireSignIn, isAdmin} from "../middleware/authMiddleware.js";
import { lockerAccessDetailsController, newLockerAccessController, todayLockerAccessDetailsController, userAccessController } from '../controller/lockerAccessController.js';


const router = express.Router();

//Loker Access Add || POST
router.post('/create-access', requireSignIn,isAdmin, newLockerAccessController);

//Locer Details get || GET
router.get('/access-details', requireSignIn,isAdmin,lockerAccessDetailsController);


//Update Locker || PUT
router.put('/update-locker/:id',requireSignIn,isAdmin,);

//single locker details
router.get('/today-locker-access',requireSignIn,isAdmin,todayLockerAccessDetailsController);

//delete locker
router.delete('/delete-locker/:id',requireSignIn,isAdmin,);

export default router