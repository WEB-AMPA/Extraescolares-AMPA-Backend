import ScheduleDaysModel from '../models/ScheduleDaysModel.js';

class ScheduleDaysController {
    async createScheduleDay(req, res) {
        try {
            const { days } = req.body;

            const newScheduleDay = new ScheduleDaysModel({ days });
            const savedScheduleDay = await newScheduleDay.save();
            res.status(201).json(savedScheduleDay);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al crear el día de horario.' });
        }
    }

    async getAllScheduleDays(req, res) {
        try {
            const scheduleDays = await ScheduleDaysModel.find();
            res.json(scheduleDays);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al obtener los días de horario.' });
        }
    }

    async getScheduleDayById(req, res) {
        try {
            const { id } = req.params;
            const scheduleDay = await ScheduleDaysModel.findById(id);
            if (!scheduleDay) {
                return res.status(404).json({ message: 'Día de horario no encontrado.' });
            }
            res.json(scheduleDay);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al obtener el día de horario.' });
        }
    }

    async updateScheduleDayById(req, res) {
        try {
            const { id } = req.params;
            const { days } = req.body;

            const updatedScheduleDay = await ScheduleDaysModel.findByIdAndUpdate(id, { days }, { new: true });
            if (!updatedScheduleDay) {
                return res.status(404).json({ message: 'Día de horario no encontrado.' });
            }
            res.json(updatedScheduleDay);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al actualizar el día de horario.' });
        }
    }

    async deleteScheduleDayById(req, res) {
        try {
            const { id } = req.params;
            const deletedScheduleDay = await ScheduleDaysModel.findByIdAndDelete(id);
            if (!deletedScheduleDay) {
                return res.status(404).json({ message: 'Día de horario no encontrado.' });
            }
            res.json(deletedScheduleDay);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error al eliminar el día de horario.' });
        }
    }
}

export default new ScheduleDaysController();