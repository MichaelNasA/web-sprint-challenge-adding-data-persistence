const { getProjects, addProject, getProjectsById } = require('./model');
// build your `/api/projects` router here

const projectRouter = require('express').Router();

projectRouter.get('/', async (req, res) => {
    let projects =await getProjects();
    projects = projects.map(project => {
        return {...project, project_completed: !!project.project_completed}
    })
    res.send(projects);
  })
  
  projectRouter.post('/', async (req, res) => {
    if (!req.body.project_name) res.sendStatus(500);
    else{
        const ids = await addProject(req.body);
    const project = await getProjectsById(ids[0]);
    res.send({...project, project_completed: !!project.project_completed});
    }
    
  })

module.exports = projectRouter
