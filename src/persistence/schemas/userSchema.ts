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
      unique: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, 'Please enter password'],
      index: true,

    },

    role: {
      type: String,
      required: [true, 'Please enter role type'],
      index: true,

    },

    userContact: {
      type: Number,
      required: [true, 'Please enter contact number'],
      index: true,
    },

    active: {
      type: Boolean,
      required: [true, 'User state'],
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User);
