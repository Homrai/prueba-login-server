import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.DATABASE);
    console.log("conectado a la DB");
} catch (error) {
    console.log(error);
}