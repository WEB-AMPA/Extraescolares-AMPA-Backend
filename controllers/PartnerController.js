import PartnerModel from '../models/PartnerModel.js';
import UserModel from '../models/UsersModel.js';
import bcrypt from 'bcrypt';

// Crear un nuevo socio
export const createPartner = async (req, res) => {
  try {
    // Obtener datos del cuerpo de la solicitud
    const studentIds = Array.isArray(req.body.student_id) ? req.body.student_id : [req.body.student_id];

    // Verificar si el usuario ya existe
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Verificar si el partner_number ya existe
    const existingPartner = await PartnerModel.findOne({ partner_number });
    if (existingPartner) {
      return res.status(400).json({ message: 'El número de socio ya está en uso' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
      lastname,
      name,
      role: 'socio'
    });

    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();

    // Convertir student_id a un array si es necesario
    const student_id = Array.isArray(req.body.student_id) ? req.body.student_id : [req.body.student_id];

    // Crear un nuevo socio asociado al usuario
    const newPartner = new PartnerModel({
      partner_number,
      user_id: savedUser._id,
      student_id,
      breakfastprice_id
    });

    // Guardar el nuevo socio en la base de datos
    const savedPartner = await newPartner.save();

    res.status(201).json(savedPartner);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};

// Obtener todos los socios
export const getPartners = async (req, res) => {
  try {
    const partners = await PartnerModel.find()
      .populate('user_id', 'username email')
      .populate('student_id', 'name')
      .populate('breakfastprice_id', 'price');
    res.status(200).json(partners);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener un socio por su ID
export const getPartnerById = async (req, res) => {
  try {
    const partner = await PartnerModel.findById(req.params.id)
      .populate('user_id', 'username email')
      .populate('student_id', 'name')
      .populate('breakfastprice_id', 'price');

    if (!partner) {
      return res.status(404).json({ message: 'Socio no encontrado' });
    }

    res.status(200).json(partner);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar un socio por su ID
export const updatePartnerById = async (req, res) => {
  try {
    const partner = await PartnerModel.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Socio no encontrado' });
    }

    const updatedPartner = await PartnerModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('user_id', 'username email')
      .populate('student_id', 'name')
      .populate('breakfastprice_id', 'price');

    res.status(200).json(updatedPartner);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar un socio por su ID
export const deletePartnerById = async (req, res) => {
  try {
    const partner = await PartnerModel.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Socio no encontrado' });
    }

    await PartnerModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Socio eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};