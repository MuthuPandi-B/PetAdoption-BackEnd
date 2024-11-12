import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
   
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reported: {
        type: Boolean,
        default: false
    },
    
});
export default mongoose.model("Review", reviewSchema);