import { de } from "@faker-js/faker";
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  requestId:{type: String },
  accountNo:{ type: Number, required: true },
  userId:{type: String, required: true }, 
  lockerNo:{type:Number, required: true },
  keyNo:{type:Number, required: true },
  startDate:{type: Date, required: true }, 
  renewDate:{type: Date, required: true }, 
  deposite:{type:Number, required: true },
  rent:{type:Number, required: true },
  entryFee:{type:Number, required: true },
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
  lockerStatus:{type: String, require:true, enum: ['Active', 'Inactive',"Cancel","Admin"], default: 'Inactive'},
  answer:{type:String,required:true,},
  status: { type: String, enum: ["Pending", "Approved", "Rejected","Admin"], default: "Pending" },
  photo: { type: String, default: "uploads/default.jpg", },
},{
    timestamps:true 
});

export default mongoose.model("User",usersSchema);

// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true, trim: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
//     password: { type: String, required: true, minlength: 6 },
//     contact: { type: String, required: true, match: /^[0-9]{10}$/ },
//     gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
//     dob: { type: Date, required: true },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true, match: /^[0-9]{6}$/ },
//     role: { type: String, enum: ['Admin', 'User'], default: 'User' },
//     status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
// }, { timestamps: true });
// const User = mongoose.model('User', UserSchema);

// module.exports = { User, Locker, LockerAccess, Payment };

