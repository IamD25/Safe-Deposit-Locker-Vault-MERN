import mongoose from 'mongoose';

// const LockerSchema = new mongoose.Schema({
//     locker_size: { type: String, required: true },
//     locker_price: { type: Number, required: true },
//     status: { type: String, enum: ['Available', 'Assigned', 'Maintenance'], default: 'Available' },
//     assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
// });

// module.exports = mongoose.model('Locker', LockerSchema);

const LockerSchema = new mongoose.Schema({
    lockerSize: { type: String, required: true, unique:true},
    lockerPrice: { type: Number, required: true },
    availableLockers: { type: Number, required: true, min: 0 },
    assignedLockers: { type: Number, required: true, min: 0 },
    maintenanceLockers: { type: Number, required: true, min: 0 },
    totalLockers: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export default mongoose.model('Locker', LockerSchema);



// const lockerSchema = new mongoose.Schema({
//     sizeCategory: { type: String, required: true }, // Small, Medium, Large
//     lockers: [
//         {
//             type: { type: String, required: true }, // A, B, C
//             dimensions: { type: String, required: true }, // 05X07X21
//             rentPerDay: { type: Number, required: true },
//             rentAnnually: { type: String, required: true }, // String format
//             securityDeposit: { type: Number, required: true },
//             totalAmount: { type: Number, required: true },
//             availableLockers: { type: Number, default: 0 },
//             assignedLockers: { type: Number, default: 0 },
//             maintenanceLockers: { type: Number, default: 0 },
//             totalLockers: { type: Number, required: true }
//         }
//     ]
// });

// const Locker = mongoose.model("Locker", lockerSchema);
// export default Locker;
