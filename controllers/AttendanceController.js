import AttendanceModel from '../models/AttendanceModel.js';
import ActivitiesStudentsModel from '../models/ActivitiesStudentsModel.js';
// Controlador para registrar la asistencia a una actividad
export const registerAttendance = async (req, res) => {
  try {
    const { date, attendance, activities_student } = req.body;

    // Crear una nueva instancia de asistencia
    const newAttendance = new AttendanceModel({
      date: date ? new Date(date) : new Date(), // Usa la fecha proporcionada o la fecha actual
      attendance,
      activities_student
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
    const { student, start_date, end_date } = req.params;

    // Convertir las fechas a objetos Date
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    // Consultar la asistencia del estudiante en el rango de fechas especificado
    const attendance = await AttendanceModel.find({
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
    });

    res.status(200).json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener las asistencias.' });
  }
};


// Controlador para Obtener Asistencia por Actividad
export const getAttendancesByActivity = async (req, res) => {
  try {
    const { activity_id } = req.params;
    const attendances = await AttendanceModel.find({ 'activities_student.activity': activity_id })
      .populate({
        path: 'activities_student',
        populate: { path: 'student', model: 'students' }
      });

    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controlador para obtener estudiantes y su asistencia por actividad y fecha
export const getStudentsAndAttendanceByActivityAndDate = async (req, res) => {
  try {
    const { activity_id, date } = req.params;
    const studentsAndActivities = await ActivitiesStudentsModel.find({ activity: activity_id })
      .populate('student')
      .lean();

    const attendanceRecords = await AttendanceModel.find({
      'activities_student': { $in: studentsAndActivities.map(sa => sa._id) },
      date: new Date(date)
    }).lean();

    const studentsWithAttendance = studentsAndActivities.map(sa => {
      const attendanceRecord = attendanceRecords.find(ar => ar.activities_student.equals(sa._id));
      return {
        ...sa,
        attendance: attendanceRecord ? (attendanceRecord.attendance === 1 ? 'present' : 'absent') : 'none'
      };
    });

    res.status(200).json(studentsWithAttendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
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



export const deleteAttendance = async (req, res) => {
  try {
    const { attendance_id } = req.params;
    await AttendanceModel.findByIdAndDelete(attendance_id);
    res.status(200).json({ message: 'Asistencia eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
