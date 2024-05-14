import Center from '../models/CenterModel.js';

// Función para crear un nuevo centro
export async function createCenter(req, res) {
    try {
        const centerData = req.body;
        const center = new Center(centerData);
        await center.save();
        if (res) {
            res.status(201).json(center);
        }
    } catch (error) {
        if (res) {
            res.status(500).json({ message: error.message });
        }
    }
}

// Función para obtener un centro por su ID
export async function getCenterById(req, res) {
    try {
        const centerId = req.params.id;
        const center = await Center.findById(centerId);
        if (!center) {
            return res.status(404).json({ message: 'Centro no encontrado' });
        }
        if (res) {
            res.json(center);
        }
    } catch (error) {
        if (res) {
            res.status(500).json({ message: error.message });
        }
    }
}

// Función para actualizar un centro por su ID
export async function updateCenter(req, res) {
    try {
        const centerId = req.params.id;
        const newData = req.body;
        const updatedCenter = await Center.findByIdAndUpdate(centerId, newData, { new: true });
        if (!updatedCenter) {
            return res.status(404).json({ message: 'Centro no encontrado' });
        }
        if (res) {
            res.json(updatedCenter);
        }
    } catch (error) {
        if (res) {
            res.status(500).json({ message: error.message });
        }
    }
}

// Función para eliminar un centro por su ID
export async function deleteCenter(req, res) {
    try {
        const centerId = req.params.id;
        const deletedCenter = await Center.findByIdAndDelete(centerId);
        if (!deletedCenter) {
            return res.status(404).json({ message: 'Centro no encontrado' });
        }
        if (res) {
            res.json(deletedCenter);
        }
    } catch (error) {
        if (res) {
            res.status(500).json({ message: error.message });
        }
    }
}
// Función para obtener todos los centros
export async function getAllCenters(req, res) {
    try {
        const centers = await Center.find();
        res.json(centers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export default { createCenter, getCenterById, updateCenter, deleteCenter, getAllCenters };