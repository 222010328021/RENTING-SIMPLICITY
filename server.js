// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rentify', { useNewUrlParser: true, useUnifiedTopology: true });

const Property = mongoose.model('Property', {
  name: String,
  description: String,
  area: String,
  bedrooms: Number,
  bathrooms: Number,
  hospitalsNearby: Boolean,
  collegesNearby: Boolean
});

const Seller = mongoose.model('Seller', {
  email: String,
  phoneNumber: String
});

app.use(cors());
app.use(express.json());

app.get('/api/properties', async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

app.post('/api/interested/:propertyId', async (req, res) => {
  const propertyId = req.params.propertyId;
  const seller = await Seller.findOne({ propertyId });
  res.json(seller);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
