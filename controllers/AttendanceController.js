import AttendanceModel from '../models/AttendanceModel.js';

// Controlador para registrar la asistencia a una actividad
export const registerAttendance = async (req, res) => {
  try {
    const { date, attendance, activities_students } = req.body;

    // Crear una nueva instancia de asistencia
    const newAttendance = new AttendanceModel({
      date: date ? new Date(date) : new Date(), // Usa la fecha proporcionada o la fecha actual
      attendance,
      activities_students
    });

    // Guardar la asistencia en la base de datos
    await newAttendance.save();

    res.status(201).json({ message: 'Asistencia registrada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controlador para obtener la asistencia de un estudiante en un rango de fechas
export const getAttendancesByStudentAndDateRange = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;

    const attendances = await AttendanceModel.find({
      activities_students: studentId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).populate({
      path: 'activities_students',
      populate: [
        { path: 'student', model: 'students' },
        { path: 'activity', model: 'activities' }
      ]
    });

    res.status(200).json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener las asistencias.' });
  }
};


// Controlador para obtener todas las asistencias
export const getAllAttendances = async (req, res) => {
  try {
    // Consultar todas las asistencias y poblar el campo activities_student
    const allAttendances = await AttendanceModel.find()
      .populate({
        path: 'activities_students',
        populate: [
          { path: 'student', model: 'students' },
          { path: 'activity', model: 'activities' }
        ]
      });

    res.status(200).json(allAttendances);
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
