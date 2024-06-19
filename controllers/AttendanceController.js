import AttendanceModel from '../models/AttendanceModel.js';
import ActivitiesStudentsModel from '../models/ActivitiesStudentsModel.js';
import StudentController from './StudentController.js';
import StudentModel from '../models/StudentModels.js';


// Controlador para registrar la asistencia a una actividad
export const registerAttendance = async (req, res) => {
  try {
    const { date, attendance, activities_student } = req.body;

    // Buscar un registro de asistencia existente para la misma fecha, actividad y estudiante
    let attendanceRecord = await AttendanceModel.findOne({
      date: new Date(date),
      activities_student
    });

    if (attendanceRecord) {
      // Si el registro ya existe, actualizar la asistencia
      attendanceRecord.attendance = attendance;
      await attendanceRecord.save();
    } else {
      // Si no existe, crear una nueva instancia de asistencia
      attendanceRecord = new AttendanceModel({
        date: date ? new Date(date) : new Date(), // Usa la fecha proporcionada o la fecha actual
        attendance,
        activities_student
      });
      await attendanceRecord.save();
    }

    res.status(201).json({ message: 'Asistencia registrada exitosamente', attendanceRecord });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAttendanceByStudentAndActivity = async (req, res) => {
  const { studentId, activityId, startDate, endDate } = req.params;

  try {
      const attendanceRecords = await AttendanceModel.find({
          'activities_student': studentId,
          'activity': activityId,
          'date': {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
          }
      }).populate('activities_student');

      res.status(200).json(attendanceRecords);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching attendance records', error });
  }
};



export const getAttendanceByActivitiesStudentInDateRange = async (req, res) => {
  try {
    const { activities_student_id, start_date, end_date } = req.params;

    // Convertir las fechas a objetos Date
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    // Verificar que el ID de activities_student es válido
    const activityStudent = await ActivitiesStudentsModel.findById(activities_student_id).lean();
    if (!activityStudent) {
      return res.status(404).json({ message: 'No se encontró la actividad para el estudiante especificado.' });
    }

    const getStudent = await StudentModel.findById(activityStudent.student)
    // console.log("Student",getStudent.name)

    // Consultar la asistencia del estudiante en el rango de fechas especificado
    const attendances = await AttendanceModel.find({
      activities_student: activities_student_id, // Usar el ID de activities_student
      date: { $gte: startDate, $lte: endDate }
    }).populate('activities_student')

  const newObj ={attendances,studentName:`${getStudent.name}, ${getStudent.lastname}` };

    res.status(200).json(newObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener las asistencias.' });
  }
};



// Controlador para obtener estudiantes y su asistencia por actividad y fecha específica
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



