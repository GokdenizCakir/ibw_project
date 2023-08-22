const express = require('express');
const app = express();
const cors = require('cors');
const { connectDB } = require('./DB/db');
require('dotenv').config();

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donation');
const projectRoutes = require('./routes/project');

const { errorHandler } = require('./middlewares/errorHandler');
const { authCheck } = require('./middlewares/authCheck');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ allowedOrigins: '*' }));

connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use(authCheck);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/donations', donationRoutes);

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'Server running...',
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Endpoint not found',
  });
});

app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
