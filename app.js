import express from "express";
import employeesRouter from "#routes/employees";

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json()); // parse JSON request bodies

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// All /employees routes are handled by the dedicated router
app.use("/employees", employeesRouter);

// ── Error-handling middleware ─────────────────────────────────────────────────
// Four-argument signature tells Express this is an error handler.
// Catches any uncaught errors thrown in route handlers and sends status 500.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

export default app;
