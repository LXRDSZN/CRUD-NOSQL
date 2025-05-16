import Subject from "../usuarios/materias.js"; 
/*
##################################################################################################
#                       funcion para crear las materias                                          #
##################################################################################################
*/
export const createSubject = async (req, res) => {
  try {
    const { subjectname, key } = req.body;

    const newSubject = new Subject({
      subjectname,
      key,
      user: req.usuario.id, 
    });

    const savedSubject = await newSubject.save();
    res.json(savedSubject); 
  } catch (error) {
    res.status(500).json({ message: "Error al guardar la materia", error });
  }
};

/*
##################################################################################################
#                    funcion para Consultar la materia                                            #
##################################################################################################
*/
export const getSubjects = async (req, res) => {
  try {
    // Consulta las materias asociadas al usuario logueado
    const subjects = await Subject.find({ user: req.usuario.id });
    res.json(subjects); // Devuelve las materias al cliente
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las materias", error });
  }
};

/*
##################################################################################################
#                    funcion para borrar las materias                                            #
##################################################################################################
*/
export const deleteSubject = async (req, res) => {
  const { key } = req.params; // Se recibe por URL (ej: /services/api.js:key)
  const userId = req.usuario.id; // Viene del middleware que verifica el token

  try {
    // Busca y elimina una materia con esa clave que pertenezca al usuario autenticado
    const result = await Subject.deleteOne({ key: key, user: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Materia no encontrada o no autorizada para eliminar." });
    }

    res.json({ message: "Materia eliminada correctamente." });
  } catch (error) {
    console.error("Error al eliminar la materia:", error);
    res.status(500).json({ message: "Error del servidor al eliminar la materia.", error });
  }
};
/*
##################################################################################################
#                    funcion para actualizar las materias                                         #
##################################################################################################
*/


export const updateSubject = async (req, res) => {
  const { key } = req.params; // Clave de la materia que quieres actualizar
  const userId = req.usuario.id; // ID del usuario autenticado
  const { subjectname } = req.body; // Nuevo nombre de la materia (puedes agregar más campos si quieres)

  try {
    const result = await Subject.updateOne(
      { key: key, user: userId }, // Filtro: materia con esa key Y del usuario
      { $set: { subjectname } }   // Lo que quieres actualizar
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Materia no encontrada o no autorizada para actualizar." });
    }

    res.json({ message: "Materia actualizada correctamente." });
  } catch (error) {
    console.error("Error al actualizar la materia:", error);
    res.status(500).json({ message: "Error del servidor al actualizar la materia.", error });
  }
};
