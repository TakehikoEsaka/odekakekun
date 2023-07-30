import Axios from "axios";

const instance = Axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT + "/api",
});

// console.log("base URL is", process.env.REACT_APP_API_ENDPOINT + "/api");
export default instance;
