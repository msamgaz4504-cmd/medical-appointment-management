const express = require("express"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 
const db = require("../config/db"); 

const router = express.Router();
const salt = 10;



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

router.get('/me', verifyUser, (req, res)=> {
    return res.json({id: req.userId, prenom: req.prenom})
});

router.get('/profil', verifyUser, (req, res) => {
    return res.json({
        Status: "Success", 
        prenom: req.prenom, 
        userId: req.userId});
});

router.post('/sign-up', (req, res) => {
    const sql = "INSERT INTO user (prenom, nom, email, telephone, password) VALUES (?,?,?,?,?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({Error: "Error for hassing password"});
        const values = [
            req.body.prenom,
            req.body.nom,
            req.body.email,
            req.body.telephone,
            hash
        ];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.log("Erreur MySQL:", err); 
                return res.status(500).json({Error: "Inserting data Error in server", details: err});
            }
            const userId = result.insertId; 
            const prenom = req.body.prenom;
            const role = "user";
            const token = jwt.sign({ id: userId, prenom, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

            res.cookie("token", token, { httpOnly: true });
            return res.status(201).json({ Status: "Success", prenom });
        });
    });
});

router.post('/log-in', (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ?";

    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({Error: "Login error in server"});
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({Error: "Password compare error"});
                if (response) {
                    const prenom = data[0].prenom;
                    const id = data[0].id;
                    const role = data[0].role
                    const token = jwt.sign({prenom, id, role}, process.env.JWT_SECRET, {expiresIn: "1d"});
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                } else {
                    return res.json({Error: "Password not matched"});
                }
            });
        } else {
            return res.json({Error: "No email existed"});
        }
    });
});

module.exports = router;
