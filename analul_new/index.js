const express = require("express");
const app = express();
const db = require("./db_connection");
const port = 3000;

app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/aeweb", (req, res) => {
    res.render("aeweb");
});

const getAllPhotos = `SELECT * FROM photo`;

//for comments you make another query and it will be post request



app.get("/picpage", (req, res) => {
    var photos;
    db.execute(getAllPhotos, (err, results) => {
            let data = { photoList : results };
            console.log(data);
            res.render('picpage', data);
    }
)});

const post_comment = `
    INSERT INTO comments 
        (comment) 
    VALUES 
        (?);
`

app.post("/picpage", (req, res) => {
    db.execute(post_comment,[req.body.comment], (err, results) => {
        res.redirect(`/picpage`);
    }
)});



// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );

app.get("/login", (req, res) => {
    res.render('login');
})

const getUser = `

SELECT *
FROM user
WHERE username = ? and password = ?
`

const createUser = `
INSERT INTO user (username, password)
VALUES (?, ?) 
`

app.post("/login", (req, res) => {
    db.execute(getUser, [req.body.username, req.body.password], (err, results) => {
        console.log(results);
        if (results.length > 0){
            console.log("account already exists")
            res.redirect('/aeweb');
        }
        
    } );
})