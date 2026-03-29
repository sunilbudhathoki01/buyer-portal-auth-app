import Property from "../models/property.js";

// Get all properties
export const getAllProperties = async () => {
  return await Property.find().sort({ createdAt: -1 });
};
