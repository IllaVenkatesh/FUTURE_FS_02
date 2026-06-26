import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutGrid, Users, BarChart3, Settings, LogOut, Menu, Sparkles, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/leads', label: 'Leads', icon: Users },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.2),_transparent_30%),linear-gradient(135deg,_#060816_0%,_#0b1120_100%)] text-slate-100">
      <div className="flex">
        <aside className={`${sidebarOpen ? 'w-72' : 'w-24'} hidden lg:flex min-h-screen flex-col border-r border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl transition-all`}>
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 p-3 shadow-lg">
              <Sparkles size={20} />
            </div>
            {sidebarOpen && <div><p className="text-sm text-slate-400">Mini CRM</p><h2 className="text-lg font-semibold">Northstar</h2></div>}
          </div>
          <nav className="space-y-2">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <Icon size={18} />
                {sidebarOpen && <span>{label}</span>}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="font-medium">{user?.name}</p>
            <button onClick={handleLogout} className="mt-3 flex items-center gap-2 text-sm text-rose-300"> <LogOut size={16} /> Logout</button>
          </div>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-white/10 bg-slate-950/50 px-5 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-xl border border-white/10 bg-white/5 p-2 lg:hidden"> <Menu size={18} /></button>
              <div>
                <p className="text-sm text-slate-400">Premium lead workspace</p>
                <h1 className="text-xl font-semibold">Client Lead Management</h1>
              </div>
            </div>
            <Link to="/leads/new" className="rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-2 text-sm font-medium text-fuchsia-200">+ New Lead</Link>
          </header>
          <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-8">
            <Outlet />
          </motion.main>
        </div>
      </div>
    </div>
  );
}
