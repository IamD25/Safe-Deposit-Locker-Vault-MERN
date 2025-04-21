import mongoose from "mongoose";


const userRequestSchema = new mongoose.Schema({
  userId:{type: String, required: true },
  requestType:{type: String, required: true },

  lockerSize: { type: String},
  lockerType: { type: String},
  lockerDimensions: { type: String},
  requestStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending"},
  userMessage:{ type: String},
  adminMessage:{ type: String},
},{
  timestamps:true,
});

export default mongoose.model("UserRequest", userRequestSchema);
