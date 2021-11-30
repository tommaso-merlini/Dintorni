const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_ATLAS_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((err) => {
    console.log(err.message);
  });

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
