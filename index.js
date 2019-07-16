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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/library", (req, res) => {
    //fetch publishers from database
    pool.query("SELECT * FROM publisher", (error, rows) => {
        console.log(error, rows)
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(rows)
    });
});
app.get("/api/library", (req, res) => {
    //fetch publishers from database
    pool.query("SELECT * FROM member", (error, rows) => {
        console.log(error, rows)
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(rows)
    });
});
app.get("/api/library", (req, res) => {
    //fetch publishers from database
    pool.query("SELECT * FROM book_auther", (error, rows) => {
        console.log(error, rows)
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(rows)
    });
});
app.get("/api/library", (req, res) => {
    //fetch publishers from database
    pool.query("SELECT * FROM book", (error, rows) => {
        console.log(error, rows)
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(rows)
    });
});
 app.get("/api/publisher/:id", (req, res) => {
    pool.query(
        "SELECT id, name FROM publisher WHERE id =?",
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
        "SELECT book_id, name, cover_url, dicricption, pub_id, id FROM book WHERE book_id = ?",
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
                     ORDER BY m.pub_info`,
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(rows);
        }
    );
});
app.get("/api/book_auther/:id/member", (req, res) => {
    pool.query(
        `SELECT b.name, b.cover_url, b.pub_id, m.dicription, m.name, GROUP_CONCAT(p.pub_id) publisher
                         FROM book b
                         JOIN member m ON m.id = m.address
                         JOIN publisher p ON p.pub_id = m.id
                         WHERE b.pub_id = ?
                         GROUP BY m.id, b.name
                         ORDER BY b.pub_id, b.name`,
        [req.params.id],
        (error, rows) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(rows);
        }
    );
});

app.post("/api/book", (req, res) => {
    const { name } = req.body;
    console.log(req.body.name);

    if (name === "") {
        return res.status(400).json({ error: "invalid payload" }
        );
    }

});

app.post("/api/book", (req, res) => {
    const book = req.body;

    if (!book.name) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    pool.query(
        "INSERT INTO book (name) VALUES (?)",
        [book.name],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.insertId);
        }
    );
});

app.put("/api/publisher/:id", (req, res) => {
    const publisher = req.body;

    if (!publisher.name) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    pool.query(
        "UPDATE publisher SET pub_name = ? WHERE pub_id = 1",
        [publisher.name, req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }

            res.json(results.changedRows);
        }
    );
});
app.post("/api/books", (req, res) => {
         const {
            book_id,
            name,
            cover_url,
            dicription,
            pub_id,
            id,
            publisher
            
         } = req.body;
    
         if (
            !book_id ||
            !name ||
            !cover_url ||
            !dicription ||
            !pub_id ||
            !id ||
            
             (Array.isArray(publisher) && publisher.length === 0)
             //(Array.isArray(member) && member.length === 0)
         ) {
             return res.status(400).json({ error: "Invalid payload" });
         }
    
         pool.getConnection((error, connection) => {
             if (error) {
                 return res.status(500).json({ error });
             }
    
             connection.beginTransaction(error => {
                 if (error) {
                     return res.status(500).json({ error });
                 }
    
                 connection.query(
                    "INSERT INTO book (book_id, name, cover_url, dicription, pub_id, id) VALUES (?, ?, ?, ?, ?, ?)",
                [book_id, name, cover_url,dicription, pub_id, id],
                     (error, results) => {
                         if (error) {
                             return connection.rollback(() => {
                                 res.status(500).json({ error });
                             });
                         }
    
                         const insertId = results.insertId;
                         const publisherValues = publisher.map(publisher => [insertId, publisher]);
    
                         connection.query(
                            "INSERT INTO publisher (pub_id) VALUES ?",
                            [publisherValues],
                             (error, results) => {
                                 if (error) {
                                     return connection.rollback(() => {
                                         res.status(500).json({ error });
                                     });
                                 }
                                 
                                 
    
                                 connection.commit(error => {
                                     if (error) {
                                         return connection.rollback(() => {
                                             res.status(500).json({ error });
                                         });
                                     }
    
                                     connection.release();
    
                                     res.json(insertId);
                                 });
                             }
                         );
                     }
                 );
             });
         });
     });
    
    app.listen(9000, function () {
        console.log("App listening on port 9000");
    });
            // Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'ACddaf8574f80d9c8fe784b45aef05fdfd';
const authToken = '745513ab4055b9f05860a0899f21f3f6';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the app i was telling you?',
     from: '+14086457383',
     to: '+25418366252'
   })
  .then(message => console.log(message.sid));
