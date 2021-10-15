import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    if (process.env.DB_CNN_STRING) {
      await mongoose.connect(process.env.DB_CNN_STRING);
      console.log("DB online");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos - ver logs");
  }
};
