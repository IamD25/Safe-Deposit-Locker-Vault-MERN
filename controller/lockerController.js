import lockerModel from '../models/lockerModel.js'

//newLockerController || POST
export const newLockerController = async (req, res) => {
    try {
        const {lockerSize,lockerPrice,availableLockers,assignedLockers,maintenanceLockers,totalLockers} = req.body;
        //Validation
        if(!lockerSize){
            return res.send({message:'Locker Size is Required'});
        }
        if(!lockerPrice){
            return res.send({message:'Locker Price is Required'});
        }
        if(!availableLockers){
            return res.send({message:'Available Lockers is Required'});
        }
        if(!assignedLockers){
            return res.send({message:'Assigned Lockers is Required'});
        }
        if(!maintenanceLockers){
            return res.send({message:'Maintenance Lockers is Required'});
        }
        if(!totalLockers){
            return res.send({message:'Total Lockers is Required'});
        }
        //Checking Locker
        const locker = await lockerModel.findOne({ lockerSize:lockerSize });
        if(locker){
            return res.status(200).send({
                success:false,
                message:"Locker already exists",
            });
        }
        //save
        const result = await new lockerModel({lockerSize,lockerPrice,availableLockers,assignedLockers,maintenanceLockers,totalLockers}).save();
        res.status(200).send({
            success:true,
            message:"Locker Added successfully",
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

//Get Lockers Details || GET

export const getLockerDetails = async (req, res) =>{
    try{
        const locker = await lockerModel.find();
        if(locker){
            res.status(200).send({
                success:true,
                message:"Lockers Details Retrieved Successfully",
                locker,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Login',
            error
        })
    };
};

//Update Locker Details
export const updateLockerController = async (req, res) => {
    try {
        const {id} = req.params;
        const {lockerSize,lockerPrice,availableLockers,assignedLockers,maintenanceLockers,totalLockers} = req.body;
        //Validation
        if(!lockerSize){
            return res.send({message:'Locker Size is Required'});
        }
        if(!lockerPrice){
            return res.send({message:'Locker Price is Required'});
        }
        if(!availableLockers){
            return res.send({message:'Available Lockers is Required'});
        }
        if(!assignedLockers){
            return res.send({message:'Assigned Lockers is Required'});
        }
        if(!maintenanceLockers){
            return res.send({message:'Maintenance Lockers is Required'});
        }
        if(!totalLockers){
            return res.send({message:'Total Lockers is Required'});
        }
        // Checking Locker
        // const checklocker = await lockerModel.findOne({ lockerSize:lockerSize });
        // if(checklocker){
        //     return res.status(200).send({
        //         success:false,
        //         message:"Locker already exists",
        //     });
        // }
        //save
        const locker = await lockerModel.findByIdAndUpdate(id,{
            lockerSize,
            lockerPrice,
            availableLockers,
            assignedLockers,
            maintenanceLockers,
            totalLockers
        },{new:true});
        res.status(200).send({
            success:true,
            message:"Locker details Updated successfully",
            locker,
            });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error while updating category',
            error,
        });
    }
}

//single locker detailss
export const getSingleLockerController = async (req, res) => {
    try {
        const {id} = req.params;
        const locker = await lockerModel.findById(id);
        if(locker){
            res.status(200).send({
                success:true,
                message:"Lockers Details Retrieved Successfully",
                locker,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error while Retrieved locker details',
            error,
        });
    }
}

//Delete lockers
export const deleteLockerController = async (req, res) => {
    try {
      const { id } = req.params;
      const locker = await lockerModel.findById(id);
  
      if (!locker) {
        return res.status(404).json({ success: false, message: "Locker not found" });
      }
  
      await lockerModel.findByIdAndDelete(id);
  
      return res.status(200).json({ success: true, message: "Locker deleted successfully" });
    } catch (error) {
      console.error("Error deleting locker:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

// import Locker from "../models/lockerModel.js";

// // Create a new locker category
// export const createLockerCategory = async (req, res) => {
//   try {
//     const { sizeCategory, lockers } = req.body;

//     // Validate required fields
//     if (!sizeCategory || !Array.isArray(lockers) || lockers.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid locker data" });
//     }

//     // Check if category already exists
//     const existingCategory = await Locker.findOne({ sizeCategory });
//     if (existingCategory) {
//       return res.status(400).json({ success: false, message: "Locker category already exists" });
//     }

//     const newLockerCategory = new Locker({ sizeCategory, lockers });
//     await newLockerCategory.save();

//     res.status(201).json({ success: true, message: "Locker category created successfully", data: newLockerCategory });
//   } catch (error) {
//     console.error("Error creating locker category:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// // Get all locker categories
// export const getLockerCategories = async (req, res) => {
//   try {
//     const lockerCategories = await Locker.find();
//     res.status(200).json({ success: true, data: lockerCategories });
//   } catch (error) {
//     console.error("Error fetching lockers:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// // Get a single locker category by ID
// export const getLockerCategoryById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const lockerCategory = await Locker.findById(id);

//     if (!lockerCategory) {
//       return res.status(404).json({ success: false, message: "Locker category not found" });
//     }

//     res.status(200).json({ success: true, data: lockerCategory });
//   } catch (error) {
//     console.error("Error fetching locker category:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// // Update a locker category
// export const updateLockerCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { sizeCategory, lockers } = req.body;

//     if (!sizeCategory || !Array.isArray(lockers) || lockers.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid locker data" });
//     }

//     const updatedCategory = await Locker.findByIdAndUpdate(
//       id,
//       { sizeCategory, lockers },
//       { new: true }
//     );

//     if (!updatedCategory) {
//       return res.status(404).json({ success: false, message: "Locker category not found" });
//     }

//     res.status(200).json({ success: true, message: "Locker category updated successfully", data: updatedCategory });
//   } catch (error) {
//     console.error("Error updating locker category:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// // Delete a locker category
// export const deleteLockerCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedCategory = await Locker.findByIdAndDelete(id);

//     if (!deletedCategory) {
//       return res.status(404).json({ success: false, message: "Locker category not found" });
//     }

//     res.status(200).json({ success: true, message: "Locker category deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting locker category:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

export const getLockerSummary = async (req, res) => {
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