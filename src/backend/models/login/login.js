import User from "../usuarios/user.js"; // Asegúrate de que el modelo se importe correctamente

// Función para verificar las credenciales del usuario
export const checkUserCredentials = async (username, password) => {
  try {
    // Consultamos el usuario en la base de datos
    const user = await User.findOne({ username });

    // Si no encontramos el usuario, lo retornamos como null
    if (!user) {
      return null;
    }

    // Comparamos la contraseña ingresada con la almacenada en la base de datos
    if (user.password !== password) {
      return null;  // Si las contraseñas no coinciden, retornamos null
    }

    // Si las credenciales son correctas, devolvemos el usuario
    return user;
  } catch (err) {
    console.error('Error al verificar credenciales:', err);
    throw new Error('Error al verificar las credenciales');
  }
};
