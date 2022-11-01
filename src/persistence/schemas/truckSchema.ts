import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const Truck = new mongoose.Schema(
  {
    truckId: { type: String, unique: true },

    licencePlate: { 
      type: String,
      unique: true
    },

    tare: {
      type: Number,
      required: [true, 'Please enter tare'],
      index: true,
    },

    capacity: {
      type: Number,
      required: [true, 'Please enter load capacity'],
      index: true,
    },

    maxBateryCapacity: {
      type: Number,
      required: [true, 'Please enter battery capacity'],
      index: true,
    },

    autonomyFullChargeLoad: {
      type: Number,
      required: [true, 'Please enter the autonomy'],
      index: true,
    },

    timeCharging: {
      type: Number,
      required: [true, 'Please enter time of charging'],
      index: true,
    },

  },
  { timestamps: true },
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', Truck);
