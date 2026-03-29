import { getAllProperties } from "../services/Property.js";

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
