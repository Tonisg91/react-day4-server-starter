const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Project = require('../models/project-model')
const Task = require('../models/task-model')

router
  .get('/projects', (req, res, next) => {
    Project.find()
      .then(project => {res.json(project)})
      .catch(err => {res.json(err)})
  })
  .post('/projects', (req, res, next) => {
    Project.create({
      title: req.body.title,
      description: req.body.description,
      tasks: []
    })
    .then(project => {res.json(project)})
    .catch(err => {res.json(err)})
  })

router
  .get('/projects/:id', (req, res, next) => {
    Project
      .findById(req.params.id)
      .then(project => res.json(project))
      .catch(err => console.error(err))
  })
  .put('/projects/:id', async (req, res, next) => {
    try {
      const projectId = req.params.id
      const {title, description, tasks } = req.body
      const projectData = {
        title,
        description,
        tasks
      }
      const projectUpdated = await Project
        .findByIdAndUpdate(
          projectId, 
          projectData, 
          {new: true}
        )
      res.json(projectUpdated)
    } catch (error) {
      console.error(error)
    }
  })
  .delete('/projects/:id', async (req, res, next) => {
    try {
      const projectId = req.params.id
      const deleteProject = await Project.findByIdAndDelete(projectId)
      res.json(deleteProject)
    } catch (error) {
      console.error(error)
    }
  })



module.exports = router