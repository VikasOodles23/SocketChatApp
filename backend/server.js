import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoutes.js";
import messageRoute from "./routes/messageRoute.js";
import userRoute from "./routes/userRoute.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// parse incoming data
app.use(express.json());
app.use(cookieParser());
// auth
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

// root route
// app.get("/", (req, res) => {
//   res.send("Working Perfectly");
// });

app.listen(PORT, () => {
  connectMongoDB();
  console.log("Server Running on port " + PORT);
});
