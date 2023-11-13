import dotenv from 'dotenv';
dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || 'productDB',
  },
  server: {
    port: process.env.PORT || 3000,
  },
};

export default config;
