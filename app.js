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
    content:String,
});

const Article=mongoose.model("Article",articleSchema);

//////////////////////////////////////////////////////////// handle all articles////////////////////////////////////////////////////////////
app.route("/articles")
.get((req, res) =>{     
    Article.find({},(err,foundArticles)=>{
        if(!err){
            res.send(foundArticles)
        }else{
            console.log(err)
        }
        
    });
})
.post(function (req, res) {
    
    const newArticle=new Article({
        title:req.body.title,
        content:req.body.content,
    });
    newArticle.save((err)=>{
        if(!err){
            res.send("successfully added new article to ")
        }else{
            console.log(err)
        }
    })
})
.delete(function(req, res) {
    Article.deleteMany({},(err)=>{
        if(!err){
            res.send("SuccessFully deleted all articles. ");
        }else{
            console.log(err);
        }
    });
});
///////////////////////////////////////////////// handle a single article ///////////////////////////////////////////////////////////////////////

app.route('/articles/:articleTitle').get((req, res)=>{

    Article.findOne({title:req.params.articleTitle},(err,foundArticle)=>{
        if(foundArticle){
            res.send(foundArticle)
        }else{
            res.send("No article matching that title found  ")
        }
    }); 
})
.put((req, res)=>{
    Article.findOneAndUpdate(
        {title:req.params.articleTitle},
        { title:req.body.title,
        content:req.body.content},
        (err)=>{
            if(!err){
                res.send("successFully updated article")
            }
        }
    )
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`));