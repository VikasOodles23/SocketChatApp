import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoutes.js";
import connectMongoDB from "./db/connectMongoDB.js";
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// parse incoming data
app.use(express.json());
// auth
app.use("/api/auth", authRoute);

// root route
// app.get("/", (req, res) => {
//   res.send("Working Perfectly");
// });

app.listen(PORT, () => {
  connectMongoDB();
  console.log("Server Running on port " + PORT);
});
