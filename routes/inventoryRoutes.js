const express = require('express')
const router = express.Router();

const { getAllInventories, getInventoryByFilter, getInventoryById, createInventory, updateInventory, updateAnyInventory, deleteInventory } = require("../controllers/inventoryCOntoller")
const validateInventory = require('../middleware/validation')


router.get("/", getAllInventories)
router.get("/getInventoryByFilter", getInventoryByFilter)
router.get("/:id", getInventoryById)
router.post("/addInventory", validateInventory, createInventory)
router.put("/updateInventory/:id", validateInventory, updateInventory)
router.patch("/updateAnyInventory/:id", updateAnyInventory)
router.delete("/deleteInventory/:id", deleteInventory)

module.exports = router