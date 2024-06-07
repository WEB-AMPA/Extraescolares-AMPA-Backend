import mongoose from 'mongoose';
import xlsx from 'xlsx';
import path from 'path';
import StudentModel from '../models/StudentModels.js';
import PartnerModel from '../models/PartnerModel.js';
import CenterModel from '../models/CentersModel.js';
import ActivityModel from '../models/ActivitiesModel.js';
import CategoryModel from '../models/CategoriesModel.js';
import ScheduleDayModel from '../models/ScheduleDaysModel.js';
import ScheduleHourModel from '../models/ScheduleHoursModel.js';
import ActivitiesStudentsModel from '../models/ActivitiesStudentsModel.js';

mongoose.connect('mongodb+srv://db_ciudadangeles:dqoHwcXsbXlY1jFy@actividadesextraescolar.xcbrlxt.mongodb.net/extracurriculars?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    importStudents();
  })
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Función para importar estudiantes desde un archivo Excel
const importStudents = async () => {
  try {
    // Ruta absoluta al archivo Excel
    const filePath = path.resolve('/Users/danielazapata/Desktop/Proyecto Final/web-ampa/Extraescolares-Backend/data/students.xlsx'); 
    // Leer el archivo Excel
    const workbook = xlsx.readFileSync(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const studentsData = xlsx.utils.sheet_to_json(worksheet);

    for (const studentData of studentsData) {
      const {
        name,
        lastname,
        breakfast,
        observations,
        course,
        partner_number,
        center: centerName,
        activities: activityNames,
        categoryName,
        schedule_days,
        schedule_hours
      } = studentData;

      // Verificar que partner_number esté definido
      if (!partner_number) {
        console.error(`El socio con número ${partner_number} no existe.`);
        continue;
      }

      // Buscar el socio por su número de socio
      const partner = await PartnerModel.findOne({ partner_number });
      if (!partner) {
        console.error(`El socio con número ${partner_number} no existe.`);
        continue;
      }

      // Buscar el centro por su nombre
      const center = await CenterModel.findOne({ name: centerName });
      if (!center) {
        console.error(`El centro con nombre ${centerName} no existe.`);
        continue;
      }

      // Crear un nuevo estudiante
      const newStudent = new StudentModel({
        name,
        lastname,
        breakfast: breakfast || '', 
        observations: observations || '', 
        course,
        partner_number,
        center: center._id 
      });

      // Guardar el estudiante en la base de datos
      await newStudent.save();
      console.log(`Estudiante ${name} ${lastname} importado exitosamente.`);

      // Procesar las actividades
      const activities = activityNames ? await Promise.all(activityNames.split(',').map(async (activityName) => {
        const activity = await ActivityModel.findOne({ name: activityName.trim() });
        if (!activity) {
          console.error(`La actividad con nombre ${activityName} no existe.`);
          return null;
        }
        const category = await CategoryModel.findOne({ name: categoryName });
        const scheduleDay = await ScheduleDayModel.findOne({ days: schedule_days });
        const scheduleHour = await ScheduleHourModel.findOne({ range: schedule_hours });

        // Asignar la actividad al estudiante en el modelo de actividad
        activity.assignments.push({
          student: newStudent._id,
          studentName: name,
          studentLastname: lastname,
          category: category ? category._id : null,
          scheduleDay: scheduleDay ? scheduleDay._id : null,
          scheduleHour: scheduleHour ? scheduleHour._id : null,
          center: center._id
        });

        await activity.save();

        // Guardar la relación en la colección activities_students
        const newActivityStudent = new ActivitiesStudentsModel({
          student: newStudent._id,
          activity: activity._id
        });
        await newActivityStudent.save();

        return {
          activity: activity._id,
          category: category ? category._id : null,
          scheduleDay: scheduleDay ? scheduleDay._id : null,
          scheduleHour: scheduleHour ? scheduleHour._id : null,
          center: center._id
        };
      })) : [];

      newStudent.activities = activities.filter(a => a !== null);

      // Actualizar el estudiante con las actividades
      await newStudent.save();
    }

    console.log('Importación de estudiantes completada.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error al importar estudiantes:', error);
    mongoose.disconnect();
  }
};
