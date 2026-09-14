const fs = require("fs");
const mysql = require("mysql2");

const ssl = process.env.DB_SSL_CA_PATH
  ? {
      ca: fs.readFileSync(process.env.DB_SSL_CA_PATH),
      minVersion: "TLSv1.2",
      rejectUnauthorized: true
    }
  : undefined;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl
});

db.connect(err => {
  if (err) {
    console.error("Erreur de connexion DB:", err);
  } else {
    console.log("Connecté à MySQL");
  }
});

module.exports = db;