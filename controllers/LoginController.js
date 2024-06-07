import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UsersModel.js';

// Controlador para iniciar sesión
export const loginUser = async (req, res) => {
  try {
    const { credential, password } = req.body;

    // Validar si se proporcionan las credenciales
    if (!credential || !password) {
      return res.status(400).json({ message: 'Por favor, proporcione credenciales válidas.' });
    }

    // Buscar al usuario por número de socio, correo electrónico o nombre de usuario en la base de datos
    const user = await UserModel.findOne({
      $or: [
        { partner_number: credential },
        { email: credential },
        { username: credential }
      ]
    });

    // Si no se encuentra al usuario, devolver un error
    if (!user) {
      return res.status(401).json({ message: 'Credencial o contraseña incorrectos' });
    }

    // Verificar si la contraseña es correcta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credencial o contraseña incorrectos' });
    }

    // Generar un token de autenticación
    const token = jwt.sign({ userId: user._id, role: user.role.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 // en una hora la cookie se eliminará
    });


    
    // Devolver el token como respuesta
    res.status(200).json({ token, role: user.role.name});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
