const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL
console.log(MONGODB_URL);

const connection = ()=>{
    mongoose.connect(MONGODB_URL)
    .then((conn)=>{console.log(`Connected to database: ${conn.connection.host}`)})
    .catch((err)=>{console.log(err.message)});  
}

module.exports = connection;