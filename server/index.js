const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./config');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    if (process.env.NODE_ENV !== 'production') {
      const fakeDb = new FakeDb();
      //fakeDb.seeDb();
    }
  });

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'build');
  app.use(express.static(appPath));
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });

  app.get('/rentals', function(req, res) {
    res.json({ success: true });
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log(`I am running on port ${PORT}`);
});
