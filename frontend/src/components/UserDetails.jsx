import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Avatar, Button, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import instance from "../axios";

const UserDetails = () => {
  const [user, setUser] = useState({});
  const { state } = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await instance.get(`/users/${state}`);
        setUser(response.data);
      } catch (error) {
        console.log("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [state]);

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Heading as="h2" mb={4} textAlign="center" fontSize="xl">
        User Details
      </Heading>
      <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="md" bg="white">
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
            ← Go Back
          </Button>
        </Flex>
        <Avatar
          size="xl"
          src={user.image?.url}
          alt="Profile image"
          mx="auto"
          mb={4}
        />
        <Box textAlign="center">
          <Text fontWeight="bold">
            {user.firstName} {user.lastName}
          </Text>
          <Text color="gray.500">{user.email}</Text>
        </Box>
        <Box mt={6}>
          <Text>
            <strong>Mobile:</strong> {user.mobile}
          </Text>
          <Text>
            <strong>Gender:</strong> {user.gender}
          </Text>
          <Text>
            <strong>Status:</strong> {user.status}
          </Text>
          <Text>
            <strong>Location:</strong> {user.location}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetails;
