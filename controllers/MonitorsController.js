import MonitorModel from '../models/MonitorModel.js';
import UserModel from '../models/UserModel.js'; // Importar modelo de usuarios

// Crear un nuevo monitor
export const createMonitor = async (req, res) => {
    try {
        // Obtener datos del cuerpo de la solicitud
        const { username, password, email, lastname, name, additionalField } = req.body;

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
            role: 'monitor',
            lastname,
            name
        });

        // Guardar el nuevo usuario en la base de datos
        const savedUser = await newUser.save();

        // Crear un nuevo monitor asociado al usuario
        const newMonitor = new MonitorModel({
            user_id: savedUser._id,
            additionalField // Campo adicional específico del monitor
        });

        // Guardar el nuevo monitor en la base de datos
        const savedMonitor = await newMonitor.save();

        res.status(201).json(savedMonitor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los monitores
export const getMonitors = async (req, res) => {
    try {
        const monitors = await MonitorModel.find().populate('user_id');
        res.status(200).json(monitors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un monitor por su ID
export const getMonitorById = async (req, res) => {
    try {
        const monitor = await MonitorModel.findById(req.params.id).populate('user_id');
        if (!monitor) {
            return res.status(404).json({ message: 'Monitor no encontrado' });
        }
        res.status(200).json(monitor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un monitor por su ID
export const updateMonitorById = async (req, res) => {
    try {
        const updatedMonitor = await MonitorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMonitor) {
            return res.status(404).json({ message: 'Monitor no encontrado' });
        }
        res.status(200).json(updatedMonitor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un monitor por su ID
export const deleteMonitorById = async (req, res) => {
    try {
        const deletedMonitor = await MonitorModel.findByIdAndDelete(req.params.id);
        if (!deletedMonitor) {
            return res.status(404).json({ message: 'Monitor no encontrado' });
        }
        res.status(200).json({ message: 'Monitor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
