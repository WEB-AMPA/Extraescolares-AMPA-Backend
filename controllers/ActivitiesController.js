import ActivitiesModel from '../models/ActivitiesModel.js';
import Center from '../models/CentersModel.js';
import Category from '../models/CategoriesModel.js';
import ScheduleDay from '../models/ScheduleDaysModel.js';
import ScheduleHour from '../models/ScheduleHoursModel.js';
import StudentModel from '../models/StudentModels.js';
import ActivitiesStudentsModel from '../models/ActivitiesStudentsModel.js';

class ActivitiesController {
  // Crear una nueva actividad
  async createActivity(req, res) {
    try {
      const { name, monitorUsername, categoryNames, scheduleDays, scheduleHours, centerNames } = req.body;

      const monitor = await UserModel.findOne({ username: monitorUsername, role: 'monitor' });
      if (!monitor) {
        return res.status(400).json({ message: `El monitor proporcionado (${monitorUsername}) no existe.` });
      }

      const centerIds = await Promise.all(centerNames.map(async (name) => {
        const center = await Center.findOne({ name: name });
        if (!center) {
          throw new Error(`El centro proporcionado (${name}) no existe.`);
        }
        return center._id;
      }));

      const categoryIds = await Promise.all(categoryNames.map(async (name) => {
        const category = await Category.findOne({ name: name });
        if (!category) {
          throw new Error(`La categoría proporcionada (${name}) no existe.`);
        }
        return category._id;
      }));

      const scheduleDayIds = await Promise.all(scheduleDays.map(async (day) => {
        const foundDay = await ScheduleDay.findOne({ days: day });
        if (!foundDay) {
          throw new Error(`El día proporcionado (${day}) no existe.`);
        }
        return foundDay._id;
      }));

      const scheduleHourIds = await Promise.all(scheduleHours.map(async (hour) => {
        const foundHour = await ScheduleHour.findOne({ range: hour });
        if (!foundHour) {
          throw new Error(`La hora proporcionada (${hour}) no existe.`);
        }
        return foundHour._id;
      }));

      const newActivity = new ActivitiesModel({
        name,
        monitor: monitor._id,
        categories: categoryIds,
        scheduleDay: scheduleDayIds,
        scheduleHour: scheduleHourIds,
        centers: centerIds,
      });

      const savedActivity = await newActivity.save();
      const populatedActivity = await ActivitiesModel.findById(savedActivity._id)
        .populate('categories')
        .populate('scheduleDay')
        .populate('scheduleHour')
        .populate('centers')
        .populate('monitor');

      res.status(201).json(populatedActivity);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Hubo un error al crear la actividad.',
        error: error.message,
      });
    }
  }

  // Obtener todas las actividades
  async getAllActivities(req, res) {
    try {
      const activities = await ActivitiesModel.find()
        .populate('categories')
        .populate('scheduleDay')
        .populate('scheduleHour')
        .populate('centers')
        .populate('monitor');
      res.status(200).json(activities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener las actividades.' });
    }
  }

  // Obtener una actividad por ID
  async getActivityById(req, res) {
    try {
      const activity = await ActivitiesModel.findById(req.params.id)
        .populate('categories')
        .populate('scheduleDay')
        .populate('scheduleHour')
        .populate('centers')
        .populate('monitor');
      if (!activity) {
        return res.status(404).json({ message: 'Actividad no encontrada.' });
      }
      res.status(200).json(activity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener la actividad.' });
    }
  }

  // Actualizar una actividad por ID
  async updateActivity(req, res) {
    try {
      const { name, categoryNames, scheduleDays, scheduleHours, centerNames } = req.body;

      const centerIds = await Promise.all(centerNames.map(async (name) => {
        const center = await Center.findOne({ name: name });
        if (!center) {
          throw new Error(`El centro proporcionado (${name}) no existe.`);
        }
        return center._id;
      }));

      const categoryIds = await Promise.all(categoryNames.map(async (name) => {
        const category = await Category.findOne({ name: name });
        if (!category) {
          throw new Error(`La categoría proporcionada (${name}) no existe.`);
        }
        return category._id;
      }));

      const scheduleDayIds = await Promise.all(scheduleDays.map(async (day) => {
        const foundDay = await ScheduleDay.findOne({ days: day });
        if (!foundDay) {
          throw new Error(`El día proporcionado (${day}) no existe.`);
        }
        return foundDay._id;
      }));

      const scheduleHourIds = await Promise.all(scheduleHours.map(async (hour) => {
        const foundHour = await ScheduleHour.findOne({ range: hour });
        if (!foundHour) {
          throw new Error(`La hora proporcionada (${hour}) no existe.`);
        }
        return foundHour._id;
      }));

      const updatedActivity = await ActivitiesModel.findByIdAndUpdate(
        req.params.id,
        {
          name,
          categories: categoryIds,
          scheduleDay: scheduleDayIds,
          scheduleHour: scheduleHourIds,
          centers: centerIds,
        },
        { new: true }
      ).populate('categories').populate('scheduleDay').populate('scheduleHour').populate('centers').populate('monitor');

      if (!updatedActivity) {
        return res.status(404).json({ message: 'Actividad no encontrada.' });
      }
      res.status(200).json(updatedActivity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al actualizar la actividad.' });
    }
  }

  // Eliminar una actividad por ID
  async deleteActivity(req, res) {
    try {
      const deletedActivity = await ActivitiesModel.findByIdAndDelete(req.params.id);
      if (!deletedActivity) {
        return res.status(404).json({ message: 'Actividad no encontrada.' });
      }
      res.status(200).json({ message: 'Actividad eliminada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al eliminar la actividad.' });
    }
  }

  // Asignar una actividad a un estudiante
  async assignActivityToStudent(req, res) {
    try {
      const { activityId, studentId, categoryName, scheduleDay, scheduleHour, centerName } = req.body;

      const activityFound = await ActivitiesModel.findById(activityId);
      if (!activityFound) {
        return res.status(400).json({ message: 'La actividad proporcionada no existe.' });
      }

      const studentFound = await StudentModel.findById(studentId);
      if (!studentFound) {
        return res.status(400).json({ message: 'El estudiante proporcionado no existe.' });
      }

      const categoryFound = await Category.findOne({ name: categoryName });
      if (!categoryFound) {
        return res.status(400).json({ message: 'La categoría proporcionada no existe.' });
      }

      const scheduleDayFound = await ScheduleDay.findOne({ days: scheduleDay });
      if (!scheduleDayFound) {
        return res.status(400).json({ message: `El día proporcionado (${scheduleDay}) no existe.` });
      }

      const scheduleHourFound = await ScheduleHour.findOne({ range: scheduleHour });
      if (!scheduleHourFound) {
        return res.status(400).json({ message: `La hora proporcionada (${scheduleHour}) no existe.` });
      }

      const centerFound = await Center.findOne({ name: centerName });
      if (!centerFound) {
        return res.status(400).json({ message: 'El centro proporcionado no existe.' });
      }

      // Si el estudiante no tiene centro o curso asignados, asignarlos
      if (!studentFound.center) {
        studentFound.center = centerFound._id;
      }
      if (!studentFound.course) {
        studentFound.course = 'Curso no especificado'; // Puedes ajustar el valor predeterminado según sea necesario
      }

      studentFound.activities.push({
        activity: activityFound._id,
        category: categoryFound._id,
        scheduleDay: scheduleDayFound._id,
        scheduleHour: scheduleHourFound._id,
        center: centerFound._id
      });

      await studentFound.save();

      const newAssignment = new ActivitiesStudentsModel({
        student: studentFound._id,
        activity: activityFound._id,
      });

      await newAssignment.save();

      res.status(200).json({ message: 'Actividad asignada exitosamente al estudiante.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Hubo un error al asignar la actividad al estudiante.',
        error: error.message,
      });
    }
  }
}

export default new ActivitiesController();
