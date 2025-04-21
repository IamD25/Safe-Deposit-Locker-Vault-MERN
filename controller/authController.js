import userModel from "../models/userModel.js";
import RegisterModel from '../models/registrationRequestModel.js';
import { comparePassword, hashPassword } from './../helper/authHelper.js';
import JWT from 'jsonwebtoken';


export const registerController = async (req,res) => {
    try {
        console.log(req.body.formData);
        const {name,email,password,phone,address,answer} = req.body.formData;
        //Validations
        if(!name){
            // return res.status(400).json({message:"Name is required"});
            return res.send({message:'Name is Required'});
        }
        if(!email){
            return res.send({message:'email is Required'});
        }
        if(!password){  
            return res.send({message:'Password is Required'});
        }
        if(!phone){
            return res.send({message:'Phone is Required'});
        }
        if(!address){
            return res.send({message:'Address is Required'});
        }
        if(!answer){
            return res.send({message:'Answer is Required'});
        }
        //Check user
        const existingUser = await userModel.findOne({email});
        //Exisiting user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"User already exists, Please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({name,email,password:hashedPassword,phone,address,answer}).save()
        res.status(200).send({
            success:true,
            message:"User Register successfully",
            user,
            });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Registeration',
            error
        })
    };
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid Email and Password ',
            });
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not register'
            });
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password',
            });
        }
        //generate token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:'Login Success',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                accountNo:user.accountNo,
                userId:user.userId,
                lockerNo:user.lockerNo,
                keyNo:user.keyNo,
                startDate:user.startDate,
                renewDate:user.renewDate,
                deposite:user.deposite,
                rent:user.rent,
                entryFee:user.entryFee,
                phone:user.phone,
                gender:user.gender,
                dateOfBirth:user.dateOfBirth,
                address:user.address,
                city:user.city,
                state:user.state,
                pincode:user.pincode,
                lockerSize:user.lockerSize,
                lockerType:user.lockerType,
                lockerDimensions:user.lockerDimensions,
                lockerStatus:user.lockerStatus,
                status:user.status,
                photo:user.photo,
                role:user.role 
            },
            token,
            
        })
        console.log(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Login',
            error
        })
    };
};

// Middleware to check if the user is already logged in
export const checkAlreadyLoggedIn = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (token) {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        if (decoded) {
          return res.status(200).send({
            success: false,
            message: "User is already logged in. Redirecting to homepage.",
          });
        }
      }
      next();
    } catch (error) {
      next();
    }
  };

//forgetPasswordController
export const forgetPasswordController = async (req, res) =>{
    try {
        const {email,answer,newPassword} = req.body;
        if(!email){
            res.status(400).send({message:"Email is required"});
        }
        if(!answer){
            res.status(400).send({message:"Answer is required"});
        }
        if(!newPassword){
            res.status(400).send({message:"New Password is required"});
        }
        //check
        const user = await userModel.findOne({email,answer});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found',
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{ password: hashed });
        res.status(200).send({
            success:true,
            message:'Password Reset Successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Something went wrong',
            error
        })
    }
}

//test Controller 
export const testController = (req, res) => {
    console.log("Protected Route");
    res.send("Protected Route")
};

// export {registerController};

// ✅ Check User Status Before Login
export const checkStatusController = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find user by email
      const user = await RegisterModel.findOne({ email: email });
  
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      // Return status of user
      res.status(200).send({
        success: true,
        status: user.status, // Return user status
      });
    } catch (error) {
      console.error("Error in checkStatusController:", error);
      res.status(500).send({
        success: false,
        message: "Error checking status",
        error: error.message,
      });
    }
  };
  