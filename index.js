import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js";
import UsuarioRoutes from "./routes/UsuarioRoutes.js"
import ProyectoRoutes from "./routes/ProyectoRoutes.js"
import TareaRoutes from './routes/TareaRoutes.js'
import cors from "cors"

const app = express();
app.use(express.json())
dotenv.config();
conectarDB();
//Configurar CORS
const whiteList = [process.env.FRONTEND_URL]
const corsOptions= {
    origin : function(origin,callback){
        if(whiteList.includes(origin) !== -1){
            //permite consultar la API
            callback(null,true)
        }else{
            //No permite consultar la API
            callback(new Error('No permitido por CORS'))
        }
    }
}
app.use(cors(corsOptions))

app.use('/api/usuarios',UsuarioRoutes)
app.use('/api/proyectos',ProyectoRoutes)
app.use('/api/tareas',TareaRoutes)




const Port = process.env.Port || 3000

app.listen(Port, ()=>{
    console.log(`Running on port ${Port}`)})