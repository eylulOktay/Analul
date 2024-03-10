const express = require("express");
const app = express();
const db = require("./db/db_connection");
const port = 3000;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index");
});

const comment_sql = `
    SELECT photo_id, 
    FROM photo
    JOIN comment 
    ON 
        photo.photo_id = comment.phot_id
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