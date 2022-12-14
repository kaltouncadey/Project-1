const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const cors = require('cors')

const port = process.env.port;  

//middlewares new 

app.use(express.json())
app.use(cors())

// USERS

const userroute = require("./routers/userrouter");
app.use("/api/users", userroute)  

// Teachers

const teachroute = require("./routers/teacherrouter");
app.use("/api/teach", teachroute);   

//product

const products =  require('./routers/productRouter')
app.use('/api/product', products)

// messages

const message =  require('./routers/messagsRouter')
app.use('/api/message', message)




app.listen(port, () => console.log(`Hello Server ${port}`));

