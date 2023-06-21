const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);

    console.error("Error reason:", error.reason);
    console.error("Error code:", error.code);
  });
