import Center from "../models/CentersModel.js";

class CentersController {
  async createCenter(req, res) {
    try {
      const { name, address } = req.body;

      const newCenter = new Center({ name, address });
      const savedCenter = await newCenter.save();
      res.status(201).json(savedCenter);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al crear el centro." });
    }
  }

  async getAllCenters(req, res) {
    try {
      const centers = await Center.find();
      res.status(200).json(centers);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al obtener los centros." });
    }
  }

  async getCenterById(req, res) {
    try {
      const center = await Center.findById(req.params.id);
      if (!center) {
        return res.status(404).json({ message: "Centro no encontrado." });
      }
      res.status(200).json(center);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al obtener el centro." });
    }
  }

  async updateCenter(req, res) {
    try {
      const { name, address } = req.body;
      const updatedCenter = await Center.findByIdAndUpdate(
        req.params.id,
        { name, address },
        { new: true }
      );
      if (!updatedCenter) {
        return res.status(404).json({ message: "Centro no encontrado." });
      }
      res.status(200).json(updatedCenter);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Hubo un error al actualizar el centro." });
    }
  }

  async deleteCenter(req, res) {
    try {
      const deletedCenter = await Center.findByIdAndDelete(req.params.id);
      if (!deletedCenter) {
        return res.status(404).json({ message: "Centro no encontrado." });
      }
      res.status(200).json({ message: "Centro eliminado exitosamente." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al eliminar el centro." });
    }
  }
}

export default new CentersController();
