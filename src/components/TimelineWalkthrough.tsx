"use client";

import { useState } from "react";

interface ScheduleItem {
  time: string;
  title: string;
  desc: string;
  focus: string;
}

interface DayData {
  day: number;
  phase: string;
  summary: string;
  sensoryNote: string;
  schedule: ScheduleItem[];
  milestone: string;
}

const DAYS_DATA: DayData[] = [
  {
    day: 1,
    phase: "Arrival & Solo Mechanics",
    summary: "Focus on getting familiar with the environment, holding the ball, and running basic patterns. Zero social pressure.",
    sensoryNote: "Whistle-free coaching today. High-contrast visual markers define all boundaries. Soft-touch foam footballs are used.",
    milestone: "Run your first solo route and receive a personal welcome pack.",
    schedule: [
      {
        time: "09:30 AM",
        title: "Quiet Arrival & Personal Spot",
        desc: "Check-in at your own pace. Choose a color-coded wristband to indicate your communication preference (e.g. Green = ready to chat, Yellow = silent learning).",
        focus: "Familiarization",
      },
      {
        time: "09:50 AM",
        title: "Foam Ball Grip & Throwing",
        desc: "Learn throwing mechanics with step-by-step card instructions. Coaches explain principles individually rather than addressing a large crowd.",
        focus: "Mechanics",
      },
      {
        time: "10:30 AM",
        title: "Solo Route Walks",
        desc: "Walk and run preset receiver routes (e.g., Slant, Out) marked clearly on the grass with visual indicators. No defenders, no pressure.",
        focus: "Coordination",
      },
      {
        time: "11:00 AM",
        title: "Sensory Break & Wind-down",
        desc: "10 minutes in the quiet sensory tent. Optional noise-canceling headphones, water, and direct check-ins with your assigned coach.",
        focus: "Decompression",
      },
    ],
  },
  {
    day: 2,
    phase: "Structured Partner Play",
    summary: "Work one-on-one with a designated partner. Coordinated actions with clear visual cues remove the guesswork from interaction.",
    sensoryNote: "Noise levels are moderate. Partner pairings are pre-assigned by the coaches—no awkward 'picking teammates'.",
    milestone: "Complete a 2-person route combination and design a custom play card.",
    schedule: [
      {
        time: "09:30 AM",
        title: "Structured Partner Match",
        desc: "Meet your pre-assigned partner. Review your custom name badges and share preferred communication styles (cards or verbal).",
        focus: "Social Entry",
      },
      {
        time: "09:50 AM",
        title: "Interactive Catch & Move",
        desc: "Throw and catch with your partner while moving. Coaches provide simple visual route boards to show where and when to pass.",
        focus: "Timing",
      },
      {
        time: "10:20 AM",
        title: "Crossing Routes",
        desc: "Run crossing routes with your partner, learning how two separate running lines create open spaces. Highly visual, structured cooperation.",
        focus: "Spatial Awareness",
      },
      {
        time: "10:50 AM",
        title: "Huddle Strategy Draft",
        desc: "Sit with your partner and sketch out a customized 2-person play using our tactile whiteboard folders.",
        focus: "Collaboration",
      },
    ],
  },
  {
    day: 3,
    phase: "Low-Pressure Huddle Game",
    summary: "Put your skills into action in a low-stakes 3-on-3 simulation. Simple rules, visual boundaries, and high predictability.",
    sensoryNote: "Scrimmage is entirely non-contact. Whistles are replaced with soft electronic buzzers. Visual play cards are held on-field.",
    milestone: "Execute a co-designed play in a team setting and earn your clinic jersey.",
    schedule: [
      {
        time: "09:30 AM",
        title: "Visual Scrimmage Briefing",
        desc: "Review the full layout of the play field. Learn the roles of each position. All movements are walk-through tested first.",
        focus: "Predictability",
      },
      {
        time: "09:50 AM",
        title: "3-on-3 Cooperative Runs",
        desc: "Run your pre-planned plays. Defending players shadow routes rather than rushing, keeping the environment predictable and safe.",
        focus: "Active Play",
      },
      {
        time: "10:30 AM",
        title: "The Huddle Execution",
        desc: "Assemble your team in the huddle. Use play cards to decide the route. Execute the play together. Celebrate in whatever style feels best.",
        focus: "Team Success",
      },
      {
        time: "11:00 AM",
        title: "Graduation & Jersey Pick",
        desc: "Receive your custom-fit, high-performance 'Huddle Team' jersey and choosing your team huddle patch for future game sessions.",
        focus: "Achievement",
      },
    ],
  },
];

export default function TimelineWalkthrough() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const currentDayData = DAYS_DATA.find((d) => d.day === selectedDay) || DAYS_DATA[0];

  return (
    <div className="w-full">
      {/* Day Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
        {DAYS_DATA.map((d) => {
          const isActive = d.day === selectedDay;
          return (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
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
                Stage 0{d.day}
              </span>
              <span className="block font-bold text-sm sm:text-base mt-1">
                Day {d.day}
              </span>
              <span className="block text-xxs sm:text-xs text-slate-400 mt-0.5 truncate hidden sm:block">
                {d.phase}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-500">
        {/* Glow Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-cyber-lime/5 blur-3xl" />
        
        {/* Day Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-lime/10 text-cyber-lime text-xs font-mono font-semibold border border-cyber-lime/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime animate-ping" />
              Day {currentDayData.day}: {currentDayData.phase}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {currentDayData.phase}
            </h3>
            <p className="text-sm text-soft-gray mt-2 max-w-xl">
              {currentDayData.summary}
            </p>
          </div>
          
          {/* Sensory Checklist Box */}
          <div className="bg-cyber-dark/80 rounded-xl p-4 border border-white/5 md:max-w-xs w-full">
            <span className="block text-xs font-mono font-bold text-electric-blue uppercase tracking-wider mb-1.5">
              Sensory Environment
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentDayData.sensoryNote}
            </p>
          </div>
        </div>

        {/* Schedule Timeline */}
        <div className="mt-8 space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
          {currentDayData.schedule.map((item, idx) => (
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
                      {item.time}
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
                Daily Achievement Goal
              </span>
              <span className="block text-sm font-semibold text-white">
                {currentDayData.milestone}
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
            Claim Your Spot
          </button>
        </div>
      </div>
    </div>
  );
}
