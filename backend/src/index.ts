import dotenv from "dotenv";
import app from "./app.js";
import connect from "./db/index.js";

dotenv.config();

app.on("error", (error) => {
  console.log(`Application error: ${error}`);
  process.exit(1);
});

connect()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(`MongoDB connection failed: ${err}`));
