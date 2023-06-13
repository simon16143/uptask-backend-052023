import mongoose from 'mongoose';
import Proyecto from '../models/Proyecto.js'
import Tarea from "../models/Tarea.js"

//obtener todos los proyectos creados
const obtenerProyectos = async(req,res)=>{
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario);
    res.json(proyectos)

}

//crear un nuevo proyecto
const nuevoProyecto = async(req,res)=>{
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id
    try{
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)

    }
    catch(e){
        console.log(e.message)
    }

}

const obtenerProyecto = async(req,res)=>{
    const {id} = req.params
    const proyecto = await Proyecto.findById(id)
    if(!proyecto){
        const error = new Error("No se encontro ningún proyecto")
        return res.status(404).json({msg: error.message})
    } 
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida")
        return res.status(401).json({msg: error.message})
    }
    //Obtener las tareas del proyecto
    const tareas = await Tarea.find().where("proyecto").equals(proyecto._id)
    res.json({
        proyecto,
        tareas,
    })

}
const editarProyecto = async(req,res)=>{
    const {id} = req.params
    const proyecto = await Proyecto.findById(id)
    if(!proyecto){
        const error = new Error("No se encontro un proyecto")
        return res.status(404).json({msg: error.message})
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error(!"Acción no valida")
        return res.status(401).json({msg: error.message})
    }
    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.client = req.body.client || proyecto.client;
    try{
        const proyectoEditado = await proyecto.save();
        return res.json(proyectoEditado)
    }
    catch(e){
        console.log(e)
    }
}
const eliminarProyecto = async(req,res)=>{
    const {id} = req.params
    const proyecto = await Proyecto.findById(id)
    if(!proyecto){
        const error = new Error("Proyecto no encontrado")
        return res.status(404).json({msg: error.message})    
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida")
        return res.status(401).json({msg: error.message})
        }
    try{
        await proyecto.deleteOne()
        res.json({msg: "Proyecto eliminado con exito"})
    }
    catch(e){
        console.log(e)
    }


}
const agregarColaborador = async(req,res)=>{

}
const eliminarColaborador = async(req,res)=>{
    
}
export{
    nuevoProyecto, 
    obtenerProyectos, 
    obtenerProyecto,
    editarProyecto, 
    eliminarProyecto, 
    agregarColaborador, 
    eliminarColaborador
}