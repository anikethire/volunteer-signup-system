// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const signupRoutes = require('./routes/signupRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // if you want to serve frontend from backend

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/availability', availabilityRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}`));

