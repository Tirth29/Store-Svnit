import mongoose from "mongoose";
console.log(process.env.MONGO_URI);
export const connectDB = async () => {
  try {
    const {connection} = await mongoose.connect(process.env.MONGO_URI, {
        // dbName:"sample_training"
    });
    console.log(`server connected to databse ${connection.host}`);
  } catch (error) {
    console.log("some error occured", error);
    process.exit(1);
  }
};
