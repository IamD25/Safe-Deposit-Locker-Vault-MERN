import userModel from "../models/userModel.js";
import userRequestModel from "../models/userRequestModel.js";
import RegisterModel from '../models/registrationRequestModel.js'
export const registerUserRequestController = async (req, res) => {
  try {
    console.log(req.body);

    const { userId, requestType, lockerSize, lockerType, lockerDimensions, userMessage } = req.body;


    if (!userId) {
      return res.send({ message: "User ID is Required" });
    }
    if (!requestType) {
      return res.send({ message: "Request Type is Required" });
    }
    if (!userMessage) {
      return res.send({ message: "Request reason is Required" });
    }

    //   Handle Locker Upgrade/Downgrade Requests
    if (requestType === "Locker-Upgrade" || requestType === "Locker-Downgrade") {
      if (!lockerSize) {
        return res.send({ message: "Locker size is Required" });
      }
      if (!lockerType) {
        return res.send({ message: "Locker Type is Required" });
      }
      if (!lockerDimensions) {
        return res.send({ message: "Locker Dimensions is Required" });
      }

      const request = await new userRequestModel({
        userId,
        requestType,
        lockerSize,
        lockerType,
        lockerDimensions,
        userMessage,
      }).save();

      return res.status(200).send({
        success: true,
        message: "User Request Submitted successfully",
        request,
      });
    }

    //   Handle Locker Cancel/Break Open Requests
    if (requestType === "Locker-Cancel" || requestType === "Break-Open") {
      const request = await new userRequestModel({
        userId,
        requestType,
        userMessage,
      }).save();

      return res.status(200).send({
        success: true,
        message: "User Request Submitted successfully",
        request,
      });
    }

    //   If request type is invalid
    return res.status(400).send({
      success: false,
      message: "Invalid request type",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Request submission",
      error,
    });
  }
};


//Get single user service request for user
export const userRequestDetailsController = async (req, res) => {
  const { id } = req.params;
  try {
    const requests = await userRequestModel.find({ userId: id });
    if (requests) {
      res.status(200).send({
        success: true,
        message: "User  Details Retrieved Successfully",
        requests,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error Retrieving user Details',
      error
    })
  };
};

export const userDetailsController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ userId: id });
    if (user) {
      res.status(200).send({
        success: true,
        message: "User Payment Details Retrieved Successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error Retrieving user Details',
      error
    })
  };
};

//get all user pending request 
export const userRequestPendingController = async (req, res) => {
  try {
    const users = await userRequestModel.find({ requestStatus: "Pending" });
    if (users) {
      res.status(200).send({
        success: true,
        message: "User Details Retrieved Successfully",
        users,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error Retrieving user Details',
      error
    })
  };
};

//Get Aproved Users requests
export const userRequestAprovedController = async (req, res) => {
  try {
    const users = await userRequestModel.find({ requestStatus: "Approved" });
    if (users) {
      res.status(200).send({
        success: true,
        message: "User Details Retrieved Successfully",
        users,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error Retrieving user Details',
      error
    })
  };
};

//Get Rejected Users requests
export const userRequestRejectedController = async (req, res) => {
  try {
    const users = await userRequestModel.find({ requestStatus: "Rejected" });
    if (users) {
      res.status(200).send({
        success: true,
        message: "User Details Retrieved Successfully",
        users,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error Retrieving user Details',
      error
    })
  };
};

//Get all Users requests Data
export const userRequestController = async (req, res) => {
  try {
    // const users = await userModel.find();
    const users = await userRequestModel.find({});
    if (users) {
      res.status(200).send({
        success: true,
        message: "User Details Retrieved Successfully",
        users,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error Retrieving user Details',
      error
    })
  };
};

//Pending user request to reject user request
export const userRequestRejectController = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userRequestModel.findByIdAndUpdate(id, { requestStatus: "Rejected" }, { new: true });
    if (user) {
      res.status(200).send({
        success: true,
        message: "User service request rejected successfully",
        user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error Rejecting user service request',
      error
    })
  }
};

//Get single user service request for admin
export const userRequestDetailController = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await userRequestModel.findById(id);
    if (request) {
      res.status(200).send({
        success: true,
        message: "User Service Request Details Fatched Successfully",
        request,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error User Service Request Rejecting',
      error
    })
  };
};

//Pending user request to reject user request
export const lockerCancleController = async (req, res) => {
  try {
    const id = req.params.id;
    const { adminMessage } = req.body;

    const user = await userRequestModel.findByIdAndUpdate(id, { requestStatus: "Approved", adminMessage: adminMessage }, { new: true });
    if (user) {
      res.status(200).send({
        success: true,
        message: "User service Request Approved Successfully",
        user
      });
    }
    // });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error Rejecting user service request',
      error
    })
  }
};

export const approvedController = async (req, res) => {
  try {
    const userId = req.params.UserId;
    console.log("UserId:", userId);
    const user = await RegisterModel.findOneAndUpdate({ userId: userId }, { status: "Cancle", lockerStatus: "Cancle" }, { new: true });
    if (user) {
      res.status(200).send({
        success: true,
        message: "User service Request Approved Successfully",
        user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error Approve service Request',
      error
    })


  };
}

//locker upgrade or downgrade 
export const lockerChange = async (req, res) => {

  const { userId, lockerSize, lockerType, lockerDimensions } = req.body;
  console.log(req.body)


  try {
    const request = await userModel.findOneAndUpdate({ userId: userId }, { lockerSize: lockerSize, lockerType: lockerType, lockerDimensions: lockerDimensions }, { new: true });
    if (request) {
      res.status(200).send({
        success: true,
        message: "User Payment Details Retrieved Successfully",
        request,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error Retrieving user Details',
      error
    })
  };
};

/**
 * @desc Upload User Photo
 * @route POST /api/v1/user/upload-photo/:id
 * @access Private
 */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadPhotoController = async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, "../uploads/user_photos");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const userId = req.params.id;
    console.log(userId);

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No photo uploaded" });
    }

    const photoPath = `/uploads/user_photos/${req.file.filename}`; // Save the path
    const user = await userModel.findOneAndUpdate({userId:userId}, { photo: photoPath }, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Photo uploaded successfully",
      photo: user.photo,
    });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ success: false, message: "Error uploading photo", error });
  }
};

// userAccessController
export const getUserPhoto = async (req,res) =>{
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
                    user:{
                      photo:user.photo,
                    },
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