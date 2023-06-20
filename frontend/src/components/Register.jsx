import React, { useState } from "react";
import instance from "../axios";

import { toast } from "react-toastify";
import {
  Box,
  Flex,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  RadioGroup,
  Radio,
  Select,
  Button,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import validateRegistrationForm from "../Helpers/Validation";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    status: "",
    location: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  const [imageURL, setImageURL] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));

    const reader = new FileReader();
    reader.onload = () => {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegistrationForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.set("firstName", formData.firstName);
      formDataObj.set("lastName", formData.lastName);
      formDataObj.set("email", formData.email);
      formDataObj.set("mobile", formData.mobile);
      formDataObj.set("gender", formData.gender);
      formDataObj.set("status", formData.status);
      formDataObj.set("location", formData.location);
      formDataObj.append("image", formData.image);

      const response = await instance.post("/register", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("User registered successfully");

        setImageURL("");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          gender: "",
          status: "",
          location: "",
          image: null,
        });
        setErrors({});
      } else {
        toast.error("Failed to register user");
      }
    } catch (error) {
      console.log("Failed to connect to the server:", error);
    }
  };

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Center>
        <Box mb={3}>
          <h1>Register Your Details</h1>
        </Box>
      </Center>
      <Box borderWidth="1px" borderRadius="md" p={4} mt={8}>
        <Flex justify="flex-start">
          <Button
            as={Link}
            to="/"
            mb={4}
            colorScheme="custom"
            variant="solid"
            bg="brown"
            color="white"
          >
            ⇦
          </Button>
        </Flex>
        <Center>
          <Avatar
            size={"xl"}
            src={imageURL}
            alt={"Profile image"}
            mb={4}
            bg={useColorModeValue("gray.200", "gray.600")}
          />
        </Center>
        <Flex justifyContent="center">
          <form onSubmit={handleSubmit}>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              mb={4}
            >
              <Stack spacing={4} w={{ base: "100%", md: "50%" }}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleTextInputChange}
                  />
                  {errors.firstName && (
                    <Box color="red" fontSize="sm" mt={1}>
                      {errors.firstName}
                    </Box>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleTextInputChange}
                  />
                  {errors.email && (
                    <Box color="red" fontSize="sm" mt={1}>
                      {errors.email}
                    </Box>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    name="gender"
                    value={formData.gender}
                    onChange={handleGenderChange}
                  >
                    <Stack direction="row">
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                      <Radio value="other">Other</Radio>
                    </Stack>
                  </RadioGroup>
                  {errors.gender && (
                    <Box color="red" fontSize="sm" mt={1}>
                      {errors.gender}
                    </Box>
                  )}
                </FormControl>
                <FormControl pt={4}>
                  <FormLabel>Profile Photo</FormLabel>
                  <Input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {errors.image && (
                    <Box color="red" fontSize="sm" mt={1}>
                      {errors.image}
                    </Box>
                  )}
                </FormControl>
              </Stack>

              <Stack
                spacing={4}
                ml={{ base: 0, md: 5 }}
                w={{ base: "100%", md: "50%" }}
              >
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleTextInputChange}
                  />
                  {errors.lastName && (
                    <Box color="red" fontSize="sm" mt={1}>
                      {errors.lastName}
                    </Box>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Mobile</FormLabel>
                  <Input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleTextInputChange}
                  />
                  {errors.mobile && (
                    <Box color="red" fontSize="sm" mt={1}>
                      {errors.mobile}
                    </Box>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select
                    name="status"
                    placeholder="Select status"
                    value={formData.status}
                    onChange={handleTextInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                  {errors.status && (
                    <Box color="red" fontSize="sm" mt={1}>
                      {errors.status}
                    </Box>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    type="text"
                    name="location"
                    placeholder="Enter your location"
                    value={formData.location}
                    onChange={handleTextInputChange}
                  />
                  {errors.location && (
                    <Box color="red" fontSize="sm" mt={1}>
                      {errors.location}
                    </Box>
                  )}
                </FormControl>
              </Stack>
            </Flex>
            <Button
              type="submit"
              colorScheme="custom"
              variant="solid"
              bg="brown"
              color="white"
              isLoading={false}
              loadingText="Submitting"
            >
              Register
            </Button>
          </form>
        </Flex>
      </Box>
    </Box>
  );
};

export default Register;
