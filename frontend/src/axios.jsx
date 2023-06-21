import axios from "axios";

const instance = axios.create({
  baseURL: "https://crud-app-suzz.onrender.com",
});

export default instance;