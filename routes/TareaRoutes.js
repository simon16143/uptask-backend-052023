import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import {agregarTarea, obtenerTarea, editarTarea, eliminarTarea, cambiarEstado} from '../controllers/tareasController.js'

const router = express.Router()

//Agregar una nueva tarea
router.post('/',checkAuth,agregarTarea)

//Se debe usar el id de la tarea no del proyecto
router.route('/:id')
.get(checkAuth,obtenerTarea)
.put(checkAuth,editarTarea)
.delete(checkAuth,eliminarTarea)

router.post('/cambiar-estado',checkAuth,cambiarEstado)

export default router