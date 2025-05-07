import { Router } from "express";
import { Task } from "../models/task.model.js";

export const router = Router();

// POST /tasks – add new
router.post("/", async (req, res, next) => {
  try {
    console.log("POST /tasks called with body:", req.body);
    const { title, description, priority } = req.body;
    const task = await Task.create({ title, description, priority });
    console.log("Task created:", task.toJSON());
    res.status(201).json(task);
  } catch (err) {
    console.error("Error in POST /tasks:", err);
    next(err);
  }
});

// GET /tasks – list all
router.get("/", async (_req, res, next) => {
  try {
    console.log("GET /tasks called");
    const tasks = await Task.findAll({ order: [["id", "DESC"]] });
    console.log(`Fetched ${tasks.length} task(s)`);
    res.json(tasks);
  } catch (err) {
    console.error("Error in GET /tasks:", err);
    next(err);
  }
});

// PUT /tasks/:id/complete – toggle completion
router.put("/:id/complete", async (req, res, next) => {
  try {
    console.log(`PUT /tasks/${req.params.id}/complete called`);
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      console.warn(`Task with id ${req.params.id} not found`);
      return res.sendStatus(404);
    }
    task.is_completed = !task.is_completed;
    await task.save();
    console.log("Updated task completion status:", task.toJSON());
    res.json(task);
  } catch (err) {
    console.error(`Error in PUT /tasks/${req.params.id}/complete:`, err);
    next(err);
  }
});

// DELETE /tasks/:id – remove
router.delete("/:id", async (req, res, next) => {
  try {
    console.log(`DELETE /tasks/${req.params.id} called`);
    const rows = await Task.destroy({ where: { id: req.params.id } });
    if (!rows) {
      console.warn(`Task with id ${req.params.id} not found for deletion`);
      return res.sendStatus(404);
    }
    console.log(`Task with id ${req.params.id} deleted`);
    res.sendStatus(204);
  } catch (err) {
    console.error(`Error in DELETE /tasks/${req.params.id}:`, err);
    next(err);
  }
});
