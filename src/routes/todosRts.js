const express = require('express');
let router = new express.Router();
const controller = require('../controllers/todosCtrl');

//get summary of items
router.get("/todos", controller.itemsSummary); //create the piping for using the function itemsSummary to execute. But don't use itemsSummary() because we don't want to automatically execute the function after we have typed it. Just using the variable to access the function.

//get detail of single item, given its id
router.get("/todos/:id", controller.itemDetails);

//create a new item
router.post("/todos", controller.createItem);

//update an existing item, given its id
router.put("/todos/:id", controller.updateItem);

//delete an item given its id
router.delete("/todos/:id", controller.deleteItem);

module.exports = router;