const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });


router.post('/register', upload.single("image"), userController.registerUser);
router.get('/', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.get('/edit/:id', userController.getProfile);
router.post('/edit/:id', upload.single("image"), userController.editUser);
router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id', userController.statusChange);


module.exports = router;