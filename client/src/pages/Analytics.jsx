import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import api from '../services/api';

const COLORS = ['#8b5cf6', '#ec4899', '#22c55e', '#f59e0b'];

export default function Analytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/dashboard');
      setStats(data);
    };
    load();
  }, []);

  if (!stats) return <div className="text-slate-300">Loading analytics...</div>;

  const pieData = [
    { name: 'New', value: stats.newLeads },
    { name: 'Contacted', value: stats.contactedLeads },
    { name: 'Converted', value: stats.convertedLeads },
  ];

  const barData = stats.monthly.map((item) => ({ name: `M${item._id.month}`, value: item.count }));

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-semibold">Lead Status Distribution</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={3}>
                {pieData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-xl font-semibold">Monthly Lead Trend</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
