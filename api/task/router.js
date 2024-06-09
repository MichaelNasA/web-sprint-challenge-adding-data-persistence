const { getTasks, addTask, getTaskById } = require('./model')
// build your `/api/tasks` router here
const taskRouter = require('express').Router();

taskRouter.get('/', async (req, res) => {
    let tasks = await getTasks();
    tasks = tasks.map(task => {
        return {...task, task_completed: !!task.task_completed}
    })
    res.send(tasks);
  })
  
  taskRouter.post('/', async (req, res) => {
    const ids = await addTask(req.body);
    let task = await getTaskById(ids[0]);
    task = {...task, task_completed: !!task.task_complete}
    res.send(task);
  })

module.exports = taskRouter
