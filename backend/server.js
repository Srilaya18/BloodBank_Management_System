const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database
const db = new sqlite3.Database("database.db");

// Create table
db.run(`
CREATE TABLE IF NOT EXISTS donors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    blood_group TEXT,
    phone TEXT
)
`);

// Login API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Add donor
app.post("/add-donor", (req, res) => {
    const { name, blood_group, phone } = req.body;
    db.run(
        "INSERT INTO donors (name, blood_group, phone) VALUES (?, ?, ?)",
        [name, blood_group, phone],
        () => res.send("Donor Added")
    );
});

// Get donors
app.get("/donors", (req, res) => {
    db.all("SELECT * FROM donors", (err, rows) => {
        res.json(rows);
    });
});

// Server start
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
