const express = require("express"); 
const router = express.Router();    
const db = require("../config/db"); 
const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({Error: "You are not authenticated"});
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okey"});
            } else {
                req.prenom = decoded.prenom;
                req.userId = decoded.id;
                req.role = decoded.role;
                next();
            }
        });
    }
};

const verifyAdmin = (req, res, next) => {
    if(req.role !== "admin"){
        return res.status(403).json({Error: "Admin access only"});
    }
    next();
};

// ============================== Lister tous les rendez-vous=================================================
router.get("/", verifyUser, verifyAdmin, (req, res) => {
  const sql = `
    SELECT rv.id, CONCAT(u.nom, ' ', u.prenom) AS patient, u.email AS email,
           c.date AS date, c.heure AS time, rv.motif AS reason, rv.statut AS statut
    FROM rendez_vous rv
    JOIN user u ON rv.user_id = u.id
    JOIN creneau c ON rv.creneau_id = c.id
    ORDER BY rv.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", err }); 
    res.status(200).json(results); 
  });
});

// ===================================Modifier statut rendez-vous===========================================
 router.put("/modifier/:id/statut", verifyUser, verifyAdmin, (req, res) => {
  const id = req.params.id;
  const {statut} = req.body;
  const sql = ` update rendez_vous rv set rv.statut = ? where rv.id = ?`

  db.query(sql, [statut, id], (err, result) => {
    if (err) return res.status(500).json({message: "Erreur serveur", err});
    res.status(200).json({message: "Statut mis Ã  jour avec succÃ¨s ", id, statut});
  });
 });
// ============================== Lister tous les rendez-vous du jour =================================================
router.get("/today", verifyUser, verifyAdmin, (req, res) => {
  const sql = `
    SELECT rv.id, CONCAT(u.nom, ' ', u.prenom) AS patient, u.email AS email,
           c.date AS date, c.heure AS time, rv.motif AS reason, rv.statut AS statut
    FROM rendez_vous rv
    JOIN user u ON rv.user_id = u.id
    JOIN creneau c ON rv.creneau_id = c.id
    where c.date = CURDATE()
    ORDER BY rv.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", err }); 
    res.status(200).json(results); 
  });
});

// ============================== Calculer les statistiques =====================================
router.get("/stats", verifyUser, verifyAdmin, (req, res) => {

    const sql = `
        SELECT 
            SUM(CASE WHEN c.date = CURDATE() AND rv.statut != 'annule' THEN 1 ELSE 0 END) AS day,
            SUM(CASE WHEN rv.statut = 'en_attente' THEN 1 ELSE 0 END) AS attente,
            SUM(CASE WHEN rv.statut = 'confirme' THEN 1 ELSE 0 END) AS confirmes,
            COUNT(*) AS totalRdv
        FROM rendez_vous rv
        JOIN creneau c ON rv.creneau_id = c.id;
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);

        res.json(result[0]);
    });

});

module.exports = router;
