require('dotenv').config();
require('module-alias/register');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('@/database/connection');
const path = require('path');
const adminRoutes = require('@/routes/admin');
const albumRoutes = require('@/routes/albums');
const artistRoutes = require('@/routes/artists');
const songRoutes = require('@/routes/songs');
const userRoutes = require('@/routes/users');
const authRoutes = require('@/routes/auth');

const app = express();
const port = process.env.PORT;
const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

app.use('/api/admin', adminRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
});
