import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import rootRouter from "./routes/index.js";
import connectDB from "./configs/db.js";

connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
