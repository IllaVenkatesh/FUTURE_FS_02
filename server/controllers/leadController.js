import Lead from '../models/Lead.js';
import Note from '../models/Note.js';

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({ ...req.body, createdBy: req.user._id, history: [`Lead created by ${req.user.name}`] });
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const priority = req.query.priority || '';

    const query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ],
    };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);

    res.json({ leads, page, pages: Math.ceil(total / limit), total });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('notes');
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    await Note.deleteMany({ lead: req.params.id });
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const lead = await Lead.findByIdAndUpdate(id, { status, history: [`Status updated to ${status}`] }, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addNote = async (req, res) => {
  try {
    const note = await Note.create({ content: req.body.content, createdBy: req.user._id, lead: req.params.id });
    const lead = await Lead.findById(req.params.id);
    lead.notes.push(note._id);
    lead.history.push(`Note added`);
    await lead.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'New' });
    const contactedLeads = await Lead.countDocuments({ status: 'Contacted' });
    const convertedLeads = await Lead.countDocuments({ status: 'Converted' });
    const todaysLeads = await Lead.countDocuments({ createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } });
    const conversionRate = totalLeads ? Math.round((convertedLeads / totalLeads) * 100) : 0;

    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);
    const monthly = await Lead.aggregate([
      { $group: { _id: { month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id.month': 1 } }
    ]);

    res.json({ totalLeads, newLeads, contactedLeads, convertedLeads, conversionRate, todaysLeads, recentLeads, monthly });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
