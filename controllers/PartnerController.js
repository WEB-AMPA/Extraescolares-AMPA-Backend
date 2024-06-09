import PartnerModel from '../models/PartnerModel.js';
import UserModel from '../models/UsersModel.js';
import bcrypt from 'bcrypt';

// ID del rol de partner
const PARTNER_ROLE_ID = '66470af4d3c0d639568232d2';

// Crear un nuevo socio
export const createPartner = async (req, res) => {
    try {
        const { username, password, email, lastname, name, partner_number, student_id, phone_number, registration_date } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
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
            role: PARTNER_ROLE_ID
        });

        // Guardar el nuevo usuario en la base de datos
        const savedUser = await newUser.save();

        // Crear un nuevo socio asociado al usuario
        const newPartner = new PartnerModel({
            partner_number,
            phone_number,
            registration_date,
            user_id: savedUser._id,
            student_id
        });

        // Guardar el nuevo socio en la base de datos
        const savedPartner = await newPartner.save();

        res.status(201).json(savedPartner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los socios
export const getPartners = async (req, res) => {
    try {
        const partners = await PartnerModel.find()
            .populate('user_id')
            .populate('student_id');
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un socio por su ID
export const getPartnerById = async (req, res) => {
    try {
        const partner = await PartnerModel.findById(req.params.id)
            .populate('user_id')
            .populate('student_id');

        if (!partner) {
            return res.status(404).json({ message: 'Socio no encontrado' });
        }

        res.status(200).json(partner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un socio por su ID
export const updatePartnerById = async (req, res) => {
    try {
        const updatedPartner = await PartnerModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('user_id')
            .populate('student_id');

        if (!updatedPartner) {
            return res.status(404).json({ message: 'Socio no encontrado' });
        }
        res.status(200).json(updatedPartner);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al actualizar el socio.', error: error.message });
    }
};

// Eliminar un socio por su ID
export const deletePartnerById = async (req, res) => {
    try {
        const deletedPartner = await PartnerModel.findByIdAndDelete(req.params.id);
        if (!deletedPartner) {
            return res.status(404).json({ message: 'Socio no encontrado.' });
        }
        res.status(200).json({ message: 'Socio eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar el socio.', error: error.message });
    }
};

export default {
    createPartner,
    getPartners,
    getPartnerById,
    updatePartnerById,
    deletePartnerById
};
