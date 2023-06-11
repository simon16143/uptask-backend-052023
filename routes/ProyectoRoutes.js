import express from "express"
import checkAuth from "../middleware/checkAuth.js"
import {nuevoProyecto, obtenerProyectos, obtenerProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador} from "../controllers/proyectoController.js"

const router = express.Router()

//Routes anidadas para obtener los proyectos y para crear uno nuevo
router.route('/').post(checkAuth,nuevoProyecto).get(checkAuth,obtenerProyectos)

//Rutas que requieren el id
router.route('/:id')
//Encontrar el proyecto por el id
.get(checkAuth,obtenerProyecto)
//Actualizar el proyecto
.put(checkAuth,editarProyecto)
//Borrar por completo el proyecto
.delete(checkAuth,eliminarProyecto)

router.post('/agregar-colaborador/:id',checkAuth,agregarColaborador)
router.post('/agregar-colaborador/:id',checkAuth,eliminarColaborador)

export default router