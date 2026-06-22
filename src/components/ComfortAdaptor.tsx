"use client";

import { useState } from "react";

interface ModeDetail {
  id: number;
  name: string;
  sub: string;
  glowColor: string;
  textColor: string;
  badgeBg: string;
  visualSignal: string;
  onFieldCopy: string;
  coachingCopy: string;
  socialDemand: string;
  sensorySetting: string;
  wristbandColor: string;
  wristbandDesc: string;
}

const MODES: ModeDetail[] = [
  {
    id: 1,
    name: "Visual & Quiet Mode",
    sub: "Ideal for low social energy or non-verbal preference.",
    glowColor: "rgba(6, 182, 212, 0.4)", // Cyan
    textColor: "text-cyan-400",
    badgeBg: "bg-cyan-950/50 border-cyan-800/40 text-cyan-400",
    visualSignal: "Blue Wristband",
    wristbandColor: "bg-cyan-500",
    wristbandDesc: "Indicates: 'Co-op play, silent instruction, written/visual cues only'.",
    onFieldCopy: "Play is fully coordinated using PECS (Picture Exchange Communication System) cards and visual arrow boards on the field. Teammates use silent gestures (thumbs-up, index pointing) to coordinate.",
    coachingCopy: "Coaches demonstrate routes physically and use chalkboard folders. Noise-canceling headphones are fully integrated with safety-soft helmets.",
    socialDemand: "Solo actions & parallel tasks. No public speech required.",
    sensorySetting: "Low intensity. Sensory break zones are open at all times.",
  },
  {
    id: 2,
    name: "Structured Partner Mode",
    sub: "Ideal for one-on-one collaboration with clear, rule-based interactions.",
    glowColor: "rgba(20, 184, 166, 0.4)", // Teal
    textColor: "text-teal-400",
    badgeBg: "bg-teal-950/50 border-teal-800/40 text-teal-400",
    visualSignal: "Teal Wristband",
    wristbandColor: "bg-teal-500",
    wristbandDesc: "Indicates: 'Structured partner speaking, pre-defined routes and cues'.",
    onFieldCopy: "Teammates run routes in pairs. Interaction is guided by structured scripts (e.g. 'Ready... Go!'). No spontaneous team chatter required, making route completion fully predictable.",
    coachingCopy: "Coaches speak directly at standard volume (no shouting or whistles). Route paths are explicitly timed with visual clocks.",
    socialDemand: "1-on-1 collaborative task with visual script sheets.",
    sensorySetting: "Moderate. Focused partner environment, reduced crowd noise.",
  },
  {
    id: 3,
    name: "Collaborative Huddle Mode",
    sub: "Ideal for active planning and sharing in a supportive team environment.",
    glowColor: "rgba(204, 255, 0, 0.4)", // Cyber Lime
    textColor: "text-cyber-lime",
    badgeBg: "bg-cyber-lime/10 border-cyber-lime/20 text-cyber-lime",
    visualSignal: "Lime Wristband",
    wristbandColor: "bg-cyber-lime",
    wristbandDesc: "Indicates: 'Ready for active huddle communication and team planning'.",
    onFieldCopy: "Participate in active 3-on-3 huddles. Collaborate to draw audibles on a whiteboard and execute shared tactics. Focus is on teamwork, problem solving, and social alignment.",
    coachingCopy: "Coaches coordinate larger group dynamics, offering feedback on tactical choices. Interactive chalkboard reviews.",
    socialDemand: "Small group (3-4 people) guided coordination.",
    sensorySetting: "Active. Interactive, athletic play, structured celebrations.",
  },
];

