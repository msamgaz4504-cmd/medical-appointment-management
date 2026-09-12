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

// ===================================CrÃ©er un rendez-vous===========================================
router.post("/reserver", verifyUser, (req, res) => {
  console.log("route appelee");
  console.log("body recu:", req.body)
  const user_id = req.userId;
  const { date, heure, motif } = req.body;

  if (!user_id || !date || !heure) {
    return res.status(400).json({ message: "user_id, date et heure requis" });
  }

  db.query("SELECT * FROM creneau WHERE date = ? AND heure = ?", [date, heure], (err, resultCreneau) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", err });

    let creneauId;

    if (resultCreneau.length > 0) {
      creneauId = resultCreneau[0].id;
      createRendezVous();
    } else {
  
      db.query("INSERT INTO creneau (date, heure) VALUES (?, ?)", [date, heure], (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur serveur", err });
        creneauId = result.insertId;
        createRendezVous();
      });
    }

    function createRendezVous() {
      
      db.query("SELECT * FROM rendez_vous WHERE creneau_id = ? AND statut = 'confirme'", [creneauId], (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur serveur", err });

        if (results.length > 0) {
          return res.status(400).json({ message: "CrÃ©neau dÃ©jÃ  rÃ©servÃ©" });
        }

        db.query("INSERT INTO rendez_vous (user_id, creneau_id, motif) VALUES (?, ?, ?)", [user_id, creneauId, motif || null], (err, result) => {
          if (err) return res.status(500).json({ message: "Erreur serveur", err });
          res.status(201).json({ message: "Rendez-vous crÃ©Ã©", rendezvousId: result.insertId });
        });
      });
    }
  });
});
// ============================= RÃ©cupÃ©rer les crÃ©neaux disponibles ==========================
router.get("/creneau-disponibles", (req, res) => {
  const sql = `
    SELECT c.*
    FROM creneau c
    LEFT JOIN rendez_vous rv 
      ON c.id = rv.creneau_id AND rv.statut = 'confirme'
    WHERE rv.id IS NULL
    ORDER BY c.date, c.heure
  `;
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", err });
    res.json(results); 
  });
});


//==================== ==========RÃ©cupÃ©rer les rendez-vous dâ€™un patient===================================
router.get("/mes-reservations", verifyUser, (req, res) => {
  const user_id = req.userId;
  const sql = `
    SELECT rv.id, DATE_FORMAT(c.date, '%Y-%m-%d') AS date, DATE_FORMAT(c.heure, '%H:%i') AS heure, rv.motif, rv.statut
    FROM rendez_vous rv
    JOIN creneau c ON rv.creneau_id = c.id
    WHERE rv.user_id = ?
    ORDER BY c.date, c.heure
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", err });
    res.json(results); 
  });
});

//==================== ==========Annuler un rendez-vous dâ€™un patient===================================
router.delete("/mes-reservations/:rvId", verifyUser, async(req, res) => {
  const user_id = req.userId;
  const { rvId } = req.params;

  db.query(
    'SELECT * FROM rendez_vous WHERE id = ? AND user_id = ?',
    [rvId, user_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "Rendez-vous non trouvÃ© pour cet utilisateur" });
      }

      db.query(
        'DELETE FROM rendez_vous WHERE id = ? AND user_id = ?',
        [rvId, user_id],
        (err2) => {
          if (err2) return res.status(500).json({ error: err2.message });

          res.status(200).json({
            message: "Rendez-vous supprimÃ© avec succÃ¨s",
            deletedRv: rows[0]
          });
        }
      );
    }
  );
});

module.exports = router;
