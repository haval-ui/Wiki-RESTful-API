// require the wanted files 
const express = require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser')

//set up the server
const app = express() ;
const port = 3000 ;

mongoose.connect('mongodb://localhost:27017/wikiDB');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

//create the mongoose schema and model

const articlesSchema= new mongoose.Schema({
    title:String,
    connect:String,
});

const Article=mongoose.model("Article",articlesSchema);



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))