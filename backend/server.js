// --------------------
// Core imports
// --------------------
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import aiRoutes from "./routes.js";

const app = express();

// --------------------
// ES Module __dirname fix
// --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------
// Debug log
// --------------------
console.log("🧪 server.js loaded");

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// AI Routes (PUBLIC)
// --------------------
app.use("/", aiRoutes); // POST /ask, POST /reset

// --------------------
// Serve frontend
// --------------------
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// --------------------
// SPA fallback (GET only, NOT API)
// --------------------
app.get(/^(?!\/ask|\/reset).*$/, (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// --------------------
// Server start
// --------------------
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 AI Portfolio running on port ${PORT}`);
});