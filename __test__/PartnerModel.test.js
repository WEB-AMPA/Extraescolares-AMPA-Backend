import mongoose from 'mongoose';
import PartnerModel from '../models/PartnerModel'; 

describe('Partner Model', () => {
  it('debería tener los campos requeridos correctamente definidos', () => {
    const partner = new PartnerModel({});

    const error = partner.validateSync();
    expect(error).toBeDefined();
    expect(error.errors).toHaveProperty('partner_number');
    expect(error.errors).toHaveProperty('phone_number');
  });

  it('debería crear un socio con los campos proporcionados', () => {
    const partnerNumber = 12345;
    const phoneNumber = '123-456-7890';

    const partner = new PartnerModel({
      partner_number: partnerNumber,
      phone_number: phoneNumber
    });

    expect(partner.validateSync()).toBeUndefined();
    expect(partner.partner_number).toEqual(partnerNumber);
    expect(partner.phone_number).toEqual(phoneNumber);
  });
});
