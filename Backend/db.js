const mongoose = require('mongoose');

const mongourl = "mongodb://localhost:27017/mynotebook";

const connectToMongo = async () => {
  await mongoose.connect(mongourl);

  console.log("mongoose connected successfully")
}

module.exports = connectToMongo;