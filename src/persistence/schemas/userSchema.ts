import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {

    firstName: {
      type: String,
      required: [true, 'Please enter first name'],
      index: true,
    },

    lastName: {
      type: String,
      required: [true, 'Please enter last name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,  
      unique: true,
      index: true,
    },

    password: String,

    salt: String,

    role: {
      type: String,
      required: [true, 'Please enter role type'],
    },

    userContact: {
      type: Number,
      required: [true, 'Please enter contact number'],
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User);