export default function ComfortAdaptor() {
  const [activeId, setActiveId] = useState<number>(1);
  const activeMode = MODES.find((m) => m.id === activeId) || MODES[0];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Interactive Controller (Left/Top) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-cyber-lime" />
          
          <h3 className="text-lg font-bold text-white mb-2">
            Social Battery Adaptor
          </h3>
          <p className="text-xs text-soft-gray mb-6 leading-relaxed">
            Drag the slider or click the states below to see how our coaches and players customize the clinic based on your social energy levels.
          </p>

          {/* Slider Input */}
          <div className="relative mb-8 px-2">
            <input
              type="range"
              min="1"
              max="3"
              value={activeId}
              onChange={(e) => setActiveId(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyber-lime focus:outline-none"
            />
            {/* Slider Ticks */}
            <div className="flex justify-between text-xxs font-mono text-slate-500 mt-2">
              <span className={activeId === 1 ? "text-cyan-400 font-bold" : ""}>STAGE 1</span>
              <span className={activeId === 2 ? "text-teal-400 font-bold" : ""}>STAGE 2</span>
              <span className={activeId === 3 ? "text-cyber-lime font-bold" : ""}>STAGE 3</span>
            </div>
          </div>

          {/* Vertical Selectors */}
          <div className="space-y-3">
            {MODES.map((mode) => {
              const isSelected = mode.id === activeId;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveId(mode.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-deep-steel border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                      : "bg-transparent border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    mode.id === 1 ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : 
                    mode.id === 2 ? "bg-teal-400 shadow-[0_0_8px_#2dd4bf]" : 
                    "bg-cyber-lime shadow-[0_0_8px_#ccff00]"
                  }`} />
                  <div>
                    <span className={`block font-bold text-sm ${isSelected ? "text-white" : "text-slate-400"}`}>
                      {mode.name}
                    </span>
                    <span className="block text-xxs text-slate-500 mt-0.5 leading-snug">
                      {mode.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wristband Box */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg ${activeMode.wristbandColor} flex items-center justify-center text-black font-bold text-xs shrink-0 animate-pulse`}>
            BAND
          </div>
          <div>
            <span className="block text-xxs font-mono text-slate-500 uppercase tracking-wider">
              Visual Communication System
            </span>
            <span className={`block text-sm font-bold ${activeMode.textColor} mt-0.5`}>
              {activeMode.visualSignal}
            </span>
            <span className="block text-xs text-soft-gray mt-1 leading-snug">
              {activeMode.wristbandDesc}
            </span>
          </div>
        </div>
      </div>

      {/* Mode Details Display (Right/Bottom) */}
      <div className="lg:col-span-7">
        <div 
          className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-500 min-h-[380px]"
          style={{
            boxShadow: `0 15px 40px -15px ${activeMode.glowColor}`,
            border: `1px solid rgba(255, 255, 255, 0.08)`,
          }}
        >
          {/* Accent Glow Circle */}
          <div 
            className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl opacity-20 transition-all duration-500" 
            style={{ backgroundColor: activeMode.glowColor }} 
          />

          <div className="inline-block px-3 py-1 rounded-full border text-xs font-mono font-bold mb-4 uppercase tracking-wider transition-colors duration-500" style={{
            color: activeMode.id === 1 ? "#22d3ee" : activeMode.id === 2 ? "#2dd4bf" : "#ccff00",
            backgroundColor: activeMode.id === 1 ? "rgba(34,211,238,0.1)" : activeMode.id === 2 ? "rgba(45,212,191,0.1)" : "rgba(204,255,0,0.1)",
            borderColor: activeMode.id === 1 ? "rgba(34,211,238,0.2)" : activeMode.id === 2 ? "rgba(45,212,191,0.2)" : "rgba(204,255,0,0.2)",
          }}>
            Stage 0{activeMode.id} Profile
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">
            {activeMode.name} Setup
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Social Demand Card */}
            <div className="bg-cyber-dark/60 rounded-xl p-4 border border-white/5">
              <span className="block text-xxs font-mono text-slate-500 uppercase tracking-widest mb-1">
                Social Demands
              </span>
              <span className="block text-xs font-semibold text-white leading-relaxed">
                {activeMode.socialDemand}
              </span>
            </div>

            {/* Sensory Card */}
            <div className="bg-cyber-dark/60 rounded-xl p-4 border border-white/5">
              <span className="block text-xxs font-mono text-slate-500 uppercase tracking-widest mb-1">
                Sensory Environment
              </span>
              <span className="block text-xs font-semibold text-white leading-relaxed">
                {activeMode.sensorySetting}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Play Experience */}
            <div className="flex gap-4">
              <div className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 ${activeMode.textColor}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547Z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">On-Field Play Experience</h4>
                <p className="text-xs sm:text-sm text-soft-gray leading-relaxed">
                  {activeMode.onFieldCopy}
                </p>
              </div>
            </div>

            {/* Coaching Style */}
            <div className="flex gap-4">
              <div className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 ${activeMode.textColor}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A57.778 57.778 0 0 1 12 8c2.09 0 4.14.11 6.15.325V15m-12 0H18" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Instruction & Coaching Style</h4>
                <p className="text-xs sm:text-sm text-soft-gray leading-relaxed">
                  {activeMode.coachingCopy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
