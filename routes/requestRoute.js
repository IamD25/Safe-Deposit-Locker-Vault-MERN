import express from 'express'
import {approveController, approvedController, pendingController, rejectController, requestAprovedController, requestController, requestPendingController, requestRejectedController} from '../controller/requestController.js'
// import { isAdmin, requireSignIn } from '../middleware/auth.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
const router = express.Router();


//Pending users Details get || GET
router.get('/pending-request', requireSignIn,isAdmin,requestPendingController);

//Aproved users Details get || GET
router.get('/aproved-request', requireSignIn,isAdmin,requestAprovedController);

//Reject users Details get || GET
router.get('/rejected-request', requireSignIn,isAdmin,requestRejectedController);

//all users Details get || GET
router.get('/all-request', requireSignIn,isAdmin,requestController);

//pending to reject request
router.put('/reject/:id',requireSignIn,isAdmin,rejectController);

//pending to aprrove request
router.put('/approved/:id',requireSignIn,isAdmin,approvedController);

//rjected to pending request
router.put('/pending/:id',requireSignIn,isAdmin,pendingController);

//Assign Locker
router.post('/assign-locker/:id',requireSignIn,isAdmin,approveController);
export default router;
