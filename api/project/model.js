// build your `Project` model here
const knex = require('../../data/dbConfig');

const createProject = async (name, description = null, completed = false) => {
  console.log(name,description,completed)
  const [projectId] = await knex("projects").insert({
    project_name: name,
    project_description: description,
    project_completed: completed ? 1 : 0, // Store completed as 1 or 0 in the database
  });

  const newProject = await getProjectById(projectId);
  return {
    project_id: newProject.project_id,
    project_name: newProject.project_name,
    project_description: newProject.project_description,
    project_completed: !!newProject.project_completed, // Convert to boolean
  };
};

const getProjects = async () => {
  const projects = await knex("projects").select("project_id", "project_name", "project_description", "project_completed");
  return projects.map(project => ({
    project_id: project.project_id,
    project_name: project.project_name,
    project_description: project.project_description,
    project_completed: !!project.project_completed 
  }));
};

const getProjectById = async (id) => {
  const project = await knex("projects")
    .select("project_id", "project_name", "project_description", "project_completed")
    .where({ project_id: id })
    .first();

  if (!project) {
    return null; // Return null if project with given ID is not found
  }

  // Convert project_completed to a boolean value
  project.project_completed = project.project_completed === 1 ? true : false;

  return project;
};

const updateProject = async (projectId, name, description, completed) => {
  await knex("projects").where({ project_id: projectId }).update({
    project_name: name,
    project_description: description,
    project_completed: completed,
  });
};

const deleteProject = async (projectId) => {
  await knex("projects").where({ project_id: projectId }).del();
};

module.exports = {
  createProject,
  getProjectById,
  getProjects,
  updateProject,
  deleteProject
};