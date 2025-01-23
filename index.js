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
        "SELECT * FROM publisher WHERE pub_id =?",
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
app.get("/api/publisher/:id", (req, res) => {
    pool.query(
        `SELECT pub_id, pub_name, pub_address, pub_info, books  
                 FROM publisher WHERE pub_id= ?`,
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
        `SELECT b.book_id, m.id, m.address, m.dicription, m.name, GROUP_CONCAT(p.book_id) publisher
                         FROM book_auther b
                         JOIN member m ON m.id = m.address
                         JOIN book_auther p ON p.book_id = m.id
                         WHERE b.book_id = ?
                         GROUP BY m.id, b.auther
                         ORDER BY b.book_id, b.auther`,
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
    const { name,
        cover_url,
        dicription,
        pub_id,
        id } = req.body;
    console.log(req.body.name,
                req.body.cover_url,
                req.body.dicription,
                req.body.pub_id,
                req.body.id);
    if (name === "",
        cover_url==="",
        dicription==="",
        pub_id==="",
        id==="") {
        return res.status(400).json({ error: "invalid payload" }
        );
    }

});

app.post("/api/book", (req, res) => {
    const {
       
        name,
        cover_url,
        dicription,
        pub_id,
        id

    }= req.body;

    if ( 
          !name ||
          !cover_url ||
          !dicription ||
          !pub_id ||
          !id ||
          (book.length===0)
) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    pool.query(
        "INSERT INTO book (name, cover_url, dicription, pub_id, id) VALUES (?, ?, ?, ?, ?)",
        [name, cover_url, dicription, pub_id, id],
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
app.put("/api/books/:book_id", (req, res) => {
    const book = req.body;

    if (!book.name) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    pool.query(
        "UPDATE book SET name = ? WHERE book_id = ?",
        [book.name, req.params.id],
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
        id

    } = req.body;

    if (
        !book_id ||
        !name ||
        !cover_url ||
        !dicription ||
        !pub_id ||
        !id ||

        (Array.isArray(member) && member.length === 0)
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
                [book_id, name, cover_url, dicription, pub_id, id],
                (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            res.status(500).json({ error });
                        });
                    }

                    const insertId = results.insertId;
                    const memberValues = member.map(member => [insertId, member]);

                    connection.query(
                        "INSERT INTO member (id) VALUES ?",
                        [memberValues],
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
app.delete("/api/books/:book_id", (req, res) => {
    pool.query(
        "DELETE FROM book WHERE book_id = ?",
        [req.params.id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            +             res.json(results.affectedRows);
        }
    );
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
        body: 'This is my dream app i was telling you?',
        from: '+14086457383',
        to: '+254718366252'
    })
    .then(message => console.log(message.sid));
