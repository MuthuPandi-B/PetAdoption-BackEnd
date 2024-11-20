import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./Cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "PetAdoption",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "mp4"], // Ensure this is `allowed_formats`
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "video/mp4"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Invalid file type. Only JPG, PNG, GIF, and MP4 are allowed."));
    } else {
      cb(null, true);
    }
  },
});
export default upload;