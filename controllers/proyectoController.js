import mongoose from 'mongoose';
import Proyecto from '../models/Proyecto.js'

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
    res.json(proyecto)

}
const editarProyecto = async(req,res)=>{

}
const eliminarProyecto = async(req,res)=>{

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