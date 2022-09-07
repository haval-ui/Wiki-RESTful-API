// require the wanted files 
const express = require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const ejs =require('ejs');
//set up the server

const app = express() ;
const port = 3000 ;

mongoose.connect('mongodb://localhost:27017/wikiDB');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//create the mongoose schema and model

const articleSchema= new mongoose.Schema({
    title:String,
    connect:String,
});

const Article=mongoose.model("Article",articleSchema);



app.get('/articles', (req, res) =>{ 
    
    Article.find({},(err,foundArticles)=>{
        if(!err){
            res.send(foundArticles)
        }else{
            console.log(err)
        }
        
    })

});




app.listen(port, () => console.log(`Example app listening on port ${port}!`));