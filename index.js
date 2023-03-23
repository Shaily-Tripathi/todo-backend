const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');
const path = require('path');
const app = express();
const route = require('./routes/route')
mongoose.set("strictQuery", true)

app.use(express.json());
app.use(cors());
app.use(route);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true
})
.then(()=>console.log("MongoDB Connected..."))
.catch((err)=>console.log(err))

app.use(express.static(path.join(__dirname, '../user/build')));

app.get("*", function(req,res){
    res.sendFile(path.join(__dirname, '../user/build/index.html'))
})


const PORT = process.env.PORT || 5000;


app.listen(PORT,function(){
    console.log(`Server is connected to : ${PORT}`);
});