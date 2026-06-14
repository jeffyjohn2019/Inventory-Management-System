const validateInventory = (req, res, next) => {

    const { name, category, quantity, price } = req.body
    if (!name || !category || !quantity || !price || quantity === undefined || price === undefined) {
        return res.status(400).json({
            success: false, message: "All fields are required"
        })
    }
    if (quantity < 0) {
        return res.status(400).json({
            success: false,
            message: "Quantity cannot be negative"
        });
    }
    if (price < 0) {
        return res.status(400).json({
            success: false,
            message: "Price cannot be negative"
        });
    }
    next()
}

module.exports = validateInventory