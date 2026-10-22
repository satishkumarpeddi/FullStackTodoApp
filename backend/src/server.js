const express = require('express');
const path = require('path')
const todo = require('./routes/todo.js')
require('dotenv').config({
    path:path.resolve(__dirname,'../.env')
})
const app = express();
const PORT = process.env.PORT;
app.use(express.json())
app.use(todo)

app.listen(PORT,()=>{
    console.log(`Server is running on the port : ${PORT}`)
})