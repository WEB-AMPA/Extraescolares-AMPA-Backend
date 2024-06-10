import jwt from 'jsonwebtoken';
import UserModel from '../models/UsersModel.js';

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, token faltante.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verificado:', verified);  // Añadir registro para ver el contenido del token

    req.user = verified;
    next();
  } catch (error) {
    console.error('Error en la verificación del token:', error.message);  // Añadir registro del error

    res.status(400).json({ message: 'Token inválido.' });
  }
};

export const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user.userId).populate('role');
      console.log('Usuario:', user);  // Añadir registro para ver el usuario

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      if (!user.role || !user.role.name) {
        return res.status(400).json({ message: 'El usuario no tiene un rol asignado o el rol no tiene un nombre.' });
      }
      console.log('Rol del usuario:', user.role.name);  // Añadir registro para ver el rol del usuario

      if (!roles.includes(user.role.name)) {
        return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta.' });
      }
      
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};
