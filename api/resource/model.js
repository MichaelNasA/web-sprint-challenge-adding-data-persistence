// build your `Resource` model here
const db = require('../../data/dbConfig')

const getResources = async () =>{
  return await db('resources').select('*');
}

const getResourcesById = async (id) =>{
  return await db('resources').select('*').where({resource_id: id}).first();
}

const addResource = async (newResource) => {
  return await db('resources').insert(newResource);
}

module.exports = { 
  getResources,
  addResource,
  getResourcesById
}