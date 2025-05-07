import { Router } from "express";
import { login, register } from "../controllers/user.controllers.js";
import { checkUserCredentials } from "../models/login/login.js";
import { signup } from "../models/signup/signup.js";
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
  console.log("Body recibido:", req.body); 

  const { usuario: username, contrasena: password } = req.body;

  const user = await checkUserCredentials(username, password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ id: user._id, username: user.username }, 'secretKey', { expiresIn: '1h' });

  return res.json({ message: 'Login exitoso', token });
});

/*
##################################################################################################
#                          Endpoint para registrarse                                             #
##################################################################################################
*/

//Ruta  de endpoint para registrar un usuario
router.post('/auth/signup', async (req, res) => {
  const {usuario,email,contrasena} = req.body;

  // Validaciones adicionales
  if (
    !usuario || !email || !contrasena
  ) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevousuario = await signup( usuario,email,contrasena);
    return res.status(201).json({ message: '  Usuario registrado exitosamente', data: nuevousuario });
  } catch (error) {
    console.error('Error al registrar El usuario:', error);
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});
export default router;
