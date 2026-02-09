const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/appoinments')
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));

app.use('/api/auth', userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
