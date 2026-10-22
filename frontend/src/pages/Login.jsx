import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex flex-col justify-center px-8 md:px-16 py-12">
        <div className="flex items-center gap-2 mb-10">
          <ShieldCheck className="text-brand-600" size={26} />
          <span className="font-bold text-lg">TruthLens</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome Back!</h2>
        <p className="text-slate-500 mt-1 mb-8 text-sm">
          Login to continue exploring a safer and more informed digital world.
        </p>

        {error && (
          <div className="mb-4 text-sm bg-rose-50 text-rose-700 px-3 py-2 rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="email"
              required
              placeholder="Email address"
              className="input pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className="input pl-9 pr-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-500">
              <input type="checkbox" className="rounded border-slate-300" /> Remember me
            </label>
            <a href="#" className="text-brand-600 font-medium">Forgot password?</a>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-brand-600 font-medium">Sign Up</Link>
        </p>
      </div>

      <div className="hidden md:flex flex-col justify-center items-center bg-brand-50 px-12">
        <h2 className="text-2xl font-bold text-slate-900 text-center">
          Information. Awareness. <br /> A Safer Tomorrow.
        </h2>
        <p className="text-slate-500 italic mt-3">"Because the truth matters."</p>
        <ShieldCheck className="text-brand-300 mt-10" size={120} strokeWidth={1} />
      </div>
    </div>
  );
}
