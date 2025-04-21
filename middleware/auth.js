import JWT from 'jsonwebtoken';
import RegisterModel from '../models/registrationRequestModel.js';
//Protected Routes token base
export const requireSignIn = async (req, res, next) =>{
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};

//admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await RegisterModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            });
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware"
        })
    }
};

//Pending request 
// export const isRequestPending = async (req, res, next) => {
//     try {
//         const user = await RegisterModel.findOne({email: req.user.email});
//         if(user.status !== Approved){
//             return res.status(401).send({
//                 success: false,
//                 message: "Your accout opening request in under process"
//             });
//         }else{
//             next();
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(401).send({
//             success: false,
//             error,
//             message: "Error in admin middleware"
//         })
//     }
// };
export const isRequestPending = async (req, res, next) => {
    try {
        // Use req.body.email or req.user.email based on your authentication logic
        const email = req.body.email;
        console.log(email);
        const user = await RegisterModel.findOne({ email: email });
        console.log(user)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        if (user.status === "Pending") {  // Ensure status is a string
            return res.status(401).send({
                success: false,
                message: "Your account opening request is under process"
            });
        }
        
        next();
    } catch (error) {
        console.error("Middleware Error:", error);
        console.log(error)
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error in admin middleware"
        });
    }
};
