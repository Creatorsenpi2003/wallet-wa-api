import express from "express";
import dotenv, { parse } from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimitter.js";
import transactionsRoutes from "./Routes/transactionsRoutes.js";

dotenv.config();


const app = express();
///middlewares
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001

app.use("/api/transactions", transactionsRoutes);

initDB().then(() =>{
   app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
   });
})