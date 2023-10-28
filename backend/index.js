const mongoose = require("mongoose");
const app = require("./src/app");
const config = require("./src/config/config");


mongoose.connect(config.mongoose.url).then(() => {

  console.log("Connected to MongoDB");

});

// Start the Node server
app.listen(config.port, () => {
  console.log(`App is running on port ${config.port}`);
});