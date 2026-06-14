let inventories = require("../model/inventoryData")

const getAllInventories = (req, res) => {
    res.status(200).json({ success: true, message: "Successfully fetched all inventories", data: inventories });
}

const createInventory = (req, res) => {
    const { name, category, quantity, price } = req.body;

    const newInventory = {
        id: inventories.length + 1,
        name,
        category,
        quantity,
        price
    }
    inventories.push(newInventory)
    res.status(201).json({ message: "Successfully added inventories", data: inventories, success: true });
}

const updateInventory = (req, res) => {
    const id = Number(req.params.id)

    const index = inventories.findIndex(item => item.id === id)

    if (index === -1) {
        return res.status(404).json({ message: "Inventory id not found", success: false })
    }
    inventories[index] = {
        id,
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        price: req.body.price
    }
    res.status(200).json({ success: true, message: "Successfully updated inventory" });
}

const updateAnyInventory = (req, res) => {
    const id = Number(req.params.id)

    const index = inventories.find(item => item.id === id)

    if (!index) {
        return res.status(404).json({ message: "Inventory id not found", success: false })
    }
    if (req.body.name) {
        index.name = req.body.name
    }
    if (req.body.category) {
        index.category = req.body.category
    }
    if (req.body.quantity) {
        index.quantity = req.body.quantity
    }
    if (req.body.price) {
        index.price = req.body.price
    }
    res.status(200).json({ success: true, message: "Successfully updated inventory" });
}

const deleteInventory = (req, res) => {
    const id = Number(req.params.id)
    const index = inventories.findIndex(item => item.id === id)

    if (index === -1) {
        return res.status(404).json({ message: "Inventory id not found", success: false })
    }
    inventories.splice(index, 1);
    res.status(200).json({ message: "Inventory deleted successfully", success: true })
}

const getInventoryByFilter = (req, res) => {
    const { category, quantity, search } = req.query;

    if (category) {
        inventories = inventories.filter(
            item => item.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (quantity) {
        inventories = inventories.filter(
            item => item.quantity >= Number(quantity)
        );
    }

    if (search) {
        inventories = inventories.filter(
            item =>
                item.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.json({
        success: true,
        count: inventories.length,
        data: inventories,
        message: inventories.length === 0 ? "No items found" : "Successfully fetched filtered items"
    });
}

const getInventoryById = (req, res) => {
    const id = Number(req.params.id);

    const index = inventories.find(
        item => item.id === id
    );

    if (!index) {
        return res.status(404).json({
            success: false,
            message: "Inventory not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Successfully fetched inventory by id",
        data: index
    });
}

module.exports = { getAllInventories, getInventoryById, getInventoryByFilter, createInventory, updateInventory, updateAnyInventory, deleteInventory }