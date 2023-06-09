import { connect, connection } from "mongoose";

const connectDB = async () => {
  try {
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
    
    await connect(process.env.MONGO_URI, options);
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;