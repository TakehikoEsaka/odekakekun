import Axios from "axios";

let baseURL;

if (process.env.REACT_APP_DEPLOYMENT_STAGE === "production") {
  baseURL = "http://service-discovery.odekakekun-network:80";
}

// docker-networkを利用している場合でもブラウザは名前解決が出来ないのでlocalhostでアクセスしておく
if (
  process.env.REACT_APP_DEPLOYMENT_STAGE === "development" ||
  process.env.REACT_APP_DEPLOYMENT_STAGE === "test"
) {
  baseURL = "http://localhost:8080";
}

const instance = Axios.create({
  baseURL: baseURL,
});

export default instance;
