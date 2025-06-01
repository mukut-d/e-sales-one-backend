const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const OrderRoutes = require("./routes/orderSummary");

require("dotenv").config();

const app = express();
app.use(express.json());

// Example Route
// app.get("/", async (req, res) => {
//   res.send({ message: "Awesome it works" });
// });

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://e-sales-qg27ch8t5-mukut-ds-projects.vercel.app",
  ],
  method: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.options("/create", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use("/", OrderRoutes);
connectDB();

const PORT = process.env.PORT || 8000;
const BASE_URL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Server running at ${BASE_URL}`);
});
