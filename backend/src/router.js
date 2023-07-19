const express = require("express");

const router = express.Router();

const taskControllers = require("./controllers/taskControllers");

router.get("/tasks", taskControllers.browse);
router.get("/tasks/:id", taskControllers.read);
router.put("/tasks/:id", taskControllers.edit);
router.post("/tasks", taskControllers.add);
router.delete("/tasks/:id", taskControllers.destroy);

module.exports = router;
