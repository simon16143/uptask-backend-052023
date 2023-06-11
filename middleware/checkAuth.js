import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.js"

const checkAuth = async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            //obtengo el token eliminado el bearer
            token = req.headers.authorization.split(" ")[1]
            //decodifico el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -__v -token")
            return next()
        }
        catch(e){
            return res.status(400).json({msg: "Hubo un error"})

        }        

    }
    if(!token){
        const error = new Error("Token no válido")
        return res.status(401).json({msg: error.message})
    }
    next()
}
export default checkAuth