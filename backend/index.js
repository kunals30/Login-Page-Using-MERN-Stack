require('dotenv').config();
const express = require('express');
const { authRouter } = require('./router/authRouter');
const connection = require('./config/databaseConfig');
const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(cors());

connection();

app.use(express.json());

app.use("/user/", authRouter)
// app.use("/", (req, res)=>{
//     res.send("Hello World");
// })

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})