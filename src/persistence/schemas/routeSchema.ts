import { IRoutePersistence } from '../../dataschema/IRoutePersistence';
import mongoose from 'mongoose';

const RouteSchema = new mongoose.Schema(
  {
    routeId: { type: Number, unique: true },
    distance: {
        type: Number,
        required: [true, 'Please enter distance'],
        index: true,
      },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRoutePersistence & mongoose.Document>('Route', RouteSchema);
