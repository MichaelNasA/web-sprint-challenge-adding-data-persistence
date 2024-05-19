// build your `/api/projects` router here
const express = require('express');
const router = express.Router();
const { getProjects, createProject, getProjectById, updateProject } = require('./model');

// Route to get all projects
router.get("", async (req, res) => {
  try {
    const projects = await getProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve projects." });
  }
});

router.post("", async (req, res) => {
  try {
    let { project_name, project_description, project_completed } = req.body;
    // Ensure required fields are provided
    if (project_completed === undefined) project_completed = false;
    // Validate required fields
    if (!project_name) {
      return res.status(400).json({
        error: "Invalid project data. Please provide name, description, and completed (as a boolean).",
      });
    }
    const newProject = await createProject(project_name, project_description, project_completed);
    res.status(201).json(newProject); // Return the newly created project directly
  } catch (error) {
    res.status(500).json({ error: "Failed to create project." });
  }
});

// Route to update an existing project
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    await updateProject(id, name, description, completed);
    const updatedProject = await getProjectById(id);
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project." });
  }
});

// Route to get a project by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProjectById(id);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve project." });
  }
});

module.exports = router;