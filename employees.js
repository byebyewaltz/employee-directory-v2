import { Router } from "express";
import employees from "#db/employees";

const router = Router();
export default router;

// GET /employees — returns all employees
router.get("/", (req, res) => {
  res.send(employees);
});

// GET /employees/random — declared BEFORE /:id so Express doesn't treat
// the string "random" as an id parameter
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

// GET /employees/:id — returns one employee or 404
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

// POST /employees — adds a new employee
// 400 if body or name is missing/empty; 201 with the new employee on success
router.post("/", (req, res) => {
  const { name } = req.body ?? {};

  if (!name || !name.trim()) {
    return res.status(400).send("400 Bad Request: `name` is required");
  }

  // Build a unique ID: max existing ID + 1 (safe even after multiple POSTs)
  const maxId = employees.reduce((max, e) => Math.max(max, e.id), 0);
  const newEmployee = {
    id: maxId + 1,
    name: name.trim(),
  };

  employees.push(newEmployee);
  res.status(201).send(newEmployee);
});
