import { Router } from "express";
import { login, register } from "../controllers/user.controllers.js";
import { checkUserCredentials } from "../models/login/login.js";
import jwt from 'jsonwebtoken';

const router = Router();
router.post("/register", register);
router.post("/login", login);



/*
##################################################################################################
#                          Endpoint para inicio de  sesion                                       #
##################################################################################################
*/
// Ruta para login
router.post('/auth/login', async (req, res) => {
  console.log("Body recibido:", req.body); // <== AÑADE ESTO

  const { usuario: username, contrasena: password } = req.body;

  const user = await checkUserCredentials(username, password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ id: user._id, username: user.username }, 'secretKey', { expiresIn: '1h' });

  return res.json({ message: 'Login exitoso', token });
});



export default router;
