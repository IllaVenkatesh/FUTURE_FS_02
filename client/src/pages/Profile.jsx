import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-xl backdrop-blur-xl">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <p className="mt-2 text-slate-400">Your workspace profile and team access summary.</p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm text-slate-400">Name</p>
        <p className="font-semibold">{user?.name}</p>
        <p className="mt-4 text-sm text-slate-400">Email</p>
        <p className="font-semibold">{user?.email}</p>
      </div>
    </div>
  );
}
