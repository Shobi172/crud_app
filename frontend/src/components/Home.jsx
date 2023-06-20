import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  // useColorModeValue,
} from "@chakra-ui/react";
import { FiMoreVertical, FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import instance from "../axios";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const DeleteUserDialog = ({ isOpen, onClose, onDelete }) => {
  const cancelRef = React.useRef();

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete User
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this user?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

const Home = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setUserNotFound(users.length === 0);
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await instance.get("/");
      setUsers(response.data);
    } catch (error) {
      console.log("Failed to fetch users:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchUsers();
    } else {
      const filteredUsers = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleView = (id) => {
    navigate(`/users/${id}`, { state: id });
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`, { state: id });
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/users/${id}`);
      toast.success("User Deleted Successfully");
      fetchUsers();
    } catch (error) {
      console.log("Failed to delete user:", error);
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteDialogOpen(true);
    setSelectedUserId(id);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedUserId("");
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const pageCount = Math.ceil(users.length / perPage);
  const paginatedUsers = users.slice(offset, offset + perPage);

  const handleExportToCsv = () => {
    // Convert users data to CSV form at
    const csvData = users
      .map((user, index) => {
        return [
          index + 1,
          `${user.firstName} ${user.lastName}`,
          user.email,
          user.gender,
          user.status,
        ].join(",");
      })
      .join("\n");

    // Create a new Blob object with the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    // Create a temporary download link
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "users.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await instance.put(`/users/${id}`, { status: newStatus });
      toast.success("Status Updated Successfully");
      fetchUsers();
    } catch (error) {
      console.log("Failed to update status:", error);
    }
  };


  return (
    <Box p={4} maxWidth={1200} mx="auto">
      <Flex justify="space-between" mb={4}>
        <Flex>
          <Input
            mr={2}
            type="search"
            placeholder="Search by name"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            colorScheme="custom"
            variant="solid"
            bg="brown"
            color="white"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>
        <Flex>
          <Button
            as={Link}
            to="/register"
            colorScheme="custom"
            variant="solid"
            bg="brown"
            color="white"
            mr={2}
          >
            + Add User
          </Button>
          <Button
            colorScheme="custom"
            variant="solid"
            bg="brown"
            color="white"
            onClick={handleExportToCsv}
          >
            Export to Csv
          </Button>
        </Flex>
      </Flex>
      <Box borderWidth="1px" borderRadius="md" p={4} mt={4}>
        {userNotFound ? (
          <p>No users found.</p>
        ) : (
          <>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Full Name</Th>
                  <Th>Email</Th>
                  <Th>Gender</Th>
                  <Th>Status</Th>
                  <Th>Profile</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user, index) => (
                  <Tr key={user._id}>
                    <Td>{index + 1}</Td>
                    <Td>{`${user.firstName} ${user.lastName}`}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.gender}</Td>
                    <Td>
                      <Select
                        size="sm"
                        colorScheme="custom"
                        variant="solid"
                        bg="brown"
                        color="white"
                        value={user.status}
                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Select>
                    </Td>
                    <Td>
                      <Avatar
                        size={"sm"}
                        src={user.image?.url}
                        alt={"Profile image"}
                        mb={4}
                        // bg={useColorModeValue("gray.200", "gray.600")}
                      />
                    </Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          as={Button}
                          variant="ghost"
                          size="sm"
                          rightIcon={<FiMoreVertical />}
                        />
                        <MenuList>
                          <MenuItem
                            onClick={() => handleView(user._id)}
                            icon={<FiEye />}
                          >
                            View
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleEdit(user._id)}
                            icon={<FiEdit />}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => openDeleteDialog(user._id)}
                            icon={<FiTrash />}
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <DeleteUserDialog
              isOpen={deleteDialogOpen}
              onClose={closeDeleteDialog}
              onDelete={() => handleDelete(selectedUserId)}
            />
            <Box mt={4}>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
