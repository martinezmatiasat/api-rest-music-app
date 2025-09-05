require('module-alias/register');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('@/database/connection');
const adminRoutes = require('@/routes/admin');
const albumRoutes = require('@/routes/albums');
const artistRoutes = require('@/routes/artists');
const songRoutes = require('@/routes/songs');
const userRoutes = require('@/routes/users');

dotenv.config();
const app = express();
const port = process.env.PORT;
const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No autorizado por CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/admin', adminRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
});
