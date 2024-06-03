import ScheduleHoursModel from '../models/ScheduleHoursModel.js';

class ScheduleHoursController {
    async createScheduleHour(req, res) {
        try {
            const { range } = req.body;
            const newScheduleHour = new ScheduleHoursModel({ range });
            const savedScheduleHour = await newScheduleHour.save();
            res.status(201).json(savedScheduleHour);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al crear el horario.' });
        }
    }

    async getAllScheduleHours(req, res) {
        try {
            const scheduleHours = await ScheduleHoursModel.find();
            res.status(200).json(scheduleHours);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al obtener los horarios.' });
        }
    }

    async getScheduleHourById(req, res) {
        try {
            const scheduleHour = await ScheduleHoursModel.findById(req.params.id);
            if (!scheduleHour) {
                return res.status(404).json({ message: 'Horario no encontrado.' });
            }
            res.status(200).json(scheduleHour);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al obtener el horario.' });
        }
    }

    async updateScheduleHour(req, res) {
        try {
            const { range } = req.body;
            const updatedScheduleHour = await ScheduleHoursModel.findByIdAndUpdate(req.params.id, { range }, { new: true });
            if (!updatedScheduleHour) {
                return res.status(404).json({ message: 'Horario no encontrado.' });
            }
            res.status(200).json(updatedScheduleHour);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al actualizar el horario.' });
        }
    }

    async deleteScheduleHour(req, res) {
        try {
            const deletedScheduleHour = await ScheduleHoursModel.findByIdAndDelete(req.params.id);
            if (!deletedScheduleHour) {
                return res.status(404).json({ message: 'Horario no encontrado.' });
            }
            res.status(200).json({ message: 'Horario eliminado exitosamente.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al eliminar el horario.' });
        }
    }
}

export default new ScheduleHoursController();