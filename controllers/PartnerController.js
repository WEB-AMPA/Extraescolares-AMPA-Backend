// partnerController.js

import PartnerModel from '../models/PartnerModel.js';

// Controlador para crear un nuevo socio
export const createPartner = async (req, res) => {
  try {
    const newPartner = await PartnerModel.create(req.body);
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener todos los socios
export const getAllPartners = async (req, res) => {
  try {
    const partners = await PartnerModel.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un socio por su ID
export const getPartnerById = async (req, res) => {
  try {
    const partner = await PartnerModel.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Socio no encontrado' });
    }
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar un socio
export const updatePartner = async (req, res) => {
  try {
    const updatedPartner = await PartnerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPartner) {
      return res.status(404).json({ message: 'Socio no encontrado' });
    }
    res.status(200).json(updatedPartner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar un socio
export const deletePartner = async (req, res) => {
  try {
    const deletedPartner = await PartnerModel.findByIdAndDelete(req.params.id);
    if (!deletedPartner) {
      return res.status(404).json({ message: 'Socio no encontrado' });
    }
    res.status(200).json({ message: 'Socio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

