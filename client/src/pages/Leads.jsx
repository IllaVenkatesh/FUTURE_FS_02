import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Search, Trash2, Edit3, Eye, Download } from 'lucide-react';
import api from '../services/api';

const statusColors = {
  New: 'bg-sky-500/10 text-sky-300',
  Contacted: 'bg-amber-500/10 text-amber-300',
  Qualified: 'bg-violet-500/10 text-violet-300',
  Converted: 'bg-emerald-500/10 text-emerald-300',
  Lost: 'bg-rose-500/10 text-rose-300',
};

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(true);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/leads', { params: { page, search, status, priority, limit: 8 } });
      setLeads(data.leads || []);
      setPages(data.pages || 1);
    } catch (error) {
      toast.error('Unable to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [page, search, status, priority]);

  const exportCsv = () => {
    const rows = [['Name', 'Email', 'Company', 'Status', 'Priority', 'Source']];
    leads.forEach((lead) => rows.push([lead.name, lead.email, lead.company, lead.status, lead.priority, lead.source]));
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const removeLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await api.delete(`/leads/${id}`);
      toast.success('Lead deleted');
      loadLeads();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur-xl">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-400">Lead operations</p>
            <h2 className="text-2xl font-semibold">Pipeline Control Center</h2>
          </div>
          <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300"><Download size={16} /> Export CSV</button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <Search size={16} className="text-slate-400" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search leads" className="w-full bg-transparent outline-none" />
          </label>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
          <select value={priority} onChange={(e) => { setPriority(e.target.value); setPage(1); }} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-left text-slate-300">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Follow-up</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-400">Loading leads...</td></tr> : leads.map((lead) => (
                <tr key={lead._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-slate-400">{lead.email}</div>
                  </td>
                  <td className="px-4 py-3">{lead.company}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs ${statusColors[lead.status]}`}>{lead.status}</span></td>
                  <td className="px-4 py-3">{lead.priority}</td>
                  <td className="px-4 py-3">{lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString() : '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link to={`/leads/${lead._id}`} className="rounded-xl border border-white/10 bg-white/5 p-2"><Eye size={16} /></Link>
                      <Link to={`/leads/${lead._id}/edit`} className="rounded-xl border border-white/10 bg-white/5 p-2"><Edit3 size={16} /></Link>
                      <button onClick={() => removeLead(lead._id)} className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-2 text-rose-300"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-sm text-slate-400">
          <span>Page {page} of {pages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 disabled:opacity-50">Prev</button>
            <button disabled={page === pages} onClick={() => setPage(page + 1)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
