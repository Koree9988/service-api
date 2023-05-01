const express = require('express');
const router = express.Router();
const FaultController = require("../controller/fault.controller.js")
const FaultService = require("../services/faultline-data.services")

router.get('/faultline/:id', async (req, res) => {
  try {
    const id = req.params.id
    const getFaultData = await FaultService.getFaultData(id)
    res.send(getFaultData)
  } catch (error) {
    console.log("🚀  error:", error)
  }
});

router.get('/faultline/name/:id', async (req, res) => {
  try {
    const id = req.params.id
    const getFaultData = await FaultService.getFaultName(id)
    res.send(getFaultData)
  } catch (error) {
    console.log("🚀  error:", error)
  }
});

router.get('/separate/faultline/:id', async (req, res) => {
  try {
    const id = req.params.id
    const getFaultData = await FaultService.getFaultDataSeparateEach5Year(id)
    res.send(getFaultData)
  } catch (error) {
    console.log("🚀  error:", error)
  }
});

router.get('/data/separate/faultline/:id', async (req, res) => {
  try {
    const id = req.params.id
    const getFaultData = await FaultController.getSeparateFaultLineById(id)
    res.send(getFaultData)
  } catch (error) {
    console.log("🚀  error:", error)
  }
});

router.post('/find/foultline', function (req, res) {
  try {
    res.send('User Home Page');
  } catch (error) {
    console.log("🚀  error:", error)
  }

});

module.exports = function (app) {
  app.use('/earthquake', router);
}




