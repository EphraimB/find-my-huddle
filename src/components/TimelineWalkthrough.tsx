"use client";

import { useState } from "react";

interface ScheduleItem {
  duration: string;
  title: string;
  desc: string;
  focus: string;
}

interface PhaseData {
  weeks: string;
  title: string;
  sub: string;
  sensoryNote: string;
  socialGoal: string;
  schedule: ScheduleItem[];
  milestone: string;
}

const PHASES_DATA: PhaseData[] = [
  {
    weeks: "Weeks 1–4",
    title: "Phase 1: Individual Mechanics",
    sub: "Get familiar with the field, build physical throwing/catching habits, and learn route concepts in your own personal space with zero social demands.",
    sensoryNote: "Whistle-free coaching. Boundaries are defined with high-contrast colored markers. Soft-grip foam footballs are used to reduce sensory impact.",
    socialGoal: "Learn coach faces, establish visual communication check-ins, and build comfort with the physical field routine.",
    milestone: "Master the 3 basic route cuts (Slant, Out, Go) and claim your visual playbook binder.",
    schedule: [
      {
        duration: "10 Mins",
        title: "Visual Check-in & Orientation",
        desc: "Check-in at your own pace. Select a colored wristband indicating your communication comfort level for the day. Review the day's printed visual schedule board.",
        focus: "Predictability",
      },
      {
        duration: "20 Mins",
        title: "Solo Ball Mechanics & Catching",
        desc: "Structured, step-by-step throwing and catching drills. Coaches explain adjustments 1-on-1 rather than addressing a large crowd. Earmuffs welcome.",
        focus: "Skill Prep",
      },
      {
        duration: "20 Mins",
        title: "Route Walking & Space Drill",
        desc: "Walk and run receiver route tracks painted on the grass. Focus on timing and muscle memory. No defenders, no pressure.",
        focus: "Spatial Awareness",
      },
      {
        duration: "10 Mins",
        title: "Quiet Sensory Decompression",
        desc: "Step into the sensory tent to rest. Noise-canceling headphones, cold water, and optional check-ins with your pre-assigned coach are always open.",
        focus: "Decompression",
      },
    ],
  },
  {
    weeks: "Weeks 5–8",
    title: "Phase 2: Partner Sync & Geometry",
    sub: "Partner up with a pre-assigned teammate. Learn crossing route combinations where precise geometric paths do all the coordination work for you.",
    sensoryNote: "Coaches speak at conversational volume. Partner pairings are pre-assigned by the staff—never chosen by players, eliminating selection anxiety.",
    socialGoal: "Build trust with a single 'Huddle Buddy' through pre-scripted coordination and shared play design.",
    milestone: "Execute a co-designed crossing route with your partner and earn your Team Huddle patch.",
    schedule: [
      {
        duration: "10 Mins",
        title: "Huddle Buddy Match & Script Sync",
        desc: "Meet your pre-assigned partner. Review your custom badge preferences and align on preferred communication style (cards or speech).",
        focus: "Social Entry",
      },
      {
        duration: "20 Mins",
        title: "Interactive Throw-and-Go",
        desc: "Practice catching on the run from your partner. Follow simple visual cards and timing counters rather than guessing when to cut.",
        focus: "Timing",
      },
      {
        duration: "20 Mins",
        title: "Playbook白板 Coordination",
        desc: "Co-design a 2-person route combination using chalkboard folders. Walk through the physical routes together to test the pattern.",
        focus: "Collaboration",
      },
      {
        duration: "10 Mins",
        title: "Cool Down & Peer Review",
        desc: "Sit with your partner and look at other teams' play designs. Give feedback using simple checkoff icons.",
        focus: "Bonding",
      },
    ],
  },
  {
    weeks: "Weeks 9–12",
    title: "Phase 3: The Huddle League",
    sub: "Form a 3-person team. Apply your routes in low-stakes, non-contact games. Football roles provide complete social structure during play.",
    sensoryNote: "Games are entirely non-contact. Traditional whistles are replaced with soft buzzer indicators. Play card folders are held on field.",
    socialGoal: "Experience team alignment. Learn how standard football roles remove ambiguity and make collective success feel natural.",
    milestone: "Score a team touchdown running a co-designed play and receive your custom Huddle Jersey.",
    schedule: [
      {
        duration: "10 Mins",
        title: "Team Playbook Huddle",
        desc: "Assemble in your 3-player huddle. Select your role (e.g. Quarterback, Route Planner, Receiver). Pick the visual play card for the drive.",
        focus: "Structured Team",
      },
      {
        duration: "30 Mins",
        title: "3-on-3 Cooperative Scrimmage",
        desc: "Run plays against a defender shadowing your route. No physical rushing or contact. Focus is entirely on executing the drawn play layout.",
        focus: "Active League",
      },
      {
        duration: "15 Mins",
        title: "Weekly Achievement Circle",
        desc: "Celebrate success in whatever style you prefer (silent huddle cheer, thumbs-up, or high-five). Receive custom patches for your visual board.",
        focus: "Celebration",
      },
      {
        duration: "5 Mins",
        title: "Home Quest Review",
        desc: "Check the phone portal for next week's at-home doomscroll replacement exercises and playbook design homework.",
        focus: "Continuity",
      },
    ],
  },
];

