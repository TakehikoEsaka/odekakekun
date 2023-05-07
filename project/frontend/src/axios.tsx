import Axios from "axios";
const instance = Axios.create({
  baseURL: "http://localhost:80",
});

export default instance;
