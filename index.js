import 'dotenv/config'
import express from "express";
import router from "./src/routes/auth.router.js";
import "./src/db/config.js";
import cors from "cors";
import bodyParser from 'body-parser';
const app = express();
const Port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
const whiteList=[
    process.env.ORIGIN1,
    "https://prueba-login-front.vercel.app"
];
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(
    cors({
        origin:(origin, callback)=>{
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin)
            }
            return callback("Protegido por CORS :"+ origin + "No autorizado!")
        },
        corsOptions
    })
);
app.use("",router);

app.listen(Port,()=>{
    console.log("servidor iniciado en el puerto: " + Port);
});