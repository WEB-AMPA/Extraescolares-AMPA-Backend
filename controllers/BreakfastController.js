import BreakfastModel from '../models/BreakfastModel.js';

// Crear una nueva asistencia de desayuno
export const createBreakfastAttendance = async (req, res) => {
    try {
        const { date, student_id, attendance } = req.body;
        if (!date || !student_id || attendance === undefined) {
            return res.status(400).json({ message: 'Todos los campos son requeridos: date, student_id, attendance' });
        }

         // Verificar si ya existe un registro de asistencia para el mismo estudiante y fecha
        const existingAttendance = await BreakfastModel.findOne({ date, student_id });

        if (existingAttendance) {
             // Actualizar el registro existente
            existingAttendance.attendance = attendance;
            const updatedAttendance = await existingAttendance.save();
            return res.status(200).json(updatedAttendance);
        }


        const newBreakfast = new BreakfastModel({
            date,
            student_id,
            attendance,
        });
        const savedBreakfast = await newBreakfast.save();
        res.status(201).json(savedBreakfast);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Obtener todas las asistencias de desayuno
export const getAllBreakfastAttendances = async (req, res) => {
    try {
        const breakfasts = await BreakfastModel.find().populate({
            path: 'student_id',
            select: 'name lastname observations'
        });
        res.status(200).json(breakfasts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener asistencias de desayuno por alumno y por rango de fechas
export const getBreakfastAttendancesByStudentAndDate = async (req, res) => {
    try {
        const { student_id } = req.params;
        const { start_date, end_date } = req.query;

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        const breakfasts = await BreakfastModel.find({
            student_id,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        }).populate({
            path: 'student_id',
            select: 'name lastname observations'
        });

        res.status(200).json(breakfasts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener asistencias de desayuno por fecha
export const getBreakfastAttendancesByDate = async (req, res) => {
    try {
        const { date } = req.params; // Obtener el parámetro de fecha de los parámetros de ruta
        const queryDate = new Date(date);

        if (isNaN(queryDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));

        const breakfasts = await BreakfastModel.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).populate({
            path: 'student_id',
            select: 'name lastname observations'
        });

        res.status(200).json(breakfasts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Obtener una asistencia de desayuno por ID
export const getBreakfastAttendanceById = async (req, res) => {
    try {
        const breakfast = await BreakfastModel.findById(req.params.id).populate({
            path: 'student_id',
            select: 'name lastname observations'
        });
        if (!breakfast) {
            return res.status(404).json({ message: 'Asistencia de desayuno no encontrada' });
        }
        res.status(200).json(breakfast);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Actualizar una asistencia de desayuno por ID
export const updateBreakfastAttendanceById = async (req, res) => {
    try {
        const { date, student_id, attendance } = req.body;
        if (!date && !student_id && attendance === undefined) {
            return res.status(400).json({ message: 'Al menos uno de los campos debe ser proporcionado: date, student_id, attendance' });
        }

        const updatedBreakfast = await BreakfastModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate({
            path: 'student_id',
            select: 'name lastname observations'
        });
        if (!updatedBreakfast) {
            return res.status(404).json({ message: 'Asistencia de desayuno no encontrada' });
        }
        res.status(200).json(updatedBreakfast);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una asistencia de desayuno por ID
export const deleteBreakfastAttendanceById = async (req, res) => {
    try {
        const deletedBreakfast = await BreakfastModel.findByIdAndDelete(req.params.id);
        if (!deletedBreakfast) {
            return res.status(404).json({ message: 'Asistencia de desayuno no encontrada' });
        }
        res.status(200).json({ message: 'Asistencia de desayuno eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
