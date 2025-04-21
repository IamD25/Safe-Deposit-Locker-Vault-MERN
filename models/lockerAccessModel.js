import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    lockerNo: { type: Number, ref: 'User', required: true },
    accountNo:{ type: Number, ref: 'User', required: true },
    accessDate: { type: Date, required: true },
    openTime: { type: Date, required: true },
    closeTime: { type: Date, required: true }
});

export default mongoose.model('LockerAccess', TransactionSchema);

// const LockerAccessSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     lockerNo: { type: String, required: true },
//     accessDate: { type: Date, required: true },
//     inTime: { type: String, required: true },
//     outTime: { type: String, required: true }
// }, { timestamps: true });

// const LockerAccess = mongoose.model('LockerAccess', LockerAccessSchema);