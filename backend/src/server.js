import express from "express";
import cors from "cors";
import { sequelize } from "./db.js";
import { router as taskRoutes } from "./routes/task.routes.js";

const app = express();
app.use(cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }));
app.use(express.json());

app.use("/tasks", taskRoutes);

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();          // auto‑migrate table
    app.listen(PORT, () =>
      console.log(`API running on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.error("Unable to start server:", e);
  }
})();
