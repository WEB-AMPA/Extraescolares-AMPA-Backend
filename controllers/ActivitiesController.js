import ActivitiesModel from "../models/ActivitiesModel.js";
import Center from "../models/CentersModel.js";
import Category from "../models/CategoriesModel.js";
import ScheduleDay from "../models/ScheduleDaysModel.js";
import ScheduleHour from "../models/ScheduleHoursModel.js";

class ActivitiesController {
  async createActivity(req, res) {
    try {
      const { name, categoryName, scheduleDays, scheduleHours, centerName } =
        req.body;

      // Buscar el centro por su nombre
      const centerFound = await Center.findOne({ name: centerName });
      if (!centerFound) {
        return res
          .status(400)
          .json({ message: "El centro proporcionado no existe." });
      }

      // Buscar la categoría por su nombre
      const categoryFound = await Category.findOne({ name: categoryName });
      if (!categoryFound) {
        return res
          .status(400)
          .json({ message: "La categoría proporcionada no existe." });
      }

      // Buscar los días de la actividad
      const scheduleDayIds = await Promise.all(
        scheduleDays.map(async (day) => {
          const foundDay = await ScheduleDay.findOne({ days: day });
          if (!foundDay) {
            throw new Error(`El día proporcionado (${day}) no existe.`);
          }
          return foundDay._id;
        })
      );

      // Buscar las horas de la actividad
      const scheduleHourIds = await Promise.all(
        scheduleHours.map(async (hour) => {
          const foundHour = await ScheduleHour.findOne({ range: hour });
          if (!foundHour) {
            throw new Error(`La hora proporcionada (${hour}) no existe.`);
          }
          return foundHour._id;
        })
      );

      // Verificar si la actividad ya existe
      const existingActivity = await ActivitiesModel.findOne({ name });
      if (existingActivity) {
        return res.status(400).json({ message: "La actividad ya existe." });
      }

      // Crear la nueva actividad
      const newActivity = new ActivitiesModel({
        name,
        category: categoryFound._id,
        scheduleDay: scheduleDayIds,
        scheduleHour: scheduleHourIds,
        centers: [centerFound._id],
      });

      const savedActivity = await newActivity.save();
      const populatedActivity = await ActivitiesModel.findById(
        savedActivity._id
      )
        .populate("category")
        .populate("scheduleDay")
        .populate("scheduleHour")
        .populate("centers");

      res.status(201).json(populatedActivity);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Hubo un error al crear la actividad.",
          error: error.message,
        });
    }
  }
}

export default new ActivitiesController();
