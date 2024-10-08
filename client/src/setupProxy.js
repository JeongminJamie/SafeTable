import { createProxyMiddleware } from "http-proxy-middleware";

const setupProxy = (app) => {
  app.use(
    createProxyMiddleware("/2ddata", {
      target: "https://apis.vworld.kr",
      changeOrigin: true,
    })
  );
};

export default setupProxy;
