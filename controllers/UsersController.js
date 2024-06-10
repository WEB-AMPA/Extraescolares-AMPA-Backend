import UserModel from '../models/UsersModel.js';
import bcrypt from 'bcrypt';
import { passwordGenerated } from '../utils/passwordGenerator.js';
import {sendEmailClient} from '../utils/sendMail.js';

const { SMTP_EMAIL, PORT_EMAIL, SERVER_EMAIL, PASSWORD_APLICATION} = process.env

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { username, email, roleName, lastname, name, phone_number, partner_number } = req.body;

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
      name,
      phone_number,
      partner_number: roleName === 'partner' ? partner_number : undefined, // Asignar partner_number solo si el rol es 'partner'
    });

    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();

    // Enviar correo electrónico con la contraseña generada
    sendEmailClient(SMTP_EMAIL, PORT_EMAIL, SERVER_EMAIL, PASSWORD_APLICATION, email, password);

    // Enviar la respuesta con el usuario y la contraseña generada
    res.status(201).json({ user: savedUser, password });
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
    console.log(`Buscando usuarios con rol: ${roleName}`);

    // Obtener el rol por su nombre
    const role = await RoleModel.findOne({ name: roleName });
    if (!role) {
      return res.status(400).json({ message: 'El rol proporcionado no existe' });
    }

    // Obtener los usuarios con el rol especificado
    const users = await UserModel.find({ role: role._id }).populate('role');
    console.log(`Usuarios encontrados: ${users.length}`);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios por rol:', error);
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
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
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

