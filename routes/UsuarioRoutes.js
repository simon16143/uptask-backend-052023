import express from "express"
import { registraUsuario, autenticar, confirmar, resetearPassword, comprobarToken,almacenarPassword} from "../controllers/usuarioController.js"

const router = express.Router()
//Routes para usuarios externos
router.post('/',registraUsuario)
router.post('/autenticar',autenticar)
router.get('/confirmar/:token',confirmar)
router.post('/olvide-password/',resetearPassword)
router.route('/olvide-password/:token').get(comprobarToken).post(almacenarPassword)

//Middleware para usuarios autenticados
export default router