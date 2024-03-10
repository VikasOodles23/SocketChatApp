import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL).then(() => {
      console.log("Connected to Mongo Db");
    });
  } catch (error) {
    console.log("Error Connecting Mongo DB.");
  }
};
