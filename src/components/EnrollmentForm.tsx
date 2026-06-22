"use client";

import { useState } from "react";

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    commMode: "verbal",
    needsEarProtection: false,
    needsVisualMap: false,
    bringingSupport: false,
    writtenOnly: false,
    privateIntro: true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.age) {
      alert("Please fill out all required fields.");
      return;
    }
    setLoading(true);

    // Mock network request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="glass-panel rounded-2xl p-8 border border-cyber-lime/30 text-center max-w-xl mx-auto shadow-[0_0_30px_rgba(204,255,0,0.05)] animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-cyber-lime/10 border border-cyber-lime/30 flex items-center justify-center text-cyber-lime mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Enrollment Requested</h3>
        <p className="text-sm text-soft-gray mb-6 leading-relaxed max-w-sm mx-auto">
          We have registered your preference. A visual schedule pack and field orientation map have been sent to your email.
        </p>

        <div className="bg-cyber-dark/80 rounded-xl p-4 border border-white/5 text-left space-y-3 mb-6">
          <span className="block text-xxs font-mono text-cyan-400 font-bold uppercase tracking-wider">Next Predictable Steps:</span>
          <div className="flex gap-3 items-start text-xs">
            <span className="text-cyber-lime font-bold">1.</span>
            <p className="text-slate-300">
              {formData.privateIntro 
                ? "Coach Ephraim will email you personally within 24 hours to introduce himself. No phone calls." 
                : "You will receive a standard confirmation packet outlining arrival gates."}
            </p>
          </div>
          <div className="flex gap-3 items-start text-xs">
            <span className="text-cyber-lime font-bold">2.</span>
            <p className="text-slate-300">A visual guide showing pictures of the field gates, parking lot, and coach faces will be sent 3 days before Day 1.</p>
          </div>
        </div>

        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold tracking-wider transition cursor-pointer"
        >
          Request Another Spot
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-2 text-center">Claim Your Huddle Spot</h3>
      <p className="text-xs text-soft-gray text-center mb-6 max-w-sm mx-auto">
        Join our low-pressure, structured environment. Tell us how to make you feel comfortable—no judgment, just play.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xxs font-mono text-slate-400 uppercase font-semibold">Your Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-cyber-dark/80 border border-white/10 focus:border-cyber-lime rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition"
              placeholder="e.g. Alex"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xxs font-mono text-slate-400 uppercase font-semibold">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-cyber-dark/80 border border-white/10 focus:border-cyber-lime rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition"
              placeholder="alex@example.com"
            />
          </div>
        </div>

        {/* Age & Communication Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xxs font-mono text-slate-400 uppercase font-semibold">Age (Young Adult) *</label>
            <input
              type="number"
              required
              min="16"
              max="45"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full bg-cyber-dark/80 border border-white/10 focus:border-cyber-lime rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition"
              placeholder="e.g. 22"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xxs font-mono text-slate-400 uppercase font-semibold">Preferred Communication Mode</label>
            <select
              value={formData.commMode}
              onChange={(e) => setFormData({ ...formData, commMode: e.target.value })}
              className="w-full bg-cyber-dark/80 border border-white/10 focus:border-cyber-lime rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition cursor-pointer"
            >
              <option value="verbal">Verbal Speech</option>
              <option value="visual">Visual Cards / PECS</option>
              <option value="aac">AAC Device / Typed Text</option>
              <option value="none">Quiet Listener (No speech output)</option>
            </select>
          </div>
        </div>

        {/* Sensory and Support Options */}
        <div className="space-y-2.5 pt-2">
          <span className="block text-xxs font-mono text-slate-400 uppercase font-semibold">Sensory & Planning Accommodations</span>
          
          <div className="space-y-2">
            <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.needsEarProtection}
                onChange={(e) => setFormData({ ...formData, needsEarProtection: e.target.checked })}
                className="w-4 h-4 rounded border-white/10 bg-cyber-dark text-cyber-lime focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>I plan to wear noise-canceling headphones / ear protection.</span>
            </label>

            <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.needsVisualMap}
                onChange={(e) => setFormData({ ...formData, needsVisualMap: e.target.checked })}
                className="w-4 h-4 rounded border-white/10 bg-cyber-dark text-cyber-lime focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>Send me a visual map of gates, parking lot, and fields ahead of time.</span>
            </label>

            <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.bringingSupport}
                onChange={(e) => setFormData({ ...formData, bringingSupport: e.target.checked })}
                className="w-4 h-4 rounded border-white/10 bg-cyber-dark text-cyber-lime focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>I will be bringing a support person or family member.</span>
            </label>

            <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.writtenOnly}
                onChange={(e) => setFormData({ ...formData, writtenOnly: e.target.checked })}
                className="w-4 h-4 rounded border-white/10 bg-cyber-dark text-cyber-lime focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>Send written email instructions only (No voice calls).</span>
            </label>
          </div>
        </div>

        {/* Pre-Intro Toggle */}
        <div className="p-4 rounded-xl bg-cyber-lime/[0.02] border border-cyber-lime/10 mt-3">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.privateIntro}
              onChange={(e) => setFormData({ ...formData, privateIntro: e.target.checked })}
              className="w-4 h-4 rounded border-white/10 bg-cyber-dark text-cyber-lime focus:ring-0 focus:ring-offset-0 mt-0.5 cursor-pointer"
            />
            <div>
              <span className="block text-xs font-bold text-white">Request Private Coach Introduction</span>
              <span className="block text-xxs text-soft-gray mt-0.5 leading-snug">
                Recommended. The coach will email you privately to introduce themselves and review your preferences before you arrive on Day 1.
              </span>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-cyber-lime hover:bg-white text-black font-bold text-sm transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <span>Request Free Enrollment</span>
          )}
        </button>
      </form>
    </div>
  );
}
