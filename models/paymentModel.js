import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    accountNo:{ type:Number,ref: 'User', required: true },
    lockerNo:{type:Number, ref: 'User', required: true },
    rent: { type: Number, required: true },
    paymentDate:{type:Date, require:true},
    dueDate: { type: Date, required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
    paymentMethod: { type: String }
});

export default mongoose.model('Payment', PaymentSchema);

// const PaymentSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     amount: { type: Number, required: true, min: 0 },
//     paymentDate: { type: Date, required: true },
//     dueDate: { type: Date, required: true },
//     paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Overdue'], required: true },
//     paymentMethod: { type: String, enum: ['Cash', 'Credit Card', 'UPI', 'Net Banking'], required: true }
// }, { timestamps: true });

// const Payment = mongoose.model('Payment', PaymentSchema);