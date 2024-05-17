import AttendanceModel from '../models/AttendanceModel.js';

// Controlador para registrar la asistencia a una actividad
export const registerAttendance = async (req, res) => {
  try {
    const { student_id, monitor, attendance } = req.body;

    // Crear una nueva instancia de asistencia con la fecha actual
    const newAttendance = new AttendanceModel({
      date: new Date(),
      student_id,
      monitor,
      attendance
    });

    // Guardar la asistencia en la base de datos
    await newAttendance.save();

    res.status(201).json({ message: 'Asistencia registrada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener la asistencia de un estudiante en un rango de fechas
export const getAttendanceByStudent = async (req, res) => {
  try {
    const { student_id, start_date, end_date } = req.params;

    // Convertir las fechas a objetos Date
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    // Consultar la asistencia del estudiante en el rango de fechas especificado
    const attendance = await AttendanceModel.find({
      student_id,
      date: { $gte: startDate, $lte: endDate }
    });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controlador para actualizar la asistencia de un estudiante en una fecha específica
export const updateAttendance = async (req, res) => {
  try {
    const { attendance_id } = req.params;
    const { attendance } = req.body;

    // Buscar la asistencia por su ID y actualizar el campo de asistencia
    await AttendanceModel.findByIdAndUpdate(attendance_id, { attendance });

    res.status(200).json({ message: 'Asistencia actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};