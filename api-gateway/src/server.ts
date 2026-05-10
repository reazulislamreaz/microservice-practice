import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));

const routes = {
  '/api/v1/auth': process.env.AUTH_SERVICE_URL || 'http://localhost:5001',
  '/api/v1/messages': process.env.MESSAGE_SERVICE_URL || 'http://localhost:5002',
  '/api/v1/conversations': process.env.MESSAGE_SERVICE_URL || 'http://localhost:5002',
};

for (const [path, target] of Object.entries(routes)) {
  app.use(
    path,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (pathStr) => pathStr, // Keep the path as is
    })
  );
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is UP' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
