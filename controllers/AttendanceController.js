import AttendanceModel from '../models/AttendanceModel.js';

// Controlador para registrar la asistencia a una actividad
export const registerAttendance = async (req, res) => {
  try {
<<<<<<< HEAD
    const { date, attendance, activities_students } = req.body;

    // Crear una nueva instancia de asistencia con los datos proporcionados
    const newAttendance = new AttendanceModel({
      date,
      attendance,
      activities_students
=======
    const { date, attendance, activities_student } = req.body;

    // Crear una nueva instancia de asistencia
    const newAttendance = new AttendanceModel({
      date: date ? new Date(date) : new Date(), // Usa la fecha proporcionada o la fecha actual
      attendance,
      activities_student
>>>>>>> 81b052180ef2b3b47145bf9e5be7106c1082b186
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
<<<<<<< HEAD
    const { activities_students, start_date, end_date } = req.params;
=======
    const { student, start_date, end_date } = req.params;
>>>>>>> 81b052180ef2b3b47145bf9e5be7106c1082b186

    // Convertir las fechas a objetos Date
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    // Consultar la asistencia del estudiante en el rango de fechas especificado
    const attendance = await AttendanceModel.find({
<<<<<<< HEAD
      activities_students,
      date: { $gte: startDate, $lte: endDate }
=======
      activities_student: student,
      date: { $gte: startDate, $lte: endDate } 
    }).populate({
      path: 'activities_student',
      populate: {
        path: 'student', 
        model: 'students' 
      }
    }).populate({
      path: 'activities_student',
      populate: {
        path: 'activity', // 
        model: 'activities' 
      }
>>>>>>> 81b052180ef2b3b47145bf9e5be7106c1082b186
    });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

<<<<<<< HEAD
=======

// Controlador para obtener todas las asistencias
export const getAllAttendances = async (req, res) => {
  try {
    // Consultar todas las asistencias
    const allAttendances = await AttendanceModel.find();

    res.status(200).json(allAttendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




>>>>>>> 81b052180ef2b3b47145bf9e5be7106c1082b186
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
<<<<<<< HEAD


// Controlador para eliminar la asistencia
export const deleteAttendance = async (req, res) => {
  try {
    const { attendance_id } = req.params;

    // Buscar la asistencia por su ID y eliminarla
    const deletedAttendance = await AttendanceModel.findByIdAndDelete(attendance_id);

    if (!deletedAttendance) {
      return res.status(404).json({ message: 'La asistencia no fue encontrada' });
    }

    res.status(200).json({ message: 'Asistencia eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
=======
>>>>>>> 81b052180ef2b3b47145bf9e5be7106c1082b186
