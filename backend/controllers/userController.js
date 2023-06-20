const User = require("../models/userSchema");

const registerUser = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        mobile,
        gender,
        status,
        location,
      } = req.body;
  

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User with the same email already exists" });
      }
  
      const user = new User({
        firstName,
        lastName,
        email,
        mobile,
        gender,
        status,
        image: {
          url: req?.file?.path,
          filename: req?.file?.filename,
        },
        location,
      });
  
      await user.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log("Error during registration:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
};
  


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log("Failed to fetch users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};


const getUser =  async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};


const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await User.findById(userId);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



  
const editUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const userData = {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      mobile: req?.body?.mobile,
      gender: req?.body?.gender,
      status: req?.body?.status,
      location: req?.body?.location,
      image: {
        url: req?.file?.path, 
        filename: req?.file?.filename,
      },
    };



    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      userData,
      { new: true }
    );
  

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const statusChange = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.log('Failed to update user status:', error);
    res.status(500).json({ error: 'Failed to update user status' });
  }
};





module.exports = {
  registerUser,
  getAllUsers,
  getUser,
  editUser,
  getProfile,
  deleteUser,
  statusChange
  };
  