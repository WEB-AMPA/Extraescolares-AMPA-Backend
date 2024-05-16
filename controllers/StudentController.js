import StudentModel from '../models/StudentModels.js';
import PartnerModel from '../models/PartnerModel.js';


// Crear un nuevo estudiante y asignar actividades
export const createStudent = async (req, res) => {
    try {
        // Crea un nuevo estudiante con los datos proporcionados en el cuerpo de la solicitud
        const newStudent = new StudentModel(req.body);

        // Si hay actividades proporcionadas en el cuerpo de la solicitud, asigna esas actividades al estudiante
        if (req.body.activities && req.body.activities.length > 0) {
            newStudent.activities = req.body.activities;
        }
        const savedStudent = await newStudent.save();
        
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los estudiantes con actividades, partner_id y user_id y breakfastprice_id
export const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.find().populate({
            path: 'activities'
        }).populate({
            path: 'partner_id',
            populate: [
                { path: 'user_id' },    // Popula el campo user_id dentro de partner_id
                { path: 'breakfastprice_id' } // Popula el campo breakfastprice_id dentro de partner_id
            ]
        });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un estudiante por su ID con actividades, partner_id, user_id y breakfastprice_id
export const getStudentById = async (req, res) => {
    try {
        const student = await StudentModel.findById(req.params.id).populate({
            path: 'activities'
        }).populate({
            path: 'partner_id',
            populate: [
                { path: 'user_id' },    // Popula el campo user_id dentro de partner_id
                { path: 'breakfastprice_id' } // Popula el campo breakfastprice_id dentro de partner_id
            ]
        });
        
        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un estudiante por su ID
export const updateStudentById = async (req, res) => {
    try {
        const updatedStudent = await StudentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un estudiante por su ID
export const deleteStudentById = async (req, res) => {
    try {
        const deletedStudent = await StudentModel.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
