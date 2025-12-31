const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config({ path: "./.env" });

app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

const connectDB = require("./DB/conn");

// Models
require("./model/userSchema");
require("./model/hallSchema");
require("./model/bookingSchema");
require("./model/assetSchema");

// Routes
app.use(require("./router/authRoutes"));
app.use(require("./router/bookingRoutes"));
app.use(require("./router/hallRoutes"));

const assetRoutes = require("./router/assetRoutes");
app.use("/api/assets", assetRoutes);

// DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
