import Axios from "axios";

let baseURL;
const AlbEndpoint = process.env.REACT_APP_ELB_ENDPOINT;

if (process.env.REACT_APP_DEPLOYMENT_STAGE === "production") {
  baseURL = AlbEndpoint;
}

// docker-networkを利用している場合でもブラウザは名前解決が出来ないのでlocalhostでアクセスしておく
if (
  process.env.REACT_APP_DEPLOYMENT_STAGE === "development" ||
  process.env.REACT_APP_DEPLOYMENT_STAGE === "test"
) {
  baseURL = "http://localhost:3000/api";
}

baseURL = "http://localhost:3000";

const instance = Axios.create({
  baseURL: baseURL,
});

export default instance;
