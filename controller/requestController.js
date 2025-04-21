import RegisterModel from '../models/registrationRequestModel.js';
import userModel from '../models/userModel.js';
import UserModel from '../models/userModel.js'
//Get Pending Users Data
export const requestPendingController = async (req, res) =>{
    try{
        const users = await RegisterModel.find({status:"Pending"});
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

//Get Aproved Users Data
export const requestAprovedController = async (req, res) =>{
    try{
        const users = await userModel.find({status:"Approved"});
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

//Get Rejected Users Data
export const requestRejectedController = async (req, res) =>{
    try{
        const users = await RegisterModel.find({status:"Rejected"});
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

//Get all Users Data
export const requestController = async (req, res) =>{
    try{
        // const users = await userModel.find();
        const users = await RegisterModel.find({ status: { $ne: "Admin" } });
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

//Pending request to reject
export const rejectController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await RegisterModel.findByIdAndUpdate(id, { status: "Rejected" }, { new: true });
        if (user) {
            res.status(200).send({
                success: true,
                message: "User Rejected Successfully",
                user
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Rejecting user',
            error
        })
    }
};

//Pending Request to Approved
export const approveController = async (req, res) => {
    
            try {
                // console.log(req.body );
                const {name,email,password,accountNo,phone,gender,dateOfBirth,address,city,state,pincode,lockerSize,lockerType,lockerDimensions,userId,lockerNo,keyNo,startDate,renewDate,deposite,rent,entryFee,answer} = req.body.formData;
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
                // const hashedPassword = await hashPassword(password);
                //save
                const newUser = await new userModel({name,email,password,accountNo,userId,lockerNo,keyNo,startDate,renewDate,deposite,rent,entryFee,phone,gender,dateOfBirth,address,city,state,pincode,lockerSize,lockerType,lockerDimensions, lockerStatus:"Active",answer,status:"Approved"}).save()
                res.status(200).send({
                    success:true,
                    message:"User Register successfully",
                    newUser,
                    });
                    // const updateLockerDetails = await lockerDetailsModel.findOneAndUpdate(
                    //     { locker_size: lockerSize },
                    //     { $inc: { available_lockers: -1, assign_lockers: 1 } },
                    //     { new: true }
                    // );
            } catch (error) {
                console.log(error);
                res.status(500).send({
                    success:false,
                    message: 'Error in Registeration',
                    error
                })
            };
    
};

//approved Request

export const approvedController = async (req, res) =>{
    try {
        const id = req.params.id;
        const user = await RegisterModel.findByIdAndUpdate(id, { status: "Approved" }, { new: true });
            if (user) {
            res.status(200).send({
                success: true,
                message: "User Approved Successfully",
                user
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Approve user',
            error
        })
   
       
    };
}


//Rejected Request to Pending
export const pendingController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await RegisterModel.findByIdAndUpdate(id, { status: "Pending" }, { new: true });
        if (user) {
            res.status(200).send({
                success: true,
                message: "User Pending Successfully",
                user
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Pending user',
            error
        })
    }
};

