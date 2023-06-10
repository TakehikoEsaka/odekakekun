import Axios from "axios";

let baseURL;

if (process.env.REACT_APP_DEPLOYMENT_STAGE === "production") {
  baseURL =
    "http://internet-alb-532786072.ap-northeast-1.elb.amazonaws.com/api";
}

// docker-networkを利用している場合でもブラウザは名前解決が出来ないのでlocalhostでアクセスしておく
if (
  process.env.REACT_APP_DEPLOYMENT_STAGE === "development" ||
  process.env.REACT_APP_DEPLOYMENT_STAGE === "test"
) {
  baseURL = "http://localhost:3000/api";
}

const instance = Axios.create({
  baseURL: "http://localhost:3000/api",
});

export default instance;
