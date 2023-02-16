//  function getAllRecipes(){
//     const sqlite3 = require('sqlite3').verbose();
// let sql;
// // Connect to the DB
// const db = new sqlite3.Database('./recipes_store.db3',sqlite3.OPEN_READONLY,
// (err) => {
// if (err) {return console.log(err.message)
// } else
// {
// console.log('Connected to the SQlite database.');
// };
// });
// sql = `SELECT * FROM recipes`;
// db.all(sql, [], (err, rows) => {
// if (err) {
// throw err;
// }

// return rows
// });
// }


async function getAllRecipes(){
     const sqlite = require('aa-sqlite');

     await sqlite.open('./recipes_store.db3');

     console.log('Connected to the SQlite database.');



     sql = 'SELECT * FROM recipes';
     const rows = await sqlite.all(sql)
     await sqlite.close();
 //    console.log(rows);
     return rows;

     }






//  function getRecipeDetail(recipe_id){
//     const sqlite3 = require('sqlite3').verbose();
// let sql;
// // Connect to the DB
// const db = new sqlite3.Database('./recipes_store.db3',sqlite3.OPEN_READONLY,
// (err) => {
// if (err) {return console.log(err.message)
// } else
// {
// console.log('Connected to the SQlite database.');
// };
// });


// let detail;


// sql = `SELECT * FROM 'recipes' WHERE id=?;`;
// db.all(sql, [recipe_id], (err, rows) => {
// if (err) {
// throw err;
// }
// rows.forEach((row) => {
// detail=row;
//  });
//      });



// sql = `SELECT * FROM 'ingredients' where recipe_id =?;`;
// db.all(sql, [recipe_id], (err, rows) => {
// if (err) {
// throw err;
// }

// detail.recipe=rows;



//      });




// sql = `SELECT * FROM 'method' where recipe_id =?;`;
// db.all(sql, [recipe_id], (err, rows) => {
// if (err) {
// throw err;
// }

// detail.method=rows;

// console.log(detail);
// return detail;

//      });

//  }




async function getRecipeDetail(recipe_id){
     const sqlite = require('aa-sqlite');

     await sqlite.open('./recipes_store.db3');

     console.log('Connected to the SQlite database in get recipe detail.'+recipe_id);




 let sql;
 let detail;


  sql= 'SELECT * FROM recipes WHERE id='+recipe_id;
 const rows = await sqlite.all(sql)


 rows.forEach((row) => {
 detail=row;
  });




 sql = 'SELECT * FROM ingredients WHERE recipe_id ='+recipe_id;

 rows2 = await sqlite.all(sql);


 detail.recipe=rows2;




let rows3;
 sql = 'SELECT * FROM method WHERE recipe_id ='+recipe_id;

 rows3 = await sqlite.all(sql);

 detail.method=rows3;

//console.log(detail)
 return detail;


 }





//  function getComments(recipe_id){
// const sqlite3 = require('sqlite3').verbose();
// let sql;
// // Connect to the DB
// const db = new sqlite3.Database('./recipes_store.db3',sqlite3.OPEN_READONLY,
// (err) => {
// if (err) {return console.log(err.message)
// } else
// {
// console.log('Connected to the SQlite database.');
// };
// });




// sql = `SELECT * FROM 'comments' where recipe_id =?;`;
// db.all(sql, [recipe_id], (err, rows) => {
// if (err) {
// throw err;
// }


// console.log(rows);
// return rows;

//      });


// }


async function getComments(recipe_id){
     const sqlite = require('aa-sqlite');

     await sqlite.open('./recipes_store.db3');

     console.log('Connected to the SQlite database.');



     sql = 'SELECT * FROM comments where recipe_id ='+recipe_id;
     const rows = await sqlite.all(sql)
     await sqlite.close();
  //   console.log(rows);
     return rows;

     }


//  function addComments(recipe_id, comment){
//     const sqlite3 = require('sqlite3').verbose();
//     let sql;
//     // Connect to the DB
//     const db = new sqlite3.Database('./recipes_store.db3',sqlite3.OPEN_READWRITE,
//     (err) => {
//     if (err) {return console.log(err.message)
//     } else
//     {
//     console.log('Connected to the SQlite database.');
//     };
//     });





//     sql = `INSERT INTO comments(author,comment,recipe_id) VALUES(?,?,?);`;
//     db.run(sql, [comment.author,comment.comment,recipe_id], (err) => {
//     if (err) {
//     throw err;
//     }


//     console.log("successful") ;
//          });

//          sql = `SELECT id FROM 'comments' where author ='?' and comment ='?' and recipe_id= ?;`;
//          db.run(sql, [comment.author,comment.comment,recipe_id], (err) => {
//          if (err,rows) {
//          throw err;
//          }


//          rows.forEach((row) => {
//             detail=row;
//              });
//              return {id:row.id,author: comment.author,comment: comment.comment};
//             });




//     }

async function addComments(recipe_id, comment){
const sqlite = require('aa-sqlite');

await sqlite.open('./recipes_store.db3');


let com =comment.comment
let auth=comment.author

console.log(com+auth);
console.log('Connected to the SQlite database.');




await sqlite.run("INSERT INTO comments(author,comment,recipe_id) VALUES('"+String(auth)+"','"+String(com)+"',"+ recipe_id+")")


let sql="SELECT *,MAX(id) FROM comments" ;
const rows = await sqlite.all(sql)

await sqlite.close();

return rows[0];



     }

//let test2= addComments(3,{author:'new inserted',comment:'comments'});
//let test2= getRecipeDetail(1);
//console.log(test2);














module.exports = {getAllRecipes,getRecipeDetail,getComments,addComments };