export default function TimelineWalkthrough() {
  const [activePhase, setActivePhase] = useState<number>(0);
  const currentPhase = PHASES_DATA[activePhase];

  return (
    <div className="w-full">
      {/* Weeks Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
        {PHASES_DATA.map((p, idx) => {
          const isActive = idx === activePhase;
          return (
            <button
              key={idx}
              onClick={() => setActivePhase(idx)}
              className={`relative overflow-hidden rounded-xl py-4 px-3 sm:px-6 transition-all duration-300 text-center border cursor-pointer ${
                isActive
                  ? "bg-deep-steel border-cyber-lime text-cyber-lime shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                  : "bg-deep-steel/30 border-white/5 hover:border-white/20 text-slate-400"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyber-lime shadow-[0_0_8px_#ccff00]" />
              )}
              <span className="block text-xs font-mono tracking-widest text-slate-500 uppercase">
                Phase 0{idx + 1}
              </span>
              <span className="block font-bold text-sm sm:text-base mt-1">
                {p.weeks}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-500">
        {/* Glow Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-cyber-lime/5 blur-3xl" />
        
        {/* Phase Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-lime/10 text-cyber-lime text-xs font-mono font-semibold border border-cyber-lime/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime animate-ping" />
              {currentPhase.weeks}: {currentPhase.title}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {currentPhase.title}
            </h3>
            <p className="text-sm text-soft-gray mt-2 max-w-xl leading-relaxed">
              {currentPhase.sub}
            </p>
          </div>
          
          {/* Social & Sensory Box */}
          <div className="flex flex-col gap-3 w-full lg:max-w-xs shrink-0">
            <div className="bg-cyber-dark/80 rounded-xl p-3 border border-white/5">
              <span className="block text-xxs font-mono font-bold text-electric-blue uppercase tracking-wider mb-1">
                Sensory Environment
              </span>
              <p className="text-xs text-slate-300 leading-normal">
                {currentPhase.sensoryNote}
              </p>
            </div>
            <div className="bg-cyber-dark/80 rounded-xl p-3 border border-white/5">
              <span className="block text-xxs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Friendship Alignment
              </span>
              <p className="text-xs text-slate-300 leading-normal">
                {currentPhase.socialGoal}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Timeline */}
        <div className="mt-8 space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
          {currentPhase.schedule.map((item, idx) => (
            <div key={idx} className="flex gap-4 sm:gap-6 items-start relative group">
              {/* Timeline Dot */}
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-cyber-dark border-2 border-white/10 group-hover:border-cyber-lime transition-colors duration-300 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-cyber-lime transition-colors duration-300" />
              </div>
              
              {/* Timeline Card */}
              <div className="flex-1 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl p-4 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono text-cyber-lime font-bold">
                      {item.duration}
                    </span>
                    <h4 className="text-sm sm:text-base font-semibold text-white">
                      {item.title}
                    </h4>
                  </div>
                  <span className="inline-block text-xxs font-mono bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/5 uppercase self-start sm:self-center">
                    {item.focus}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-soft-gray leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-cyber-lime/[0.02] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyber-lime/10 border border-cyber-lime/20 flex items-center justify-center text-cyber-lime">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
            <div>
              <span className="block text-xxs font-mono text-slate-500 uppercase tracking-widest">
                Phase Milestone Goal
              </span>
              <span className="block text-sm font-semibold text-white">
                {currentPhase.milestone}
              </span>
            </div>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById("enrollment-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-cyber-lime text-black font-semibold text-sm hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-center"
          >
            Join the League
          </button>
        </div>
      </div>
    </div>
  );
}
