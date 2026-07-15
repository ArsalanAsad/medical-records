import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";

dotenv.config();

console.log("CLIENT_URL FROM ENV:", process.env.CLIENT_URL);

const app = express();

connectDB();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:3000",
//   process.env.CLIENT_URL,
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Postman ya server-to-server requests ko allow kare
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "https://medical-records-nn26.vercel.app",
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "MediVault API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});