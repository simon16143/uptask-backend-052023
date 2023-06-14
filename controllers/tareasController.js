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
    const {id} = req.params
    const tarea = await Tarea.findById(id).populate("proyecto")
    if(!tarea){
        const error = new Error("Tarea no encontrada")
        return res.status(404).json({msg: error.message})
    }
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida")
        return res.status(403).json({msg: error.message})
    }
    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    tarea.prioridad = req.body.prioridad || tarea.prioridad
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega
    try{
        const tareaActualizada = await tarea.save()
        return res.json(tareaActualizada)
    }
    catch(e){
        console.log(e)
    }
} 
const eliminarTarea = async(req,res)=>{
    const {id} = req.params
    const tarea = await Tarea.findById(id).populate("proyecto")
    if(!tarea){
        const error = new Error("Tarea no encontrada")
        return res.status(404).json({msg: error.message})
    }
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida")
        return res.status(403).json({msg: error.message})
    }
    try{
        const tareaEliminada = await tarea.deleteOne()
        return res.json({msg: "Tarea eliminada con exito"})
    }
    catch(e){
        console.log(e)
    }
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