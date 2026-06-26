import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },

  source: {
    type: String,
    required: true,
    enum: ['Website', 'Referral', 'Social', 'Cold Call', 'Email', 'Other'],
    default: 'Website'
  },

  status: {
    type: String,
    required: true,
    enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
    default: 'New'
  },

  priority: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },

  notes: {
    type: String,
    trim: true,
    default: ""
  },

  followUpDate: {
    type: Date,
    default: null
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  history: [{
    type: String
  }],

  isArchived: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);