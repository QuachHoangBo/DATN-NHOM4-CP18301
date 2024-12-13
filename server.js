require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const MONGO_URI = process.env.MONGO_URI;

const bodyParser = require("body-parser");
const LoginRouter = require("./routes/auth");
const locationRouter = require("./routes/locations");
const carRouter = require("./routes/car");
const offerRouter = require("./routes/offer");
const AvailabeRouter = require("./routes/available");
const FavoriteRouter = require("./routes/favorite");
const bookingRoutes = require("./routes/booking");

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

app.use(express.static("assets"));
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", LoginRouter);
app.use("/api", locationRouter);
app.use("/api", carRouter);
app.use("/api", offerRouter);
app.use("/api", AvailabeRouter);
app.use("/api", FavoriteRouter);
app.use("/api/bookings", bookingRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
