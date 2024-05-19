// build your `Task` model here
// build your `Task` model here
// build your `Task` model here
const knex = require('../../data/dbConfig');

const getAllTasks = async () => {
  const tasks = await knex('tasks')
    .join('projects', 'tasks.project_id', 'projects.project_id')
    .select(
      'tasks.task_id',
      'tasks.task_description',
      'tasks.task_notes',
      'projects.project_name',
      'tasks.task_completed',
      'projects.project_description'
    );
  return tasks;
};

const createTask = async (projectId, description, notes) => {
  const [taskId] = await knex("tasks").insert({
    project_id: projectId,
    task_description: description,
    task_notes: notes,
  });
  const newTask = await getTaskById(taskId);
  // Convert task_completed to boolean
  newTask.task_completed = !!newTask.task_completed;
  return newTask;
};

const getTaskById = async (id) => {
  const task = await knex('tasks')
    .join('projects', 'tasks.project_id', 'projects.project_id')
    .select(
      'tasks.task_id',
      'tasks.task_description',
      'tasks.task_notes',
      'tasks.task_completed',
      'projects.project_name',
      'projects.project_description'
    )
    .where('tasks.task_id', id)
    .first();
  return task;
};

module.exports = {
  getAllTasks,
  createTask,
};