import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';

export default function AddLead() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post('/leads', values);
      toast.success('Lead created successfully');
      navigate('/leads');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to create lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur-xl">
      <h2 className="text-2xl font-semibold">Create Lead</h2>
      <p className="mt-2 text-sm text-slate-400">Capture a new client opportunity with complete context.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Name" {...register('name', { required: true })} />
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Email" {...register('email', { required: true })} />
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Phone" {...register('phone', { required: true })} />
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Company" {...register('company', { required: true })} />
        <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" {...register('source')}>
          <option>Website</option><option>Referral</option><option>Social</option><option>Cold Call</option><option>Email</option><option>Other</option>
        </select>
        <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" {...register('status')}>
          <option>New</option><option>Contacted</option><option>Qualified</option><option>Converted</option><option>Lost</option>
        </select>
        <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" {...register('priority')}>
          <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
        </select>
        <input type="date" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" {...register('followUpDate')} />
        <textarea className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Notes" rows="4" {...register('notes')} />
        <div className="md:col-span-2 flex justify-end">
          <button disabled={loading} className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-3 font-semibold">{loading ? 'Saving...' : 'Save Lead'}</button>
        </div>
      </form>
    </div>
  );
}
