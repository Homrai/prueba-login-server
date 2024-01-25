import mongoose from "mongoose";
console.log(process.env.DATABASE);
try {
    await mongoose.connect(process.env.DATABASE);
    console.log("conectado a la DB");
} catch (error) {
    console.log(error);
}