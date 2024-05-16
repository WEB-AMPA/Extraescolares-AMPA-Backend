import StudentModel from '../models/StudentModels.js';
import PartnerModel from '../models/PartnerModel.js';


// Crear un nuevo estudiante
export const createStudent = async (req, res) => {
    try {
        const newStudent = new StudentModel(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los estudiantes
export const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un estudiante por su ID
export const getStudentById = async (req, res) => {
    try {
        const student = await StudentModel.findById(req.params.id).populate({
            path: 'partner_id',
            populate: { path: 'user_id' } // Población adicional para el campo user_id dentro de partner_id
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
