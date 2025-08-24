import { Schema, model, Types } from 'mongoose';

interface IItem {
  title: string;
  description?: string;
  owner: Types.ObjectId;
  status: 'todo' | 'in_progress' | 'done';
}

const itemSchema = new Schema<IItem>({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['todo','in_progress','done'], default: 'todo' }
}, { timestamps: true });

export default model<IItem>('Item', itemSchema);