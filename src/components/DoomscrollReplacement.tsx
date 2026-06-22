"use client";

import { useState, useEffect } from "react";

interface HomeworkTask {
  id: string;
  timeLabel: string;
  title: string;
  desc: string;
  focus: string;
  setup: string;
  steps: string[];
  totalSeconds: number;
}

const TASKS: HomeworkTask[] = [
  {
    id: "2m",
    timeLabel: "2-Min Reaction Reset",
    title: "Tennis Ball Drop Catch",
    desc: "A quick, low-intensity reaction exercise to sharpen coordination and wake up neural pathways without sensory overload.",
    focus: "Reaction Speed & Visual Tracking",
    setup: "Stand in your room holding a tennis ball (or a rolled-up soft sock) in one hand.",
    steps: [
      "Hold the ball at shoulder height, palm facing down.",
      "Release the ball completely.",
      "Quickly catch the ball with the SAME hand before the second bounce.",
      "Repeat 10 times, then swap to your other hand."
    ],
    totalSeconds: 120
  },
  {
    id: "5m",
    timeLabel: "5-Min Play Builder",
    title: "Route Memory Recall",
    desc: "A structured, rule-based mental game. Instead of reading social feeds, memorize a playbook pattern and run it on our canvas simulator.",
    focus: "Tactical Planning & Route Geometry",
    setup: "Open our Interactive Playbook canvas on this page.",
    steps: [
      "Memorize the starting points of the Receiver (WR) and Defender (DB).",
      "Sketch a 'Post' route path: run straight up 15 steps, then cut diagonal toward the center.",
      "Click 'Run Play' to see if your route coordinates beat the defender.",
      "Try drawing it 3 times to get a 100% touchdown catch rate."
    ],
    totalSeconds: 300
  },
  {
    id: "15m",
    timeLabel: "15-Min Bedroom Trainer",
    title: "Silent Floor Ladder Taps",
    desc: "A phone-free cardio and stamina routine to get fit for the weekly league. Low impact, quiet steps, easy to perform in your room.",
    focus: "Agility, Stamina & Footwork Fitness",
    setup: "Clear a 4-foot strip of space on your floor. Imagine a chalk grid ladder on the floor.",
    steps: [
      "Stand at the base. Step into the first box: Right foot in, Left foot in (In-In).",
      "Step out of the sides: Right foot out, Left foot out (Out-Out).",
      "Move forward to the next box: In-In, Out-Out.",
      "Repeat up the imaginary ladder, then backward. Keep your steps light and silent."
    ],
    totalSeconds: 900
  }
];

