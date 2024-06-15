const { getProjectsById } = require("../project/model");
const { getTasks, addTask, getTaskById } = require("./model");
// build your `/api/tasks` router here
const taskRouter = require("express").Router();

taskRouter.get("/", async (req, res) => {
  const tasks = await getTasks();
  const tasksWithProject = [];
  for (let task of tasks) {
    const project = await getProjectsById(task.project_id);
    tasksWithProject.push({
      ...task,
      project_name: project.project_name,
      project_description: project.project_description
    });
  }
  const result = tasksWithProject.map(task => {
    return {...task, task_completed: !!task.task_completed}
  })
  res.send(result);
});

taskRouter.post("/", async (req, res) => {
  const projectId = req.body.project_id;
  if(!projectId) res.sendStatus(404);
  else{
    const project = await getProjectsById(req.body.project_id);
  if (!project) res.sendStatus(500);
  else {
    try {
      const ids = await addTask(req.body);
      console.log(ids)
      let task = await getTaskById(ids[0]);
      task = { ...task, task_completed: !!task.task_completed };
      res.json(task);
    } catch (e) {
      console.log("working")
      res.sendStatus(500);
    }
  }

  }  
  
});

module.exports = taskRouter;
