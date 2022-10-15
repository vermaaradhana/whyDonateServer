import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  full_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

// const validateEmail = function (email: string) {
//   const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
//   return re.test(email);
// };
const UserSchema = new Schema<IUser>({
  full_name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // validate: [validateEmail, 'Please fill a valid email address'],
    default: null
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() }
});
export const User: Model<IUser> = model('User', UserSchema);
