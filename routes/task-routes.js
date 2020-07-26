const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Project = require('../models/project-model')
const Task = require('../models/task-model')


router
  .post('/tasks', async (req, res, next) => {
    try {
      const {title, description, project} = req.body;
      const task = await Task.create({
        title,
        description,
        project
      })
      res.json(task)
    } catch (error) {
      next(error)
    }
  })
  .get('/tasks/:id', async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id)
      res.json(task)
    } catch (error) {
      next(error)
    }
  })
  .put('/tasks/:id', async (req, res, next) => {
    try {
      const taskId = req.params.id;
      const { title, description, project } = req.body;
      const taskData = {
        title,
        description,
        project
      }
      const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, {new: true})
      res.json(updatedTask)
    } catch (error) {
      next(error)
    }
  })
  .delete('/tasks/:id', async (req, res, next) => {
    try {
      const taskId = req.params.id;
      const deletedTask = await Task.findByIdAndRemove(taskId)
      res.json(deletedTask)
    } catch (error) {
      next(error)
    }
  })

module.exports = router