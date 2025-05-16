import jwt from 'jsonwebtoken';

export const verificarmaterias = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Materia no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.usuario = decoded;  // Ahora puedes acceder a `req.usuario` en otras rutas
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Error al entrar a las materias' });
  }
};
