import cloudinary from "../config/cloudinary.js";
import Property from "../models/property.js";

// Get all properties
export const getAllProperties = async () => {
  return await Property.find().sort({ createdAt: -1 });
};

// upload image to cloudinary
export const uploadImageToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "properties" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(fileBuffer);
  });
};

// addProperty
export const addProperty = ({ title, location, price, imageUrl, userId }) => {
  return Property.create({
    title,
    location,
    price,
    image: imageUrl,
    user: userId,
  });
};
