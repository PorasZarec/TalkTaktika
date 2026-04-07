import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Mount Routes
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});