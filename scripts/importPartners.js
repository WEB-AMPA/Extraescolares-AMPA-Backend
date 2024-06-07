import mongoose from "mongoose";
import xlsx from "xlsx";
import PartnerModel from "../models/PartnerModel.js";
import UserModel from "../models/UsersModel.js";

mongoose
  .connect(
    "mongodb+srv://db_ciudadangeles:dqoHwcXsbXlY1jFy@actividadesextraescolar.xcbrlxt.mongodb.net/extracurriculars?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((err) => {
    console.error("Error de conexión a MongoDB:", err);
  });

// Función para leer el archivo Excel y guardar los datos en MongoDB
const importPartners = async () => {
  try {
    // Leer el archivo Excel
    const workbook = xlsx.readFile("./data/partners.xlsx"); // Ruta al archivo Excel
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convertir los datos de la hoja a formato JSON
    const partners = xlsx.utils.sheet_to_json(sheet);

    // Guardar cada socio en la base de datos
    for (const partner of partners) {
      const {
        partner_number,
        name,
        lastname,
        email,
        phone_number,
        registration_date,
      } = partner;

      // Verificar si el socio ya existe
      const existingPartner = await PartnerModel.findOne({ partner_number });
      if (existingPartner) {
        console.log(
          `Socio con número de socio ${partner_number} ya existe. Actualizando información...`
        );
        existingPartner.phone_number = phone_number;
        existingPartner.registration_date = new Date(registration_date);
        await existingPartner.save();
        continue;
      }

      // Verificar si el usuario ya existe
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        console.log(
          `Usuario con email ${email} ya existe. Asociando al socio...`
        );
        // Crear un nuevo socio asociado al usuario existente
        const newPartner = new PartnerModel({
          partner_number,
          phone_number,
          registration_date: new Date(registration_date),
          user_id: existingUser._id,
        });
        await newPartner.save();
        continue;
      }

      // Crear un nuevo usuario
      const newUser = new UserModel({
        email,
        lastname,
        name,
        role: "socio",
      });

      // Guardar el nuevo usuario en la base de datos
      const savedUser = await newUser.save();

      // Crear un nuevo socio asociado al usuario
      const newPartner = new PartnerModel({
        partner_number,
        phone_number,
        registration_date: new Date(registration_date),
        user_id: savedUser._id,
      });

      // Guardar el nuevo socio en la base de datos
      await newPartner.save();

      console.log(`Socio ${partner_number} guardado correctamente`);
    }

    console.log("Importación de socios completada");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error al importar socios:", error);
    mongoose.disconnect();
  }
};

importPartners();
