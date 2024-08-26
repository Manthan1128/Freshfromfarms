import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import bodyParser from "body-parser";
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
//configure env
dotenv.config();


//database config
connectDB();

//rest object 
const app = express();

//middlewares
// app.use(cors());
app.use(cors({
    origin: 'https://freshfromfarms.vercel.app', // Your Vercel frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Allow credentials like cookies
    allowedHeaders: 'Content-Type,Authorization' // Add any other headers you need to allow
}));

app.use(express.json());
app.use(morgan('dev'));

//routes 
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

//rest api
app.get("/",(req, res) => {
    res.send("<h1>Welcome to an ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen 
app.listen(8080, () =>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
