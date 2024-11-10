import mongoose from "mongoose";
import Application from "../Models/applicationSchema.js";
import sendEmail from "../Utils/emailService.js";
import User from "../Models/userSchema.js";
export const createApplication = async (req, res) => {
    const { petName, petBreed, petAge, petGender, petDescription } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    try {
        const application = new Application({
            petName,
            petBreed,
            petAge,
            petGender,
            petDescription,
            creator:userId,
}
        );
        console.log("application:",application.creator);
        await application.save();
        res.status(200).json({ message: "Application submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });    
    }
};

export const editApplication = async (req, res) => {
    const { id } = req.params;
    const { petName, petBreed, petAge, petGender, petDescription } = req.body;
    try {
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        application.petName = petName;
        application.petBreed = petBreed;
        application.petAge = petAge;
        application.petGender = petGender;
        application.petDescription = petDescription;
     
        await application.save();
        res.status(200).json({ message: "Application updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const approveApplication = async (req, res) => {
    const { id } = req.params;
    try {
        
        const application = await Application.findById(id);
        if (!application) {
            console.log("application not fount:",id);
            
            return res.status(404).json({ message: "Application not found" });
        }
     console.log("found:",application);
     if(!application.creator){
        console.log("creator not found:");
        return res.status(404).json({ message: "Creator not found" });
     }
        console.log("creator found:",application.creator);
        
     
        const user = await User.findById(application.creator).select("email");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
       console.log("user found:",user);
       
        
        application.status = "Approved";
        await application.save();
        await sendEmail(
          user.email,
         
            "Application Approved",
            "Your application has been approved."
        )
        res.status(200).json({ message: "Application approved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const rejectApplication = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        application.status = "Rejected";
        await application.save();
        await sendEmail(
            email,
            "Application Rejected",
            "Your application has been rejected."
        )
        res.status(200).json({ message: "Application rejected successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteApplication = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findByIdAndDelete(id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


