// customer.schema.ts
import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    notes: { type: String, default: '' },
    transactionHistory: [{
        date: { type: Date, default: Date.now },
        details: { type: String }
    }]
});
