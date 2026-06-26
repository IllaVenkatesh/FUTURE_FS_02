import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [note, setNote] = useState('');

  const loadLead = async () => {
    const { data } = await api.get(`/leads/${id}`);
    setLead(data);
  };

  useEffect(() => { loadLead(); }, [id]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/leads/${id}/notes`, { content: note });
      toast.success('Note added');
      setNote('');
      loadLead();
    } catch (error) {
      toast.error('Unable to add note');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this lead?')) return;
    await api.delete(`/leads/${id}`);
    toast.success('Lead deleted');
    navigate('/leads');
  };

  if (!lead) return <div className="text-slate-300">Loading lead details...</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-400">Lead profile</p>
            <h2 className="text-2xl font-semibold">{lead.name}</h2>
          </div>
          <div className="flex gap-2">
            <Link to={`/leads/${id}/edit`} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2">Edit</Link>
            <button onClick={handleDelete} className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-rose-300">Delete</button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm text-slate-400">Email</p><p>{lead.email}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm text-slate-400">Phone</p><p>{lead.phone}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm text-slate-400">Company</p><p>{lead.company}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm text-slate-400">Source</p><p>{lead.source}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm text-slate-400">Status</p><p>{lead.status}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm text-slate-400">Priority</p><p>{lead.priority}</p></div>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur-xl">
        <h3 className="text-xl font-semibold">Notes & Timeline</h3>
        <form onSubmit={handleAddNote} className="mt-4 flex flex-col gap-3">
          <textarea value={note} onChange={(e) => setNote(e.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3" rows="3" placeholder="Add a note" />
          <button className="self-start rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-4 py-2 font-semibold">Add Note</button>
        </form>
        <div className="mt-6 space-y-3">
          {lead.notes?.map((item) => (
            <div key={item._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p>{item.content}</p>
              <p className="mt-2 text-sm text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
