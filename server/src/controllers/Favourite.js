import {
  addFavourite,
  getUserFavourites,
  removeFavourite,
} from "../services/Favourite.js";

export const getFavourites = async (req, res) => {
  try {
    const favourites = await getUserFavourites(req.user.id);

    res.status(200).json({
      success: true,
      data: favourites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch favourites",
    });
  }
};

export const addToFavourites = async (req, res) => {
  try {
    const fav = await addFavourite(req.user.id, req.params.propertyId);

    res.status(201).json({
      success: true,
      data: fav,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /favourites/:propertyId
export const removeFromFavourites = async (req, res) => {
  try {
    await removeFavourite(req.user.id, req.params.propertyId);

    res.status(200).json({
      success: true,
      message: "Removed from favourites",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove favourite",
    });
  }
};
