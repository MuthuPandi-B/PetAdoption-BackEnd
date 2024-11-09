import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
    petName: {
        type: String,
        required: true
    },
    petBread:{
        type: String,
        required: true
    },
    petAge: {
        type: Number,
        required: true
    },
    petGender: {
        type: String,
        required: true
    },
    petDescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      
      
    },

    
    });
    export default mongoose.model("Application", applicationSchema);


