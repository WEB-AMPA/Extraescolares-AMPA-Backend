import ActivitiesStudentsModel from "../models/ActivitiesStudentsModel.js";
import StudentModel from "../models/StudentModels.js";
import ActivitiesModel from "../models/ActivitiesModel.js";

class ActivitiesStudentsController {
  // Obtener todas las asignaciones de actividades a estudiantes
  async getAllAssignments(req, res) {
    try {
      const assignments = await ActivitiesStudentsModel.find()
        .populate('student')
        .populate('activity');
      res.status(200).json(assignments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al obtener las asignaciones." });
    }
  }

  // Obtener una asignación por ID
  async getAssignmentById(req, res) {
    try {
      const assignment = await ActivitiesStudentsModel.findById(req.params.id)
        .populate('student')
        .populate('activity');
      if (!assignment) {
        return res.status(404).json({ message: "Asignación no encontrada." });
      }
      res.status(200).json(assignment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al obtener la asignación." });
    }
  }


  async getStudentsByActivity(req, res) {
    try {
      const { activityId } = req.params;
      const students = await ActivitiesStudentsModel.find({ activity: activityId }).populate('student');
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al obtener los estudiantes asociados a la actividad." });
    }
  }

  
  // Crear una nueva asignación de actividad a estudiante
  async createAssignment(req, res) {
    try {
      const { studentId, activityId } = req.body;

      const studentFound = await StudentModel.findById(studentId);
      if (!studentFound) {
        return res.status(400).json({ message: "El estudiante proporcionado no existe." });
      }

      const activityFound = await ActivitiesModel.findById(activityId);
      if (!activityFound) {
        return res.status(400).json({ message: "La actividad proporcionada no existe." });
      }

      const newAssignment = new ActivitiesStudentsModel({
        student: studentFound._id,
        activity: activityFound._id,
      });

      const savedAssignment = await newAssignment.save();
      res.status(201).json(savedAssignment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al crear la asignación." });
    }
  }

  // Actualizar una asignación por ID
  async updateAssignment(req, res) {
    try {
      const { studentId, activityId } = req.body;

      const studentFound = await StudentModel.findById(studentId);
      if (!studentFound) {
        return res.status(400).json({ message: "El estudiante proporcionado no existe." });
      }

      const activityFound = await ActivitiesModel.findById(activityId);
      if (!activityFound) {
        return res.status(400).json({ message: "La actividad proporcionada no existe." });
      }

      const updatedAssignment = await ActivitiesStudentsModel.findByIdAndUpdate(
        req.params.id,
        {
          student: studentFound._id,
          activity: activityFound._id,
        },
        { new: true }
      ).populate('student').populate('activity');

      if (!updatedAssignment) {
        return res.status(404).json({ message: "Asignación no encontrada." });
      }

      res.status(200).json(updatedAssignment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al actualizar la asignación." });
    }
  }

  // Eliminar una asignación por ID
  async deleteAssignment(req, res) {
    try {
      const deletedAssignment = await ActivitiesStudentsModel.findByIdAndDelete(req.params.id);
      if (!deletedAssignment) {
        return res.status(404).json({ message: "Asignación no encontrada." });
      }
      res.status(200).json({ message: "Asignación eliminada exitosamente." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al eliminar la asignación." });
    }
  }
}

export default new ActivitiesStudentsController();