import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        enum: ["manual", "add", "referral"],
        required: true,
    },
    status: {
        type: String,
        enum: ["new", "contacted", "closed"],
        default: "new",
    },
}, { timestamps: true });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;