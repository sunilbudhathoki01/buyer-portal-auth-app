import {
  getAllProperties,
  uploadImageToCloudinary,
} from "../services/Property.js";
import { addProperty } from "../services/Property.js";
// GET /properties
export const getProperties = async (req, res) => {
  try {
    const properties = await getAllProperties();
    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

export const addPropertyController = async (req, res) => {
  try {
    const { title, location, price } = req.body;
    let imageUrl = "";
    if (req.file) {
      const result = uploadImageToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }
    const newProperty = addProperty({
      title,
      location,
      price,
      image: imageUrl,
      userId: req.user.id,
    });
    res
      .status(201)
      .json({ success: true, message: "property added successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
