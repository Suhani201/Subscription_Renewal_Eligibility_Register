const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
    {
        subscriberName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        subscriptionType: {
            type: String,
            required: true,
            trim: true
        },

        startDate: {
            type: Date,
            required: true
        },

        expiryDate: {
            type: Date,
            required: true
        },

        paymentStatus: {
            type: String,
            enum: ["Paid", "Unpaid"],
            required: true
        },

        subscriptionStatus: {
            type: String,
            enum: ["Active", "Inactive"],
            required: true
        },

        eligibilityStatus: {
            type: String,
            enum: ["Eligible", "Not Eligible", "Needs Correction"],
            default: "Needs Correction"
        },

        eligibilityReason: {
            type: String,
            default: "Eligibility has not been checked yet."
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);