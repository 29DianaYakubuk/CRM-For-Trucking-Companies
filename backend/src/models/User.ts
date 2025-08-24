import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
  email: string;
  password: string;
  name: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  // @ts-ignore
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// @ts-ignore
userSchema.methods.comparePassword = async function (candidate: string) {
  // @ts-ignore
  return bcrypt.compare(candidate, this.password);
};

export default model<IUser>('User', userSchema);