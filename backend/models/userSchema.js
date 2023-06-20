    const mongoose = require("mongoose");

    const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        required: true,
    },
    image: {
        url: String,
        filename: String,
    },
    location: {
        type: String,
    },
    });

    const User = mongoose.model("User", userSchema);

    module.exports = User;
