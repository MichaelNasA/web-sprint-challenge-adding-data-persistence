const { getResources, addResource, getResourcesById } = require('./model');

// build your `/api/resources` router here
const resourceRouter = require('express').Router();

resourceRouter.get('/', async (req, res) => {
  const resources =await getResources();
  res.send(resources);
})

resourceRouter.post('/', async (req, res) => {
  try {
    const ids = await addResource(req.body);
  const result = await getResourcesById(ids[0]);
  res.send(result);
  } catch (e) {
    res.sendStatus(500)
  }
  
})

module.exports = resourceRouter
