const { getProjects, addProject, getProjectsById } = require('./model');
// build your `/api/projects` router here

const projectRouter = require('express').Router();

projectRouter.get('/', async (req, res) => {
    let projects =await getProjects();
    projects = projects.maps(project => {
        return {...project, project_completed: !!project.project_completed}
    })
    res.send(projects);
  })
  
  projectRouter.post('/', async (req, res) => {
    const ids = await addProject(req.body);
    const project = await getProjectsById(ids[0]);
    res.send(project);
  })

module.exports = projectRouter
