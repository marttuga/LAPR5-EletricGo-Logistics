import { IRolePersistence } from '../../dataschema/IRolePersistence';
import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: [true, 'Please enter role type'],
      unique: true,
      index:true
    },
  },
  {timestamps: true}
);

export default mongoose.model<IRolePersistence & mongoose.Document>('Role', RoleSchema);
