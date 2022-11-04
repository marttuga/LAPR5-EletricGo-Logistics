import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';
import { LicencePlate } from '../../domain/licencePlate';
import { Tare } from '../../domain/tare';
import { Capacity } from '../../domain/capacity';
import { MaxBateryCapacity } from '../../domain/maxBateryCapacity';
import { AutonomyFullChargeLoad } from '../../domain/autonomyFullChargeLoad';
import { TimeCharging } from '../../domain/timeCharging';


const Truck = new mongoose.Schema(
  {

    licencePlate: { 
      type: String,
      required: [true, 'Please enter licence plate'],
      unique: true,
      index:true
    },

    tare: {
      type: Number,
      required: [true, 'Please enter tare'],
      index: true,
    },

    capacity: {
      type: Number,
      required: [true, 'Please enter capacity'],
      index: true,
    },


    maxBateryCapacity: {
      type: Number,
      required: [true, 'Please enter battery capacity'],
      index: true,
    },
    
    autonomyFullChargeLoad: {
      type: Number,
      required: [true, 'Please enter autonomy'],
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
