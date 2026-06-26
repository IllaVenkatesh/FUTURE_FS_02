import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, CircleDollarSign, Eye, Handshake, Sparkles, Users } from 'lucide-react';
import api from '../services/api';

const cards = [
  { label: 'Total Leads', key: 'totalLeads', icon: Users, accent: 'from-cyan-500 to-blue-600' },
  { label: 'New Leads', key: 'newLeads', icon: Sparkles, accent: 'from-fuchsia-500 to-violet-600' },
  { label: 'Contacted Leads', key: 'contactedLeads', icon: Eye, accent: 'from-amber-500 to-orange-600' },
  { label: 'Converted Leads', key: 'convertedLeads', icon: Handshake, accent: 'from-emerald-500 to-green-600' },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/dashboard');
      setStats(data);
    };
    load();
  }, []);

  if (!stats) return <div className="text-slate-300">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, key, icon: Icon, accent }) => (
          <motion.div key={key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl backdrop-blur-xl">
            <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${accent} p-3`}><Icon size={18} /></div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{stats[key]}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Conversion</p>
              <h2 className="text-xl font-semibold">Performance Overview</h2>
            </div>
            <div className="rounded-2xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{stats.conversionRate}% conversion</div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Today’s leads</p>
              <p className="mt-2 text-3xl font-semibold">{stats.todaysLeads}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Recent activity</p>
              <p className="mt-2 text-3xl font-semibold">{stats.recentLeads.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2"><CircleDollarSign size={18} className="text-emerald-400" /><h2 className="text-xl font-semibold">Live Pulse</h2></div>
          <ul className="mt-4 space-y-3">
            {stats.recentLeads.slice(0, 5).map((lead) => (
              <li key={lead._id} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm">
                <p className="font-medium">{lead.name}</p>
                <p className="text-slate-400">{lead.company} • {lead.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
