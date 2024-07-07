import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import rootRouter from "./routes/index.js";
import connectDB from "./configs/db.js";

connectDB();

const app = express();

const allowedOrigins = ["https//paytm-wallet-client.vercel.app"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", rootRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