export default function DoomscrollReplacement() {
  const [activeTab, setActiveTab] = useState<string>("2m");
  const [secondsLeft, setSecondsLeft] = useState<number>(120);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [completedQuests, setCompletedQuests] = useState<Record<string, boolean>>({});

  const currentTask = TASKS.find((t) => t.id === activeTab) || TASKS[0];

  // Reset timer when switching tabs
  useEffect(() => {
    setSecondsLeft(currentTask.totalSeconds);
    setTimerRunning(false);
  }, [activeTab, currentTask]);

  // Timer interval hook
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, secondsLeft]);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(currentTask.totalSeconds);
  };

  const handleQuestComplete = () => {
    if (completedQuests[currentTask.id]) return; // Only count once per session
    
    setCompletedQuests((prev) => ({ ...prev, [currentTask.id]: true }));
    setCompletedCount((prev) => prev + 1);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 relative overflow-hidden">
      {/* Background glow strip */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-lime to-electric-blue" />
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Side: Homework Controls */}
        <div className="w-full lg:w-[320px] space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyber-lime/10 border border-cyber-lime/20 text-cyber-lime text-xxs font-mono font-bold uppercase tracking-wider mb-2">
              Doomscroll Replacement
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Low-Pressure Homework
            </h3>
            <p className="text-xs text-soft-gray mt-2 leading-relaxed">
              When you catch yourself doomscrolling, swap the phone screen for one of these quiet, structured, autistic-friendly prep drills. Get fit and build coordinate skills from your room.
            </p>
          </div>

          {/* Time Selector Tabs */}
          <div className="space-y-2">
            <span className="block text-xxs font-bold text-slate-500 uppercase tracking-widest">Select Available Time</span>
            <div className="flex flex-col gap-2">
              {TASKS.map((t) => {
                const isActive = t.id === activeTab;
                const isDone = completedQuests[t.id];
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-deep-steel border-cyber-lime text-white shadow-[0_0_15px_rgba(204,255,0,0.08)]"
                        : "bg-transparent border-white/5 hover:border-white/10 text-slate-400"
                    }`}
                  >
                    <div>
                      <span className="block font-bold text-xs sm:text-sm">{t.timeLabel}</span>
                      <span className="block text-xxs text-slate-500 mt-0.5 truncate max-w-[200px]">
                        {t.title}
                      </span>
                    </div>
                    {isDone ? (
                      <span className="w-5 h-5 rounded-full bg-cyber-lime/25 border border-cyber-lime/40 flex items-center justify-center text-cyber-lime text-xxs font-bold">
                        ✓
                      </span>
                    ) : (
                      <span className="text-xxs font-mono text-slate-500">
                        {Math.floor(t.totalSeconds / 60)}m
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quest Counter Box */}
          <div className="bg-cyber-dark/60 rounded-xl p-4 border border-white/5 flex items-center justify-between">
            <div>
              <span className="block text-xxs font-mono text-slate-500 uppercase tracking-wider">Weekly Homework Progress</span>
              <span className="block text-xs font-bold text-white mt-0.5">
                {completedCount === 0 
                  ? "No quests logged yet." 
                  : completedCount === 1 
                  ? "1 Huddle Quest Completed!" 
                  : `${completedCount} Huddle Quests Completed!`}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-cyber-lime/10 border border-cyber-lime/20 flex items-center justify-center text-cyber-lime text-base font-extrabold font-mono">
              {completedCount}/3
            </div>
          </div>
        </div>

        {/* Right Side: Exercise Steps & Timer */}
        <div className="flex-1 w-full bg-cyber-dark/40 rounded-xl p-6 border border-white/5 relative min-h-[380px] flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4 mb-4">
              <div>
                <span className="text-xxs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Target: {currentTask.focus}
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  {currentTask.title}
                </h4>
              </div>
              <div className="inline-flex items-center gap-1 bg-white/5 border border-white/5 px-2.5 py-1 rounded text-xxs font-mono text-slate-400 uppercase">
                Setup: {currentTask.id === "2m" ? "Ball / Sock" : currentTask.id === "5m" ? "Playbook" : "Floor Strip"}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-soft-gray leading-relaxed mb-6">
              {currentTask.desc}
            </p>

            {/* Instruction Checklist */}
            <div className="space-y-3.5">
              <span className="block text-xxs font-bold text-slate-500 uppercase tracking-widest">Step-by-Step Instructions</span>
              <div className="space-y-2">
                {currentTask.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs sm:text-sm leading-relaxed">
                    <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-xxs text-cyber-lime font-bold font-mono shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Zone: Timer and Logging */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Visual Timer */}
            <div className="flex items-center gap-4 bg-cyber-dark border border-white/10 rounded-xl px-4 py-2 w-full sm:w-auto justify-between sm:justify-start">
              <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-widest">
                {formatTime(secondsLeft)}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={toggleTimer}
                  disabled={secondsLeft === 0}
                  className={`px-3 py-1.5 rounded text-xxs font-bold uppercase transition cursor-pointer select-none ${
                    timerRunning 
                      ? "bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20" 
                      : "bg-cyber-lime/10 border border-cyber-lime/30 text-cyber-lime hover:bg-cyber-lime/20"
                  } disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  {timerRunning ? "Pause" : "Start"}
                </button>
                <button
                  onClick={resetTimer}
                  className="px-3 py-1.5 rounded bg-white/5 border border-white/5 hover:border-white/10 text-xxs font-bold text-slate-400 hover:text-white uppercase transition cursor-pointer select-none"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Complete / Log Button */}
            <button
              onClick={handleQuestComplete}
              disabled={completedQuests[currentTask.id]}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 select-none cursor-pointer text-center ${
                completedQuests[currentTask.id]
                  ? "bg-cyber-lime/10 border border-cyber-lime/20 text-cyber-lime cursor-not-allowed opacity-80"
                  : "bg-cyber-lime hover:bg-white text-black hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(204,255,0,0.1)]"
              }`}
            >
              {completedQuests[currentTask.id] ? "Quest Logged ✓" : "Log Task Completed"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
