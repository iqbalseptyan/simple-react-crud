const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const mysql = require("mysql");

//mysql
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_react-crud",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?;";
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const movieReview = req.body.movieReview;

  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id = ?;";
  db.query(sqlUpdate, [movieReview, id], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
