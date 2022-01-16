const mongoose = require("mongoose");
require("dotenv").config();

const initMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_ATLAS_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .catch((err: any) => {
      console.log(err.message);
    });

  mongoose.connection.on("error", (err: any) => {
    console.log(err.message);
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

export default initMongoDB;
