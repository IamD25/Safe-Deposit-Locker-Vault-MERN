import paymentModel from '../models/paymentModel.js'

export const newPaymentController = async (req, res) => {
    try {
                const {userId,lockerNo,accountNo,rent,paymentDate,paymentStatus,dueDate,paymentMethod} = req.body;
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
                if(!rent){
                    return res.send({message:'Rent Amount  is Required'});
                }
                if(!paymentDate){
                    return res.send({message:'Payment Date  is Required'});
                }
                if(!paymentStatus){
                    return res.send({message:'Payment Status is Required'});
                }
                if(!dueDate){
                    return res.send({message:'Due Date is Required'});
                }
                if(!paymentMethod){
                    return res.send({message:'Payment Method is Required'});
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
                const result = await new paymentModel({userId,lockerNo,accountNo,rent,paymentDate,paymentStatus,dueDate,paymentMethod}).save();
                res.status(200).send({
                    success:true,
                    message:"Rent Payment Details Added successfully",
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
}

export const paymentDetailsController = async (req, res) =>{
    try{
        const payments = await paymentModel.find({});
        if(payments){
            res.status(200).send({
                success:true,
                message:"User Payment Details Retrieved Successfully",
                payments,
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

export const todayPaymentDetailsController = async (req, res) => {
  try {
    // Get today's date in 'YYYY-MM-DD' format
    const todayDate = moment().format("YYYY-MM-DD");

    // Find payments where paymentDate is today's date
    const payments = await paymentModel.find({
      paymentDate: {
        $gte: new Date(todayDate + "T00:00:00.000Z"),
        $lte: new Date(todayDate + "T23:59:59.999Z"),
      },
    });

    // Check if payments exist
    if (payments.length > 0) {
      res.status(200).send({
        success: true,
        message: "Today's Payment Details Retrieved Successfully",
        payments,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No payments found for today",
      });
    }
  } catch (error) {
    console.error("Error retrieving today's payment details:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving today's payment details",
      error,
    });
  }
};


export const userPaymentDetailsController = async (req, res) =>{
  const {id} = req.params;
  try{
    const payments = await paymentModel.find({userId:id});
      if(payments){
          res.status(200).send({
              success:true,
              message:"User Payment Details Retrieved Successfully",
              payments,
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