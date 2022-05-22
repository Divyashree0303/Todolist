const express = require("express");

const bodyParser = require("body-parser");

const getDate = require("./date");

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

const items = [];
const workItem = [];

app.get("/",function(req,res){

const day = getDate();

res.render("index",{listTitle:day,newListItem:items});


});

app.post("/",function(req,res){

  const item = req.body.newItem;

  if(req.body.list == "Work List"){

    workItem.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work",function(req,res){
  res.render("index",{listTitle:"Work List",newListItem:workItem});
});

app.get("/about",function(req,res){
  res.render("about");
})

app.listen(3000,function(){
  console.log("listening for requests on port 3000.");
});
