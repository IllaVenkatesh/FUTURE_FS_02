import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
