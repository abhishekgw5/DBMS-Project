const { json } = require('body-parser');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"negative3",
    database:"movies",
});

conn.connect(function(err){
    if(err){
        console.log("Error in DB connection: "+json.stringify(err,undefined,2));
    }
    else{
        console.log("Connection Successful...");
    }
});

module.exports=conn;

// const{
//     createPool
// } = require('mysql');

// const pool = createPool({
//     host:"localhost",
//     user:"root",
//     password:"negative3",
//     database:"d3",
//     connectionLimit: 10
// });

// pool.query(`select * from stud_details`, (err, result, fields) => {
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })