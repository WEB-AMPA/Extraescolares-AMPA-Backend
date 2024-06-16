import StudentModel from '../models/StudentModels.js';
import Center from '../models/CentersModel.js';
import UserModel from '../models/UsersModel.js';

class StudentsController {
  async createStudent(req, res) {
    try {
      const { name, lastname, breakfast, observations, course, partner_number, centerName } = req.body;

      const center = await Center.findOne({ name: centerName });
      if (!center) {
        return res.status(400).json({ message: 'El centro proporcionado no existe.' });
      }

      const partner = await UserModel.findOne({ partner_number });
      if (!partner) {
        return res.status(400).json({ message: 'El socio proporcionado no existe.' });
      }

      const newStudent = new StudentModel({
        name,
        lastname,
        breakfast,
        observations,
        course,
        partner: partner._id,
        center: center._id
      });

      const savedStudent = await newStudent.save();

      if (!Array.isArray(partner.students)) {
        partner.students = [];
      }
      partner.students.push(savedStudent._id);
      await partner.save();

      res.status(201).json(savedStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al crear el estudiante.', error: error.message });
    }
  }

  async getAllStudents(req, res) {
    try {
      const students = await StudentModel.find().populate('center partner');
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener los estudiantes.', error: error.message });
    }
  }

  async getStudentById(req, res) {
    try {
      const student = await StudentModel.findById(req.params.id).populate('center partner');
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

      const center = await Center.findOne({ name: centerName });
      if (!center) {
        return res.status(400).json({ message: 'El centro proporcionado no existe.' });
      }

      const partner = await UserModel.findOne({ partner_number });
      if (!partner) {
        return res.status(400).json({ message: 'El socio proporcionado no existe.' });
      }

      const updatedStudent = await StudentModel.findByIdAndUpdate(
        req.params.id,
        { name, lastname, breakfast, observations, course, partner: partner._id, center: center._id },
        { new: true }
      ).populate('center partner');

      if (!updatedStudent) {
        return res.status(404).json({ message: 'Estudiante no encontrado.' });
      }

      if (!Array.isArray(partner.students)) {
        partner.students = [];
      }

      const studentIdStr = updatedStudent._id.toString();
      if (!partner.students.some(id => id.toString() === studentIdStr)) {
        partner.students.push(updatedStudent._id);
        await partner.save();
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

      const partner = await UserModel.findById(deletedStudent.partner);
      if (partner) {
        if (!Array.isArray(partner.students)) {
          partner.students = [];
        }
        partner.students = partner.students.filter(id => id.toString() !== deletedStudent._id.toString());
        await partner.save();
      }

      res.status(200).json({ message: 'Estudiante eliminado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al eliminar el estudiante.', error: error.message });
    }
  }

  async getStudentsWithBreakfast(req, res) {
    try {
      const students = await StudentModel.find({ breakfast: true });
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener los estudiantes con desayuno.', error: error.message });
    }
  }

  async getStudentsByPartnerId(req, res) {
    try {
      const { partnerId } = req.params;
      const students = await StudentModel.find({ partner: partnerId }).populate('center partner');
      if (!students || students.length === 0) {
        return res.status(404).json({ message: 'No se encontraron estudiantes para el socio proporcionado.' });
      }
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener los estudiantes.', error: error.message });
    }
  }
}

export default new StudentsController();
