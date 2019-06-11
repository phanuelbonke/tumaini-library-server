const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = mysql.createPool({
         host: "localhost",
         port:"9000",
         user: "root",
         password: "password",
        database: "library"
     });
app.get("/api/library", (req, res)=> {
    //fetch publishers from database
    pull.query("SELECT * FROM publisher", (error, rows)=> {
        if (error){
            return res.status(500).json({ error });
        }
        res.json(rows);
    });
});

app.listen(9000, function () {
    console.log("App listening on port 9000");
});