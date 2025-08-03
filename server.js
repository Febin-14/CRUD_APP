const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contacts");
require("dotenv").config();

const app = express();
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/contacts", contactRoutes);
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running! Access it at your Render URL`);

});
