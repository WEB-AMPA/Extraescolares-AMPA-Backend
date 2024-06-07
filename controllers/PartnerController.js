import PartnerModel from '../models/PartnerModel.js';
import UserModel from '../models/UsersModel.js';
import bcrypt from 'bcrypt';

// Crear un nuevo socio
export const createPartner = async (req, res) => {
    try {
        // Obtener datos del cuerpo de la solicitud
        const { username, password, email, lastname, name, partner_number, phone_number, registration_date, student_id, breakfastprice_id } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        // Verificar si el número de socio ya existe
        const existingPartner = await PartnerModel.findOne({ partner_number });
        if (existingPartner) {
            return res.status(400).json({ message: 'El número de socio ya existe.' });
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

        // Crear un nuevo socio asociado al usuario
        const newPartner = new PartnerModel({
            partner_number,
            phone_number,
            registration_date,
            user_id: savedUser._id,
            student_id,
            breakfastprice_id
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
            .populate('student_id')
            .populate('breakfastprice_id'); // Popula el campo breakfastprice_id
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
            .populate('student_id')
            .populate('breakfastprice_id'); // Popula el campo breakfastprice_id

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
        const { partner_number } = req.body;

        // Verificar si el número de socio ya existe para otro socio
        const existingPartner = await PartnerModel.findOne({ partner_number, _id: { $ne: req.params.id } });
        if (existingPartner) {
            return res.status(400).json({ message: 'El número de socio ya existe para otro socio.' });
        }

        const updatedPartner = await PartnerModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('user_id')
            .populate('student_id')
            .populate('breakfastprice_id'); // Popula el campo breakfastprice_id

        if (!updatedPartner) {
            return res.status(404).json({ message: 'Socio no encontrado' });
        }
        res.status(200).json(updatedPartner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un socio por su ID
export const deletePartnerById = async (req, res) => {
    try {
        const deletedPartner = await PartnerModel.findByIdAndDelete(req.params.id);
        if (!deletedPartner) {
            return res.status(404).json({ message: 'Socio no encontrado' });
        }
        res.status(200).json({ message: 'Socio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
