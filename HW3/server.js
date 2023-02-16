const express=require("express");
const path=require("path");
const nunjucks=require("nunjucks");
const app=express();
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

app.set("view engine", "html")

const mymodule=require('./recipe_mode.js');


app.listen(3000);




nunjucks.configure(path.resolve(__dirname,'views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true



});
let temp
let p;


app.get('/',(req,res) =>{
     

    if (req.path =='/'){
        p =new Promise((resolve) => {
           temp= mymodule.getAllRecipes();
           resolve(temp)
       })
       
   }

p.then((message) =>{
    //console.log(message);
    res.render('index.html',{list:message});

 })
    
    
})







let p1;
let a=true;
app.get('/recipes/:recipe_id',(req,res) =>{
    
    
    p1 =new Promise((resolve) => {
        
        console.log('reached here wow'+a);
        let temid= parseInt(req.params.recipe_id);
        
      //  console.log(temp);
         resolve(mymodule.getRecipeDetail(temid))
     })



    p1.then((message) =>{
     //   console.log(message);
        res.render('recipe.html',message);
    console.log('message here reached');
a=false;
     })

})

let p2
app.get('/recipes/:recipe_id/comments',(req,res) =>{


    p2 =new Promise((resolve) => {
        console.log('reached here for comments'+req.params.recipe_id);
        let temid= parseInt(req.params.recipe_id);
        temp= mymodule.getComments(temid);
      //  console.log(temp);
         resolve(temp)
     })

    

    p2.then((message) =>{
        res.send(message);
    
     })

})



let p3
app.post('/recipes/:recipe_id/comments',(req,res) =>{
//    console.log('the next is request ');
//console.log(req.body);
let data= req.body;



p3 =new Promise((resolve) => {
 resdata=mymodule.addComments(data.recipe_id,data.comment);
  
     resolve(resdata)
  }).then((message) =>{

    console.log(message);
  res.json(message)
  });







})








