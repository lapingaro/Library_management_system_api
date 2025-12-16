require ('dotenv').config ();
const express = require ('express');
const mongoose = require ('mongoose');
const bookRoutes = require ('./routes/bookRoutes');
const borrowerRoutes = require ('./routes/borrowerRoutes');
const borrowRoutes = require ('./routes/borrowRoutes');
const authRoutes = require ('./routes/authRoutes');
const reservationRoutes = require ('./routes/reservationRoutes');

const app = express ();
const port = 3000;

// Middleware
app.use (express.json ());
app.use (express.urlencoded ({extended: false}));
app.use ('/api/borrowers', borrowerRoutes);
app.use ('/api/borrow', borrowRoutes);
app.use ('/api/auth', authRoutes);
app.use ('/api/reservations', reservationRoutes);

// Routes
app.get ('/', (req, res) => {
  res.send ('Hello From API');
});

// Use Books Routes
app.use ('/api/books', bookRoutes);

console.log ('MONGO_URI exists:', !!process.env.MONGO_URI);
console.log ('MONGO_URI type:', typeof process.env.MONGO_URI);

mongoose
  .connect (process.env.MONGO_URI)
  .then (() => {
    console.log ('Connected to MongoDB');
    app.listen (port, () => {
      console.log (`Server is running on port ${port}`);
    });
  })
  .catch (error => {
    console.error ('MongoDB connection error:', error);
    process.exit (1);
  });
