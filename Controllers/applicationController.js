import mongoose from "mongoose";
import Application from "../Models/applicationSchema.js";
import sendEmail from "../Utils/emailService.js";
import User from "../Models/userSchema.js";
export const createApplication = async (req, res) => {
    const { petName, petBread, petAge, petGender, petDescription } = req.body;
    try {
        const application = new Application({
            petName,
            petBread,
            petAge,
            petGender,
            petDescription,
            creator,
}
        );
        await application.save();
        res.status(200).json({ message: "Application submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });    
    }
};

export const editApplication = async (req, res) => {
    const { id } = req.params;
    const { petName, petBread, petAge, petGender, petDescription } = req.body;
    try {
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        application.petName = petName;
        application.petBread = petBread;
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
            return res.status(404).json({ message: "Application not found" });
        }
        console.log(application);
        const appcreator = await User.findById(application.creator).select("email");
        if (!appcreator) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(appcreator);
        
        application.status = "Approved";
        await application.save();
        await sendEmail(
          appcreator.email,
           console.log(user.email),
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


