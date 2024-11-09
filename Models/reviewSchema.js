import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    review: {
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
    
})
export default mongoose.model("Review", reviewSchema);