require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = mysql.createPool({
        host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
     });
app.get("/api/library", (req, res)=> {
    //fetch publishers from database
    pool.query("SELECT * FROM publisher", (error, rows)=> {
        console.log(error, rows)
        if (error){
            return res.status(500).json({ error });
        }
        res.json(rows)
    });
});

+ app.get("/api/publisher/:id", (req, res) => {
         pool.query(
             "SELECT id, name FROM publisher WHERE id = ?",
             [req.params.id],
             (error, rows) => {
                 if (error) {
                     return res.status(500).json({ error });
                 }
    
                 res.json(rows);
             }
         );
     });
        
app.listen(9000, function () {
    console.log("App listening on port 9000");
});