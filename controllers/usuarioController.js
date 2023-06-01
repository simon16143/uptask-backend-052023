import Usuario from "../models/Usuario.js";
import generarID from "../helpers/generarID.js";
import generarToken from "../helpers/generarToken.js"

//registrar un nuevo usuario
const registraUsuario = async(req,res)=>{
    const {email} = req.body
    const existeUsuario = await Usuario.findOne({email})
    if (existeUsuario){
        const error = new Error("Usuario ya esta registrado")
        return res.status(400).json({msg: error.message})
    } 
    try{
        const usuario = new Usuario(req.body)
        usuario.token = generarID()
        const nuevoUsuario = await usuario.save()
        res.json(nuevoUsuario)

    }
    catch(e){
        console.log(e.message)
    }
}
const autenticar = async(req,res) =>{
    //comprobar que el usuario exista
    const {email,password} = req.body
    const validarUsuario = await Usuario.findOne(email)
    if(!validarUsuario){
        const error = new Error("Usuario no registrado")
        return res.status(400).json({msg: error.message})
    }
    //comprobar que este confirmado
    if(!validarUsuario.confirmado){
        const error = new Error("Usuario no se encuentra confirmado")
        return res.status(403).json({msg: error.message})
    }
    //comprobar el password
    if(await validarUsuario.comprobarPassword(password)){
        res.json({
            _id: validarUsuario._id,
            nombre:validarUsuario.nombre,
            email: validarUsuario.email,
            token: generarToken(validarUsuario._id)
        })
    }
} 
//Confirmar la cuenta a través de un token
const confirmar = async(req,res) => {
    const {token} = req.params;
    const confirmarUsuario = await Usuario.findOne({token})
    if(!confirmarUsuario){
        const error = new Error("Token no válido")
        return res.status(403).json({msg: error.message})
    }

    try{
        confirmarUsuario.confirmado = true;
        confirmarUsuario.token = ""
        await confirmarUsuario.save()
        res.json({msg: "Usuario confirmado con éxito"})
    }
    catch(e){
        console.log(e)
    }
}
//Olvide la contraseña
const resetearPassword = async(req,res) =>{
    const {email} = req.body
    const validarUsuario = await Usuario.findOne({email})
    if(!validarUsuario){
        const error = new Error("Usuario no encontrado")
        return res.status(400).json(error.message)
    }else{
        validarUsuario.token = generarID()
        await validarUsuario.save()
        res.json({msg: "Hemos enviado un email con las instrucciones"})
    }
}
//comprobar que el token enviado al correo sea valido
const comprobarToken = async(req,res) => {
    const {token} = req.params
    const validarToken = await Usuario.findOne({token})
    if(!validarToken){
        const error = new Error("Token no válido");
        return res.status(404).json({msg: error.message})

    }else{
        res.json({msg: "El usuario existe y el token es válido"})     
    }
}
//Almacenar el nuevo token
const almacenarPassword = async(req,res)=>{
    const {token} = req.params
    const {password} = req.body
    const nuevoPassword = await Usuario.findOne({token})
    if(nuevoPassword){
        nuevoPassword.token = "";
        nuevoPassword.password = password;
        await nuevoPassword.save()


    }

}
export {
    registraUsuario,
    autenticar,
    confirmar,
    resetearPassword,
    comprobarToken,
    almacenarPassword
}