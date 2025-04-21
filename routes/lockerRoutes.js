import express from 'express';
import { deleteLockerController, getLockerDetails, getLockerSummary, getSingleLockerController, newLockerController, updateLockerController } from '../controller/lockerController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
// import { isAdmin, requireSignIn } from '../middleware/auth.js';


const router = express.Router();

//Loker Add || POST
router.post('/create-locker', requireSignIn,isAdmin, newLockerController);

//Locer Details get || GET
router.get('/locker-details', requireSignIn,isAdmin,getLockerDetails);

//Update Locker || PUT
router.put('/update-locker/:id',requireSignIn,isAdmin,updateLockerController);

//single locker details
router.get('/locker/:id',requireSignIn,isAdmin,getSingleLockerController);

//delete locker
router.delete('/delete-locker/:id',requireSignIn,isAdmin,deleteLockerController);

//Locer Details get || GET
router.get('/locker-summary', requireSignIn,isAdmin,getLockerSummary);

export default router