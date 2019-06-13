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
     }); app.get("/api/book/:id", (req, res) => {
        pool.query(
            "SELECT book_id, name FROM book WHERE id = ?",
            [req.params.id],
            (error, rows) => {
                if (error) {
                    return res.status(500).json({ error });
                }
   
                res.json(rows);
            }
        );
    });
    app.get("/api/library/:id/publisher", (req, res) => {
             pool.query(
                 `SELECT pub_id, pub_name 
                 FROM publisher`,
                 [req.params.id],
                 (error, rows) => {
                     if (error) {
                         return res.status(500).json({ error });
                     }
        
                     res.json(rows);
                 }
             );
         });
         app.get("/api/library/:id/publisher", (req, res) => {
                pool.query(
                     `SELECT m.pub_id, m.pub_name, m.pub_info, GROUP_CONCAT(g.book_id) book_auther
                     FROM publisher s
                     JOIN book_auther g ON g.book_auther_id = m.id
                     WHERE s.book_id = ?
                     GROUP BY m.id,
                     ORDER BY m.pub_info,`,
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