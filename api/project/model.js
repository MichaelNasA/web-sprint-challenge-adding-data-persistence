// build your `Project` model here
const db = require('../../data/dbConfig')

const getProjects = async () =>{
  return await db('projects').select('*');
}

const getProjectsById = async (id) =>{
  return await db('projects').select('*').where({projects_id: id}).first();
}

const addProject = async (newProject) => {
  return await db('projects').insert(newProject);
}

module.exports = { 
  getProjects,
  addProject,
  getProjectsById
}