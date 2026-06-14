require('dotenv').config();
const express = require('express')
const loggerMiddleware = require('./middleware/loggerMiddleware')
const errorHandler = require('./middleware/errorHandler')

const inventoryRoutes = require("./routes/inventoryRoutes")

const app = express();

app.use(express.json())
app.use(loggerMiddleware)

app.get('/', (req, res) => {
    res.send('Inventory management system')
})

app.use("/inventory", inventoryRoutes)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server listening at ${PORT} `)
})