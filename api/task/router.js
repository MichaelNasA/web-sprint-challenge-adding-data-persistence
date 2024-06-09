const { getProjectById } = require("../project/model");
const { getTasks, addTask, getTaskById } = require("./model");
// build your `/api/tasks` router here
const taskRouter = require("express").Router();

taskRouter.get("/", async (req, res) => {
  const tasks = await getTasks();
  const tasksWithProject = [];
  for (let task of tasks) {
    const project = await getProjectById(task.project_id);
    tasksWithProject.push({
      ...task,
      task_completed: !!task.task_completed,
      project_description: project.project_description,
      project_name: project.project_name,
    });
  }
  res.send(tasks);
});

taskRouter.post("/", async (req, res) => {
  const project = await getProjectById(req.body.project_id);
  if (!project) res.sendStatus(500);
  else {
    try {
      const ids = await addTask(req.body);
      let task = await getTaskById(ids[0]);
      task = { ...task, task_completed: !!task.task_complete };
      res.send(task);
    } catch (e) {
      res.sendStatus(500);
    }
  }
});

module.exports = taskRouter;
