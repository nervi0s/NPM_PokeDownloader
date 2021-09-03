const mongoose = require('mongoose');


// Connection to MongoDB
async function connectToDataBase(uri) {
  try {
    let mongooseInstance = await mongoose.connect(uri);
    console.log("Connection established to DB 😺");
    return mongooseInstance;
  } catch (err) {
    throw "Error connecting to DB ❌: " + err;
  }
}

module.exports = { connectToDataBase, mongoose };
