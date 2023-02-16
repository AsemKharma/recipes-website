function showComments(recipe_id){
  let url=window.location.href.substring(0,30)+recipe_id+'/comments';
  fetch(url)
.then(res => res.json())
.then(data => {


  const holder=document.getElementById("commentsholder");
  holder.innerHTML="";


data.forEach(element => {
    holder.innerHTML=holder.innerHTML+  '<div style="background-color: #ffffa8; max-width:600px"><p>'+element.comment+'</p><p>-'+element.author+'</p></div>';
    });
})
}

showComments(window.location.href.substring(30));





function seeComments(){
  console.log("the button was clicked");
  document.getElementById("hw3").style.display="block";
  document.getElementById("hw31").style.display="block";
  document.getElementById("commentsholder").style.display="block";
}



const button= document.getElementById('seecomment');
button.addEventListener("click", seeComments)


const addd= document.getElementById('addcommentsbutton');
addd.addEventListener("click", sendComment);


let js;



async function sendComment(){
const comHolder=document.getElementById('commentholder');
const name=document.getElementById('nameholder');

let rec_id=window.location.href.substring(30);
console.log(rec_id)

const com = {recipe_id:rec_id, comment:{author:name.value,comment: comHolder.value}};
const options ={
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify(com)
};

let p =new Promise((resolve) => {
  let url=window.location.href.substring(0,30)+window.location.href.substring(30)+'/comments'
   x= fetch(url,options)

   resolve(x)
})

p.then((message) =>{

  js=message.json();
  console.log(js)


  document.getElementById('commentholder').innerHTML='';
  showComments(window.location.href.substring(30));

})



}

