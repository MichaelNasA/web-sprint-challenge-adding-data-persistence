// build your `/api/resources` router here
const express = require("express");
const router = express.Router();
const { createResource, getResources } = require("./model"); // Import the model functions

// GET route to fetch all resources
router.get('/', async (req, res) => {
  try {
    const resources = await getResources();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve resources from the database." });
  }
});

// Route to create a new resource
router.post('/', async (req, res) => {
  try {
    const { resource_name, resource_description } = req.body;
    const newResource = await createResource(resource_name, resource_description);
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new resource." });
  }
});

module.exports = router;