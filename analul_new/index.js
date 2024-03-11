const express = require("express");
const app = express();
const db = require("./db_connection");
const port = 3000;

app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("picpage");
});

const comment_sql = `
    SELECT photo_id, 
    FROM photo
    JOIN comment 
    ON  
        photo.photo_id = comment.photo_id
`;

app.get("/assignments/:id", (req, res) => {
    db.execute(
        comments_sql,
        [req.params.id],
        (error, results) => {
            if (error) res.status(500).send(error);
            else {
                let data = { hw: results[0] };
                res.render("detail", data);
            }
        }
    );
});

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );