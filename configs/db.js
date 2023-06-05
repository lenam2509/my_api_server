const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connect to database successfully!!!'))
    .catch((error) => console.log('Connect to database failure!!!'+error));

module.exports = mongoose;

