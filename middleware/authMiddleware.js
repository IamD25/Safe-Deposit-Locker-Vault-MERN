import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';
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
        const user = await userModel.findById(req.user._id);
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


// Middleware to check if token is expired and auto logout
export const checkTokenExpiry = async (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token missing. Please login again.",
      });
    }
  
    try {
      // Decode the token without verifying to check the expiry
      const decodedToken = JWT.decode(token);
  
      // Check if the token is expired
      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        return res.status(401).send({
          success: false,
          message: "Session expired. Please log in again.",
        });
      }
  
      next(); // Proceed if token is valid
    } catch (error) {
      console.error("Error in token expiry check:", error);
      return res.status(401).send({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }
  };
  

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
  
          if (user.status === "Cancel") {  // Ensure status is a string
              return res.status(401).send({
                  success: false,
                  message: "Your account has been Cancel or Closed by the User"
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
  