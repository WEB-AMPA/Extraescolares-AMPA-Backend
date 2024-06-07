import StudentModel from '../models/StudentModels.js';
import Center from '../models/CentersModel.js';
import PartnerModel from '../models/PartnerModel.js';

class StudentsController {
  async createStudent(req, res) {
    try {
      const { name, lastname, breakfast, observations, course, partner_number, centerName } = req.body;

      // Buscar el centro por su nombre
      const center = await Center.findOne({ name: centerName });
      if (!center) {
        return res.status(400).json({ message: 'El centro proporcionado no existe.' });
      }

      // Buscar el socio por su número de socio
      const partner = await PartnerModel.findOne({ partner_number });
      if (!partner) {
        return res.status(400).json({ message: 'El socio proporcionado no existe.' });
      }

      const newStudent = new StudentModel({
        name,
        lastname,
        breakfast,
        observations,
        course,
        partner_id: partner._id, // Asignar el ObjectId del socio
        center: center._id // Asignar el ObjectId del centro
      });

      const savedStudent = await newStudent.save();
      res.status(201).json(savedStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al crear el estudiante.', error: error.message });
    }
  }

  async getAllStudents(req, res) {
    try {
      const students = await StudentModel.find().populate('center').populate('partner_id');
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener los estudiantes.', error: error.message });
    }
  }

  async getStudentById(req, res) {
    try {
      const student = await StudentModel.findById(req.params.id).populate('center').populate('partner_id');
      if (!student) {
        return res.status(404).json({ message: 'Estudiante no encontrado.' });
      }
      res.status(200).json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener el estudiante.', error: error.message });
    }
  }

  async updateStudent(req, res) {
    try {
      const { name, lastname, breakfast, observations, course, partner_number, centerName } = req.body;

      // Buscar el centro por su nombre
      const center = await Center.findOne({ name: centerName });
      if (!center) {
        return res.status(400).json({ message: 'El centro proporcionado no existe.' });
      }

      // Buscar el socio por su número de socio
      const partner = await PartnerModel.findOne({ partner_number });
      if (!partner) {
        return res.status(400).json({ message: 'El socio proporcionado no existe.' });
      }

      const updatedStudent = await StudentModel.findByIdAndUpdate(
        req.params.id,
        { name, lastname, breakfast, observations, course, partner_id: partner._id, center: center._id },
        { new: true }
      ).populate('center').populate('partner_id');

      if (!updatedStudent) {
        return res.status(404).json({ message: 'Estudiante no encontrado.' });
      }
      res.status(200).json(updatedStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al actualizar el estudiante.', error: error.message });
    }
  }

  async deleteStudent(req, res) {
    try {
      const deletedStudent = await StudentModel.findByIdAndDelete(req.params.id);
      if (!deletedStudent) {
        return res.status(404).json({ message: 'Estudiante no encontrado.' });
      }
      res.status(200).json({ message: 'Estudiante eliminado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al eliminar el estudiante.', error: error.message });
    }
  }

// Obtener todos los estudiantes que tienen el desayuno habilitado
  async getStudentsWithBreakfast(req, res) {
    try {
      const students = await StudentModel.find({ breakfast: true });
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener los estudiantes con desayuno.', error: error.message });
    }
  }
}

export default new StudentsController();
