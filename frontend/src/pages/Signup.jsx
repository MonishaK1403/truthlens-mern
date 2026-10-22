import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center items-center bg-brand-50 px-12">
        <ShieldCheck className="text-brand-300" size={120} strokeWidth={1} />
        <h2 className="text-2xl font-bold text-slate-900 text-center mt-8">
          Join the fight against misinformation
        </h2>
        <p className="text-slate-500 italic mt-3">"Because the truth matters."</p>
      </div>

      <div className="flex flex-col justify-center px-8 md:px-16 py-12">
        <div className="flex items-center gap-2 mb-10 md:hidden">
          <ShieldCheck className="text-brand-600" size={26} />
          <span className="font-bold text-lg">TruthLens</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
        <p className="text-slate-500 mt-1 mb-8 text-sm">Start analyzing content in seconds.</p>

        {error && <div className="mb-4 text-sm bg-rose-50 text-rose-700 px-3 py-2 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input name="name" required placeholder="Full name" className="input pl-9" value={form.name} onChange={handleChange} />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input name="email" type="email" required placeholder="Email address" className="input pl-9" value={form.email} onChange={handleChange} />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input name="password" type="password" required placeholder="Password (min 6 chars)" className="input pl-9" value={form.password} onChange={handleChange} />
          </div>
          <select name="role" value={form.role} onChange={handleChange} className="input">
            <option value="student">Student</option>
            <option value="researcher">Researcher</option>
            <option value="journalist">Journalist</option>
            <option value="general">General User</option>
          </select>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6">
          Already have an account? <Link to="/login" className="text-brand-600 font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}