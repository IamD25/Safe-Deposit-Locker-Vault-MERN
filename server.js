import express from "express";
import path from "path";
import methodOverride from "method-override";
import connectDB  from "./config/db.js";
import colors   from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoute from './routes/authRoute.js'; 
import lockerRooutes from './routes/lockerRoutes.js'
import requestRoute from './routes/requestRoute.js'
import accessRoute from './routes/lockerAccessRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import userRoute from './routes/userRoute.js'
// import path from "path";
import { fileURLToPath } from "url";

import cors from 'cors'
const port = process.env.port || 8080;   


//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve Static Files (for image access)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static("uploads")); // Serve uploaded images


// app.use(express.urlencoded({extended : true}));
// app.use(methodOverride("_method"));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/locker",lockerRooutes);
app.use("/api/v1/request",requestRoute);
app.use("/api/v1/access",accessRoute);
app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/user",userRoute);

//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Ecommerce app MERN Stack Project</h1> ");
});


//run listen
app.listen(port, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white);
});

// const mongoose = require("mongoose");
// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/test");    
// }

// main() 
//     .then(() => {
//         console.log("Database Connection Successful");
//     })
//     .catch((err) => console.log(err));
