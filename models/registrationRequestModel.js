import mongoose from "mongoose";

const registrationRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userId:{Type: String}, 
  password: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  role: { type: Number,default: 0},
  lockerSize: { type: String},
  lockerType: { type: String},
  lockerDimensions: { type: String},
  lockerStatus:{type: String, require:true, enum: ['Active', 'Inactive',"Admin"], default: 'Inactive'},
  answer:{type:String,required:true,},
  status: { type: String, enum: ["Pending", "Approved", "Rejected","Admin"], default: "Pending" },
},{
  timestamps:true 
});

export default mongoose.model("Register", registrationRequestSchema);
