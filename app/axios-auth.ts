import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://sebapi.com/",
  timeout: 3000
});

export default axiosInstance;
