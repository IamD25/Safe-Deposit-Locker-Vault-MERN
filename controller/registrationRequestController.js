import RegisterModel from '../models/registrationRequestModel.js';
import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from './../helper/authHelper.js';
import JWT from 'jsonwebtoken';
import multer from 'multer';

const upload = multer({dest: "uploads/"});

export const registerRequestController = async (req,res) => {
    try {
        const {name,email,password,phone,gender,dateOfBirth,address,city,state,pincode,lockerSize,lockerType,lockerDimensions,answer} = req.body.formData;
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
        const existingUser = await RegisterModel.findOne({email});
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
        const user = await new RegisterModel({name,email,password:hashedPassword,phone,gender,dateOfBirth,address,city,state,pincode,lockerSize,lockerType,lockerDimensions,answer}).save()
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
export const loginController2 = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:'Invalid Email and Password ',
            });
        }
        //check user
        const user = await RegisterModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not register'
            });
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(401).send({
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
                role:user.role,
            },
            token,
        })
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Login',
            error,
        });
    }
};

//forgetPasswordController
export const forgetPasswordController2 = async (req, res) =>{
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
        const user = await RegisterModel.findOne({email,answer});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found',
            })
        }
        const hashed = await hashPassword(newPassword);
        await RegisterModel.findByIdAndUpdate(user._id,{ password: hashed });
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

//Get all Users Data
export const getUserDetails = async (req, res) =>{
    try{
        // const users = await userModel.find();
        const users = await userModel.find({ lockerStatus: { $ne: "Admin" } }); 
        if(users){
            res.status(200).send({
                success:true,
                message:"User Details Retrieved Successfully",
                users,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error Retrieving user Details',
            error
        })
    };
};

//Get single User Data
export const getUserDataController = async (req,res) =>{
    try {
            const {id} = req.params;
            const user = await userModel.findById(id);
            if(user){
                res.status(200).send({
                    success:true,
                    message:"user Details Retrieved Successfully",
                    user,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message: 'Error while Retrieved user details',
                error,
            });
        }
}

//Get single User Data using userId
export const getUserIdDataController = async (req,res) =>{
    try {
            const {id} = req.params;
            const user = await userModel.findOne({userId:id});
            if (!user) {
                return res.status(200).send({
                  success: false,
                  message: "User not found",
                });
              }
            if(user){
                res.status(200).send({
                    success:true,
                    message:"user Details Retrieved Successfully",
                    user,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message: 'Error while Retrieved user details',
                error,
            });
        }
}

//Get single User Data for request
export const getReqUserDataController = async (req,res) =>{
    try {
            const {id} = req.params;
            const user = await RegisterModel.findById(id);
            if(user){
                res.status(200).send({
                    success:true,
                    message:"user Details Retrieved Successfully",
                    user,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message: 'Error while Retrieved user details',
                error,
            });
        }
}

//Update user Details
export const updateUserController = async (req,res) => {
    try {
        const {id} = req.params;
        const {name,phone,gender,dateOfBirth,address,city,state,pincode,lockerSize,lockerType,lockerDimensions,answer} = req.body.formData;
        //Validations
        if(!name){
            // return res.status(400).json({message:"Name is required"});
            return res.send({message:'Name is Required'});
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
        // const existingUser = await RegisterModel.findOne({email});
        //Exisiting user
        // if(existingUser){
        //     return res.status(200).send({
        //         success:false,
        //         message:"User already exists, Please login",
        //     });
        // }
        //register user
        // const hashedPassword = await hashPassword(password);
        //save
        const user = await userModel.findByIdAndUpdate(id,{name,phone,gender,dateOfBirth,address,city,state,pincode,lockerSize,lockerType,lockerDimensions,answer},{new:true})
        res.status(200).send({
            success:true,
            message:"User Details Updated successfully",
            user,
            });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in User Details Update',
            error
        })
    };
};

export const getuserSummary = async (req, res) => {
    try {
      const lockerSummary = await lockerModel.aggregate([
        {
          $group: {
            _id: null,
            totalLockers: { $sum: "$totalLockers" },
            assignedLockers: { $sum: "$assignedLockers" },
            availableLockers: { $sum: "$availableLockers" },
            maintenanceLockers: { $sum: "$maintenanceLockers" }
          }
        }
      ]);
  
      if (lockerSummary.length === 0) {
        return res.status(404).json({ message: "No lockers found" });
      }
  
      res.status(200).send({
        success:true,
        lockerSummary:lockerSummary[0],
    });
    } catch (error) {
      console.error("Error fetching locker summary:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };