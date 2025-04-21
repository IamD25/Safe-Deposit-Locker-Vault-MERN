import lockerAccessModel from '../models/lockerAccessModel.js';
// import lockerAccess from '../models/lockerAccessModel.js'

export const newLockerAccessController = async (req, res) => {
    try {

            const {userId,lockerNo,accountNo,accessDate,openTime,closeTime} = req.body;
            //Validation
            if(!userId){
                return res.send({message:'User Id is Required'});
            }
            if(!lockerNo){
                return res.send({message:'Locker number is Required'});
            }
            if(!accountNo){
                return res.send({message:'Account Number is Required'});
            }
            if(!accessDate){
                return res.send({message:'Access Date is Required'});
            }
            if(!openTime){
                return res.send({message:'Open Time is Required'});
            }
            if(!closeTime){
                return res.send({message:'Close Time is Required'});
            }
            //Checking Locker
            // const locker = await lockerAccessModel.findOne({ lockerSize:lockerSize });
            // if(locker){
            //     return res.status(200).send({
            //         success:false,
            //         message:"Locker already exists",
            //     });
            // }
            //save
            const openTimeDate = new Date(`${accessDate}T${openTime}:00.000Z`);
            const closeTimeDate = new Date(`${accessDate}T${closeTime}:00.000Z`);
            const result = await new lockerAccessModel({userId,lockerNo,accountNo,accessDate,openTime:openTimeDate,closeTime:closeTimeDate}).save();
            res.status(200).send({
                success:true,
                message:"Locker Access Details Added successfully",
                result,
                });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message: 'Something went wrong API',
                error
            });
        };
};

export const lockerAccessDetailsController = async (req, res) =>{
    try{
        const access = await lockerAccessModel.find({});
        if(access){
            res.status(200).send({
                success:true,
                message:"User Locker Access Details Retrieved Successfully",
                access,
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


import moment from "moment";


export const todayLockerAccessDetailsController = async (req, res) => {
  try {
    const startOfDay = moment().startOf("day").toDate(); // 00:00:00
    const endOfDay = moment().endOf("day").toDate(); // 23:59:59

    const access = await lockerAccessModel.find({
      accessDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // Return 200 status even if no access is found
    if (access.length > 0) {
      res.status(200).send({
        success: true,
        message: "Today's Locker Access Details Retrieved Successfully",
        access,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No Locker Access found for today",
      });
    }
  } catch (error) {
    console.error("Error retrieving today's Locker Access details:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving today's Locker Access details",
      error: error.message,
    });
  }
};


export const userLockerAccessDetailsController = async (req, res) =>{
  const {id} = req.params;
  try{
      const access = await lockerAccessModel.find({userId:id});
      if(access){
          res.status(200).send({
              success:true,
              message:"User Locker Access Details Retrieved Successfully",
              access,
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


export const userAccessController = async (req, res) =>{
  const {id} = req.params;
  try{
      const access = await lockerAccessModel.findOne({userId:id});
      if(access){
          res.status(200).send({
              success:true,
              message:"User Locker Access Details Retrieved Successfully",
              access,
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