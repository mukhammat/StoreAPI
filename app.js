require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
const notFoundMiddleware = require('./middleware/error-handler');
const errorMiddleware = require('./middleware/not-found');

// middleware
app.use(express.json());

// routes

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
});

app.use('/api/v1/products', productsRouter);

//products router

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        //conectDB
        await connectDB(process.env.MONGO_URI); 
        app.listen(port, console.log(`Server is litening port ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start();
