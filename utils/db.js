const mongoose = require('mongoose');
const db = require("./../config/db.js");
const { promisifyAll } = require('bluebird');
promisifyAll(mongoose);

const options = {
  useMongoClient: true,
  user: db.user,
  pass: db.password
}

mongoose.Promise = global.Promise;
var conn = mongoose.connect(db.uri, options, (err)=>{
  console.log("Mongoose connected to [" + db.name + "]");
});

module.exports = conn;
