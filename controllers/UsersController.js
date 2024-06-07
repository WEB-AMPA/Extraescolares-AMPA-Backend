import UserModel from '../models/UsersModel.js';
import RoleModel from '../models/RoleModel.js';
import bcrypt from 'bcrypt';
import { passwordGenerated } from '../utils/passwordGenerator.js';
import { sendEmailClient } from '../utils/sendMail.js';

const { SMTP_EMAIL, PORT_EMAIL, SERVER_EMAIL, PASSWORD_APLICATION } = process.env;

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
      const { username, email, roleName, lastname, name } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
      }

      // Obtener el rol
      const role = await RoleModel.findOne({ name: roleName });
      if (!role) {
        return res.status(400).json({ message: 'El rol proporcionado no existe' });
      }
  
      // Generar y cifrar la contraseña
      let password = passwordGenerated();
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear un nuevo usuario con la contraseña cifrada y el rol
      const newUser = new UserModel({
        username,
        password: hashedPassword,
        email,
        role: role._id, // Asignar el ObjectId del rol
        lastname,
        name
      });
  
      // Guardar el nuevo usuario en la base de datos
      const savedUser = await newUser.save();
      sendEmailClient(SMTP_EMAIL, PORT_EMAIL, SERVER_EMAIL, PASSWORD_APLICATION, email, password);
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

// Controlador para obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate('role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener usuarios por rol
export const getUsersByRole = async (req, res) => {
  try {
    const { roleName } = req.params;

    // Obtener el rol por su nombre
    const role = await RoleModel.findOne({ name: roleName });
    if (!role) {
      return res.status(400).json({ message: 'El rol proporcionado no existe' });
    }

    // Obtener los usuarios con el rol especificado
    const users = await UserModel.find({ role: role._id }).populate('role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate('role');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar un usuario por su ID
export const updateUserById = async (req, res) => {
  try {
    const { roleName, ...updateData } = req.body;

    if (roleName) {
      const role = await RoleModel.findOne({ name: roleName });
      if (!role) {
        return res.status(400).json({ message: 'El rol proporcionado no existe' });
      }
      updateData.role = role._id;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('role');
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar un usuario por su ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
