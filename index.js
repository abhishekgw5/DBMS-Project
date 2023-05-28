const connection = require('./conn');
const express = require('express');
const bodyParser = require('body-parser');
const { threadId } = require('./conn');
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    connection.query(' select title, genre_name, country_name, language_name, DATE_FORMAT(release_year, "%d-%m-%Y") AS date_only, rating from movie inner join genre on movie.genre_id = genre.genre_id inner join language on movie.language_id = language.language_id inner join country on movie.country_id = country.country_id order by cast(rating as decimal(10,2)) desc;', (err, data)=>{
        if(err){
            throw err;
        }
        else{
            // console.log(data);
            res.render("index", {title: "Moive's", action:'list', sampleData:data});
        }
    });
    
});

app.get("/all", function (req, res) {
    connection.query('select title, genre_name, country_name, language_name, DATE_FORMAT(release_year, "%d-%m-%Y") AS date_only, rating from movie inner join genre on movie.genre_id = genre.genre_id inner join language on movie.language_id = language.language_id inner join country on movie.country_id = country.country_id;', (err, data)=>{
        if(err){
            throw err;
        }
        else{
            // console.log(data);
            res.render("all", {title: "Moive's", action:'list', sampleData:data});
        }
    });
    
});

app.get("/add", function(req,res){
    connection.query('select * from genre', (err, gresult)=>{
        if(err){
            console.log(err);
        }
        else{
            connection.query('select * from language', (err, lresult)=>{
                if(err){
                    console.log(err);
                }
                else{
                    connection.query('select * from country', (err, cresult)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.render("add",{gdata:gresult, ldata:lresult, cdata:cresult});
                        }
                    })
                }
            })
        }
    })
});

app.post('/add', (req,res)=>{
    const name = req.body.mname;
    const genre = req.body.genre;
    const country = req.body.country;
    const language = req.body.language;
    const date = req.body.release;
    const rating = req.body.rating;
    connection.query('insert into movie(title, genre_id, country_id, language_id, release_year, rating) values(?,?,?,?,?,?)',[name,genre,country,language,date,rating],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    })
});

app.get('/delete', (req,res)=> {
    res.render("delete");
});

app.post('/delete', (req,res)=> {
    const name = req.body.mname;
    connection.query('delete from movie where title=?',[name],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    })
})

app.get('/search', (req, res)=>{
    res.render("search", {Md:0});
})

app.post('/search', (req, res)=>{
    const name = req.body.mname;
    connection.query('select title, genre_name, country_name, language_name, DATE_FORMAT(release_year, "%d-%m-%Y") AS date_only, rating from movie inner join genre on movie.genre_id = genre.genre_id inner join language on movie.language_id = language.language_id inner join country on movie.country_id = country.country_id where title=?',[name], (err, data)=>{
        if(err){
            throw err;
        }
        else{
            // console.log(data);
            res.render("search", {Md:data});
        }
    })
})

app.listen(3000, ()=> {
    console.log("Express server is running on port 3000");
});