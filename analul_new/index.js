const express = require("express");
const app = express();
const db = require("./db_connection");
const port = 3000;

app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("aeweb");
});

app.get("/picpage", (req, res) => {
    res.render("picpage");
});


const comment_sql = `
    SELECT photo_id, 
    FROM photo
    JOIN comment 
    ON  
        photo.photo_id = comment.photo_id
`;

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );