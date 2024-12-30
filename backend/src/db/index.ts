import mongoose from "mongoose";

const connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URI}/${process.env.DB_NAME}`
    );
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`Error in database connection file: ${error}`);
    process.exit(1);
  }
};

export default connect;
