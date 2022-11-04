import { IRoutePersistence } from '../../dataschema/IRoutePersistence';
import mongoose from 'mongoose';

const RouteSchema = new mongoose.Schema(
  {
    routeId: { type: String, unique: true , index: true},
    distance: {
        type: Number,
        required: [true, 'Please enter distance'],
        index: true,
      },
      routeTime: {
        type: Number,
        required: [true, 'Please enter the route time'],
        index: true,
      },
      batteryWaste: {
        type: Number,
        required: [true, 'Please enter the battery'],
        index: true,
      },
      arrivalId: {
        type: String,
        required: [true, 'Please enter the arrival warehouse id'],
        index: true,
      },
      departureId: {
        type: String,
        required: [true, 'Please enter departure warehouse id'],
        index: true,
      },
      extraTime: {
        type: Number,
        required: [true, 'Please enter the extra time'],
        index: true,
      },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRoutePersistence & mongoose.Document>('Route', RouteSchema);
