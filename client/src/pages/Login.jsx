import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      toast.success('Signed in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.25),_transparent_25%),linear-gradient(135deg,_#060816_0%,_#111827_100%)] p-4 text-slate-100">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-semibold">Northstar CRM</h1>
          <p className="mt-2 text-sm text-slate-400">Secure admin portal for modern client management.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-slate-400"><Mail size={16} /> Email</span>
            <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none ring-0" defaultValue="admin@example.com" {...register('email', { required: true })} />
          </label>
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-slate-400"><Lock size={16} /> Password</span>
            <input type="password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none ring-0" defaultValue="Admin@123" {...register('password', { required: true })} />
          </label>
          <button disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-4 py-3 font-semibold transition hover:opacity-90 disabled:opacity-70">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
