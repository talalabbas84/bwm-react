const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/dev');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');
mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seeDb();
  });

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

app.get('/rentals', function(req, res) {
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log(`I am running on port ${PORT}`);
});
