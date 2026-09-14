require("dotenv").config({
  path: require("path").join(__dirname, ".env")
});

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const reservationRoutes = require("./routes/reservationRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(express.json());

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "API de gestion des rendez-vous médicaux" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/rendezvous", reservationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});