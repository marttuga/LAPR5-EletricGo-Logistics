import { IFleetPlaningPersistence } from '../../dataschema/IFleetPlaningPersistence';
import mongoose from 'mongoose';

const FleetPlaning = new mongoose.Schema(
  {

    fleetPlaningId: { 
      type: String,
      required: [true, 'Please enter fleetPlaningId'],
      unique: true,
      index:true
    },

    truckId: {
      type: String,
      required: [true, 'Please enter truckId'],
      index: true,
    },


    date: {
      type: String,
      required: [true, 'Please enter date'],
      index: true,
    },

    route: {
      type: Array,
      required: [true, 'Please enter route'],
      index: true,
    },


  },
  { timestamps: true },
);

export default mongoose.model<IFleetPlaningPersistence & mongoose.Document>('FleetPlaning', FleetPlaning);
 