import { loginUser, registerUser } from "../services/authService.js";

export const registeruserController = async (req, res) => {
  try {
    const data = req.body;
    const result = await registerUser(data);
    res.status(201).json({
      data: result,
      message: "User Registration successfull",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const data = req.body;
    const result = await loginUser(data);
    res.status(200).json({
      data: result,
      message: "login successfull",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
