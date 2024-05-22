import ActivitiesModel from "../models/ActivitiesModel.js";
import Center from "../models/CentersModel.js";
import Category from "../models/CategoriesModel.js";
import ScheduleDay from "../models/ScheduleDaysModel.js";
import ScheduleHour from "../models/ScheduleHoursModel.js";
import StudentModel from "../models/StudentModels.js";

class ActivitiesController {
  async createActivity(req, res) {
    try {
      const { name, categoryNames, scheduleDays, scheduleHours, centerNames } =
        req.body;

      const centerIds = await Promise.all(
        centerNames.map(async (centerName) => {
          const centerFound = await Center.findOne({ name: centerName });
          if (!centerFound) {
            throw new Error(
              `El centro proporcionado (${centerName}) no existe.`
            );
          }
          return centerFound._id;
        })
      );

      const categoryIds = await Promise.all(
        categoryNames.map(async (categoryName) => {
          const categoryFound = await Category.findOne({ name: categoryName });
          if (!categoryFound) {
            throw new Error(
              `La categoría proporcionada (${categoryName}) no existe.`
            );
          }
          return categoryFound._id;
        })
      );

      const scheduleDayIds = await Promise.all(
        scheduleDays.map(async (day) => {
          const foundDay = await ScheduleDay.findOne({ days: day });
          if (!foundDay) {
            throw new Error(`El día proporcionado (${day}) no existe.`);
          }
          return foundDay._id;
        })
      );

      const scheduleHourIds = await Promise.all(
        scheduleHours.map(async (hour) => {
          const foundHour = await ScheduleHour.findOne({ range: hour });
          if (!foundHour) {
            throw new Error(`La hora proporcionada (${hour}) no existe.`);
          }
          return foundHour._id;
        })
      );

      const existingActivity = await ActivitiesModel.findOne({ name });
      if (existingActivity) {
        return res.status(400).json({ message: "La actividad ya existe." });
      }

      const newActivity = new ActivitiesModel({
        name,
        categories: categoryIds,
        scheduleDays: scheduleDayIds,
        scheduleHours: scheduleHourIds,
        centers: centerIds,
      });

      const savedActivity = await newActivity.save();
      const populatedActivity = await ActivitiesModel.findById(
        savedActivity._id
      )
        .populate("categories")
        .populate("scheduleDays")
        .populate("scheduleHours")
        .populate("centers");

      res.status(201).json(populatedActivity);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Hubo un error al crear la actividad.",
        error: error.message,
      });
    }
  }

  async getAllActivities(req, res) {
    try {
      const activities = await ActivitiesModel.find()
        .populate("categories")
        .populate("scheduleDays")
        .populate("scheduleHours")
        .populate("centers");
      res.status(200).json(activities);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al obtener las actividades." });
    }
  }

  async getActivityById(req, res) {
    try {
      const activity = await ActivitiesModel.findById(req.params.id)
        .populate("categories")
        .populate("scheduleDays")
        .populate("scheduleHours")
        .populate("centers");
      if (!activity) {
        return res.status(404).json({ message: "Actividad no encontrada." });
      }
      res.status(200).json(activity);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al obtener la actividad." });
    }
  }

  async updateActivityDetails(req, res) {
    try {
      const { id } = req.params;
      const { name, categoryNames, scheduleDays, scheduleHours, centerNames } =
        req.body;

      const centerIds = await Promise.all(
        centerNames.map(async (centerName) => {
          const centerFound = await Center.findOne({ name: centerName });
          if (!centerFound) {
            throw new Error(
              `El centro proporcionado (${centerName}) no existe.`
            );
          }
          return centerFound._id;
        })
      );

      const categoryIds = await Promise.all(
        categoryNames.map(async (categoryName) => {
          const categoryFound = await Category.findOne({ name: categoryName });
          if (!categoryFound) {
            throw new Error(
              `La categoría proporcionada (${categoryName}) no existe.`
            );
          }
          return categoryFound._id;
        })
      );

      const scheduleDayIds = await Promise.all(
        scheduleDays.map(async (day) => {
          const foundDay = await ScheduleDay.findOne({ days: day });
          if (!foundDay) {
            throw new Error(`El día proporcionado (${day}) no existe.`);
          }
          return foundDay._id;
        })
      );

      const scheduleHourIds = await Promise.all(
        scheduleHours.map(async (hour) => {
          const foundHour = await ScheduleHour.findOne({ range: hour });
          if (!foundHour) {
            throw new Error(`La hora proporcionada (${hour}) no existe.`);
          }
          return foundHour._id;
        })
      );

      const updatedActivity = await ActivitiesModel.findByIdAndUpdate(
        id,
        {
          name,
          categories: categoryIds,
          scheduleDays: scheduleDayIds,
          scheduleHours: scheduleHourIds,
          centers: centerIds,
        },
        { new: true }
      )
        .populate("categories")
        .populate("scheduleDays")
        .populate("scheduleHours")
        .populate("centers");

      if (!updatedActivity) {
        return res.status(404).json({ message: "Actividad no encontrada." });
      }
      res.status(200).json(updatedActivity);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al actualizar la actividad." });
    }
  }

  async deleteActivity(req, res) {
    try {
      const deletedActivity = await ActivitiesModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedActivity) {
        return res.status(404).json({ message: "Actividad no encontrada." });
      }
      res.status(200).json({ message: "Actividad eliminada exitosamente." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al eliminar la actividad." });
    }
  }

  async assignActivityToStudent(req, res) {
    try {
      const {
        activityId,
        studentId,
        categoryName,
        scheduleDay,
        scheduleHour,
        centerName,
      } = req.body;

      const activityFound = await ActivitiesModel.findById(activityId);
      if (!activityFound) {
        return res
          .status(400)
          .json({ message: "La actividad proporcionada no existe." });
      }

      const studentFound = await StudentModel.findById(studentId);
      if (!studentFound) {
        return res
          .status(400)
          .json({ message: "El estudiante proporcionado no existe." });
      }

      const categoryFound = await Category.findOne({ name: categoryName });
      if (!categoryFound) {
        return res
          .status(400)
          .json({ message: "La categoría proporcionada no existe." });
      }

      const scheduleDayFound = await ScheduleDay.findOne({ days: scheduleDay });
      if (!scheduleDayFound) {
        return res
          .status(400)
          .json({
            message: `El día proporcionado (${scheduleDay}) no existe.`,
          });
      }

      const scheduleHourFound = await ScheduleHour.findOne({
        range: scheduleHour,
      });
      if (!scheduleHourFound) {
        return res
          .status(400)
          .json({
            message: `La hora proporcionada (${scheduleHour}) no existe.`,
          });
      }

      const centerFound = await Center.findOne({ name: centerName });
      if (!centerFound) {
        return res
          .status(400)
          .json({ message: "El centro proporcionado no existe." });
      }

      // Si el estudiante no tiene centro o curso asignados, asignarlos
      if (!studentFound.center) {
        studentFound.center = centerFound._id;
      }
      if (!studentFound.course) {
        studentFound.course = "Curso no especificado"; // Puedes ajustar el valor predeterminado según sea necesario
      }

      studentFound.activities.push({
        activity: activityFound._id,
        category: categoryFound._id,
        scheduleDay: scheduleDayFound._id,
        scheduleHour: scheduleHourFound._id,
        center: centerFound._id,
      });

      await studentFound.save();

      res
        .status(200)
        .json({ message: "Actividad asignada exitosamente al estudiante." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Hubo un error al asignar la actividad al estudiante.",
        error: error.message,
      });
    }
  }
}

export default new ActivitiesController();
