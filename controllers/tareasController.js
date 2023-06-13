import Tarea from "../models/Tarea.js"
import Proyecto from "../models/Proyecto.js"

const agregarTarea = async(req,res)=>{
   const {proyecto} = req.body
   const existeProyecto = await Proyecto.findById(proyecto)
   if(!proyecto){
        const error = new Error("No existe el proyecto")
        return res.status(404).json({msg: error.message})
   }
   if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no permitida")
        return res.status(401).json({msg: error.message})
   }
   try{
        const tareaAlmacenada = new Tarea(req.body)
        await tareaAlmacenada.save()
        return res.json(tareaAlmacenada)
   }
   catch(e){
        console.log(e)
   }
} 
const obtenerTarea = async(req,res)=>{
    const {id} = req.params
    //El populate realiza una consulta doble sustituyendo el campo proyecto del
    //modelo Tarea por el proyecto completo del modelo proyecto
    
    const tarea = await Tarea.findById(id).populate("proyecto")
    if (!tarea){
        const error = new Error("Tarea no existe")
        return res.status(404).json({msg: error.message})
    }
    if(tarea.proyecto.creador.toString()!== req.usuario._id.toString()){
        const error = new Error("Acción no permitida")
        return res.status(403).json({msg: error.message})
    }
    res.json(tarea)
} 
const editarTarea = async(req,res)=>{

} 
const eliminarTarea = async(req,res)=>{

} 
const cambiarEstado = async(req,res)=>{

}
export{
    agregarTarea, 
    obtenerTarea, 
    editarTarea, 
    eliminarTarea, 
    cambiarEstado
}