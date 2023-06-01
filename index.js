import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js";
import UsuarioRoutes from "./routes/UsuarioRoutes.js"

const app = express();
app.use(express.json())
dotenv.config();
app.use('/api/usuarios',UsuarioRoutes)
conectarDB();

const Port = process.env.Port || 3000

app.listen(Port, ()=>{
    console.log(`Running on port ${Port}`)})