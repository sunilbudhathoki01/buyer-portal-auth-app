import Favourite from "../models/Favourite.js";

// Get favourites of logged-in user
export const getUserFavourites = async (userId) => {
  return await Favourite.find({ user: userId }).populate("property");
};

// Add favourite
export const addFavourite = async (userId, propertyId) => {
  const existing = await Favourite.findOne({
    user: userId,
    property: propertyId,
  });

  if (existing) {
    throw new Error("Already in favourites");
  }

  return await Favourite.create({
    user: userId,
    property: propertyId,
  });
};

// Remove favourite
export const removeFavourite = async (userId, propertyId) => {
  return await Favourite.findOneAndDelete({
    user: userId,
    property: propertyId,
  });
};
