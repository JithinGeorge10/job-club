import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app = express();


app.use(cors());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});


app.use(
  "/api/auth-service",
  createProxyMiddleware({
    target: "http://auth-service-srv:4000", 
    changeOrigin: true,
  })
);
app.use(
  "/api/user-service",
  createProxyMiddleware({
    target: "http://user-service-srv:4001",
    changeOrigin: true,
  })
);
app.use(
  "/api/company-service",
  createProxyMiddleware({
    target: "http://company-service-srv:4002",
    changeOrigin: true,
  })
);
app.use(
  "/api/chat-service",
  createProxyMiddleware({
    target: "http://chat-service-srv:4003",
    changeOrigin: true,
  })
);
app.use(
  "/socket.io",
  createProxyMiddleware({
    target: "http://chat-service-srv:4003",
    changeOrigin: true,
    ws: true, 
  })
);



app.use(
  "/",
  createProxyMiddleware({
    target: "http://frontend-srv:3000",
    changeOrigin: true,
  })
);


const port = 5000;
app.listen(port, () =>
  console.log(`API Gateway running on port ${port}`)
);


