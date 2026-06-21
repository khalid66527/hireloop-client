"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { At, Key, Eye, EyeSlash } from "@gravity-ui/icons";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router =  useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect');


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await signIn.email({
        email: formData.email,
        password: formData.password,

      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
        return;
      }
      router.push(redirectTo)
      // Successful login redirect
      // window.location.href = "/";
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-black px-4 py-12 font-sans antialiased selection:bg-purple-500 selection:text-white">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 blur-[120px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative w-full max-w-[450px]">
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 opacity-70 blur-xl" />

        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-8 shadow-2xl backdrop-blur-2xl">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20 mb-4 ring-1 ring-white/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Sign in to <span className="font-semibold text-purple-400">HireLoop</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-zinc-300 font-medium text-xs tracking-wide block">Email Address</label>
              <div className="relative flex items-center group">
                <span className="absolute left-3.5 z-10 text-zinc-500 group-focus-within:text-purple-500 transition-colors">
                  <At width={18} height={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-11 pl-10 pr-4 bg-zinc-900/40 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-zinc-300 font-medium text-xs tracking-wide block">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 hover:underline transition-colors">
                  Forgot password?
                </Link>
              </div>

              <div className="relative flex items-center group">
                <span className="absolute left-3.5 z-10 text-zinc-500 group-focus-within:text-purple-500 transition-colors">
                  <Key width={18} height={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-11 pl-10 pr-10 bg-zinc-900/40 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3.5 z-10 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeSlash width={18} height={18} /> : <Eye width={18} height={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex gap-2 items-start rounded-xl bg-rose-500/10 border border-rose-500/20 p-3.5 text-xs text-rose-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0">
                  <path d="M12 9V14M12 17.01H12.01M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="leading-normal font-medium">{error}</div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 shadow-lg shadow-purple-500/10 font-semibold text-sm text-white rounded-xl transition-all duration-300 hover:shadow-purple-500/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Link to Sign Up */}
          <div className="mt-8 text-center text-xs text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link href={`/auth/signup?redirect=${redirectTo}`} className="font-semibold text-purple-400 hover:text-purple-300 hover:underline transition-colors">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
