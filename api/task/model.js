// build your `Resource` model here
// build your `Resource` model here
const knex = require("../../data/dbConfig");

const createResource = async (name, description) => {
  const [resourceId] = await knex("resources").insert({
    resource_name: name,
    resource_description: description,
  });

  const newResource = await getResourceById(resourceId);
  return newResource;
};

const getResources = async () => {
  const resources = await knex("resources").select("resource_id", "resource_name", "resource_description");
  return resources;
};

const getResourceById = async (id) => {
  const resource = await knex("resources")
    .select("resource_id", "resource_name", "resource_description")
    .where({ resource_id: id })
    .first();

  return resource;
};

module.exports = {
  createResource,
  getResourceById,
  getResources
};