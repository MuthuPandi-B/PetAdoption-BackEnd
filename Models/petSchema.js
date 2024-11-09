import mongoose from "mongoose";
 const petSchema = new mongoose.Schema({
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
    petSize: {
        type: String,
        required: true  
    },
    petColor: {
        type: String,
        required: true
    },
    petGender: {
        type: String,
        required: true
    },
    petMedicalhistory: {
        type: String,
        required: true
    },  
 })
 export default mongoose.model("Pet", petSchema);