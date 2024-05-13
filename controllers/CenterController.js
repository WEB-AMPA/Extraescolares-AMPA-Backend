const Center = require('../models/CenterModel.js');

async function createCenter(centerData) {
    try {
        const center = new Center(centerData);
        await center.save();
        return center;
    } catch (error) {
        throw error;
    }
}

async function getCenterById(centerId) {
    try {
        const center = await Center.findById(centerId);
        return center;
    } catch (error) {
        throw error;
    }
}

async function updateCenter(centerId, newData) {
    try {
        const center = await Center.findByIdAndUpdate(centerId, newData, { new: true });
        return center;
    } catch (error) {
        throw error;
    }
}

async function deleteCenter(centerId) {
    try {
        const deletedCenter = await Center.findByIdAndDelete(centerId);
        return deletedCenter;
    } catch (error) {
        throw error;
    }
}

module.exports = { createCenter, getCenterById, updateCenter, deleteCenter };