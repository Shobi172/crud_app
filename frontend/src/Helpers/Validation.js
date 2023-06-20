const validateRegistrationForm = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "First Name is required";
  } else if (!/^[A-Za-z]+$/.test(values.firstName)) {
    errors.firstName = "First Name should only contain alphabets";
  }

  if (!values.lastName) {
    errors.lastName = "Last Name is required";
  } else if (!/^[A-Za-z]+$/.test(values.lastName)) {
    errors.lastName = "Last Name should only contain alphabets";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.mobile) {
    errors.mobile = "Mobile is required";
  } else if (!/^[0-9]{10}$/.test(values.mobile)) {
    errors.mobile = "Mobile number should be a valid 10-digit number";
  }

  if (!values.gender) {
    errors.gender = "Gender is required";
  } else if (!["male", "female", "other"].includes(values.gender)) {
    errors.gender = "Invalid gender";
  }

  if (!values.status) {
    errors.status = "Status is required";
  } else if (!["active", "inactive"].includes(values.status)) {
    errors.status = "Invalid status";
  }

  if (!values.image) {
    errors.image = "Invalid image data";
  }

  if (!values.location) {
    errors.location = "Location is required";
  }

  return errors;
};

module.exports = validateRegistrationForm;
