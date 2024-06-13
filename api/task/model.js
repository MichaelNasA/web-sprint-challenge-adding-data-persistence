// build your `Project` model here
const db = require('../../data/dbConfig')

const getTasks = async () =>{
  return await db('tasks').select('*');
}

const getTaskById = async (id) =>{
  return await db('tasks').select('*').where({tasks_id: id}).first();
}

const addTask = async (newTask) => { 
  return await db('tasks').insert(newTask);
}

module.exports = { 
  getTasks,
  addTask,
  getTaskById
}