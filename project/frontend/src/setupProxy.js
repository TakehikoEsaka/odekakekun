const { createProxyMiddleware } = require("http-proxy-middleware");

let targetURL;

if (process.env.REACT_APP_DEPLOYMENT_STAGE === "production") {
  targetURL = "http://service-discovery.odekakekun-network:80";
}

// docker-networkを利用している場合でもブラウザは名前解決が出来ないのでlocalhostでアクセスしておく
if (
  process.env.REACT_APP_DEPLOYMENT_STAGE === "development" ||
  process.env.REACT_APP_DEPLOYMENT_STAGE === "test"
) {
  targetURL = "http://odekakekun-backend-container";
}

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: targetURL,
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true,
    })
  );
};
