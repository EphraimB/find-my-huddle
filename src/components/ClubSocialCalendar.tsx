"use client";

import { useState } from "react";

interface SocialEvent {
  dayName: string;
  eventName: string;
  tagline: string;
  time: string;
  location: string;
  socialBatteryCost: number; // 1 to 5 scale
  socialBatteryLabel: string;
  accommodations: string[];
  whyItHelps: string;
  description: string;
}

const WEEKLY_EVENTS: Record<string, SocialEvent> = {
  Monday: {
    dayName: "Monday",
    eventName: "Co-Op Minecraft & Strategy Lobby",
    tagline: "Build together silently or chat via text in our private club server.",
    time: "7:00 PM - 8:30 PM",
    location: "Club Discord Server (Online)",
    socialBatteryCost: 1,
    socialBatteryLabel: "Very Low Social Demand",
    accommodations: ["Voice optional", "Text-only channels", "Pop in/out anytime", "No camera required"],
    whyItHelps: "Cooperative game systems let us share space and accomplish goals without the need to sustain open-ended face-to-face small talk.",
    description: "Connect from home. Jump into our quiet Minecraft world or join co-op puzzle rooms. Play parallel to teammates, coordinate builds, or simply listen to the server music channel. It's a low-friction social check-in before the week starts."
  },
  Tuesday: {
    dayName: "Tuesday",
    eventName: "Off-Field Recharge Day",
    tagline: "A dedicated quiet night to recharge batteries. No scheduled events.",
    time: "All Day",
    location: "Personal Space",
    socialBatteryCost: 0,
    socialBatteryLabel: "No Social Demand",
    accommodations: ["100% Recharge focus", "Coaches are email-only", "Downtime prioritized"],
    whyItHelps: "Pre-scheduled quiet time ensures you have space to rest without feeling guilty or left out of the community.",
    description: "Every member needs quiet time to process and rest. Coaches use this day to review playbook submissions. No club activities are scheduled, protecting your personal routine."
  },
  Wednesday: {
    dayName: "Wednesday",
    eventName: "Playbook Whiteboard Workshop & Pizza",
    tagline: "Design plays and discuss tactics in a structured, quiet setting.",
    time: "6:30 PM - 8:00 PM",
    location: "Clubhouse Study Room (Quiet Space)",
    socialBatteryCost: 3,
    socialBatteryLabel: "Moderate Social Demand",
    accommodations: ["Soft warm lighting", "Printed route templates", "PECS cards available", "Small tables of 3-4"],
    whyItHelps: "Focusing on a system (like football coordinates and routing lines) gives the conversation a clear, rule-based focus, reducing communication anxiety.",
    description: "Meet in person at our quiet clubhouse. We grab pizza, review route simulations, and sketch new plays on laminated chalkboard folders. It's highly structured: we analyze plays first, share designs in pairs, and grab food without pressure."
  },
  Thursday: {
    dayName: "Thursday",
    eventName: "At-Home Homework & Rest",
    tagline: "Log your bedroom fitness or route design quests. No live events.",
    time: "All Day",
    location: "At Home",
    socialBatteryCost: 0,
    socialBatteryLabel: "No Social Demand",
    accommodations: ["Visual app check-ins", "Self-paced exercises", "No live chats"],
    whyItHelps: "Helps you prepare for Saturday matches physically and mentally without requiring social interaction.",
    description: "Use this time to review the playbook map for Saturday and try one of our bedroom coordination drills. Submitting your homework prepares the coaches for Saturday group alignments."
  },
  Friday: {
    dayName: "Friday",
    eventName: "Tabletop Strategy Board Game Night",
    tagline: "Play structured tabletop board games with clear rules and turn-taking.",
    time: "7:00 PM - 9:00 PM",
    location: "Clubhouse Main Room",
    socialBatteryCost: 2,
    socialBatteryLabel: "Low-to-Moderate Social Demand",
    accommodations: ["Soft ambient lighting", "Noise-reduction earmuffs welcome", "Visual rule helper cards", "Quiet breakout room"],
    whyItHelps: "Board games have explicit rules and turn-taking structures. You always know whose turn it is and what actions are allowed, removing social guesswork.",
    description: "Unwind before game day. We set up tables for cooperative card games, resource strategies, and puzzle boards. If the main room becomes too loud, our quiet breakout room is fully staffed with board game leaders."
  },
  Saturday: {
    dayName: "Saturday",
    eventName: "League Match & Outdoor Tailgate",
    tagline: "Our main weekly play session and structured outdoor cookout.",
    time: "9:30 AM - 1:00 PM",
    location: "Huddle Field & Clubhouse Lawn",
    socialBatteryCost: 4,
    socialBatteryLabel: "Active Social Demand",
    accommodations: ["Whistle-free play", "Visual flags", "Sensory relief tents always open", "Wristband communications"],
    whyItHelps: "On-field roles are pre-planned. The post-game tailgate is structured with self-serve food stations, sensory spaces, and low-pressure yard games.",
    description: "The core event! Run your routes in 3-on-3 league games using wristband systems. Afterward, we head to the clubhouse lawn for a casual cookout. Grab a plate, check out play recaps, or hang out in the quiet tent. Completely stress-free."
  },
  Sunday: {
    dayName: "Sunday",
    eventName: "Weekly Highlights Recap & Chat",
    tagline: "An online review of plays, touchdown highlights, and weekly awards.",
    time: "4:00 PM - 5:00 PM",
    location: "Discord Live Channel",
    socialBatteryCost: 1,
    socialBatteryLabel: "Very Low Social Demand",
    accommodations: ["Listen-only option", "Text comments welcome", "Video recorded for later view", "No live speaking required"],
    whyItHelps: "Allows you to celebrate achievements and feel connected to the club's progress from the comfort of home.",
    description: "Coaches stream video clips of Saturday's best routes and team touchdowns. Log in to comment, vote on the 'Play of the Week', or just watch silently. We hand out digital patches and preview next week's playbook."
  }
};

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ClubSocialCalendar() {
  const [selectedDay, setSelectedDay] = useState<string>("Saturday");
  const currentEvent = WEEKLY_EVENTS[selectedDay];

  return (
    <div className="w-full">
      {/* Weekly Grid Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
        {DAYS_OF_WEEK.map((day) => {
          const isActive = day === selectedDay;
          const event = WEEKLY_EVENTS[day];
          
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`relative rounded-xl p-3 border transition-all duration-300 text-center cursor-pointer ${
                isActive
                  ? "bg-deep-steel border-cyber-lime text-cyber-lime shadow-[0_0_15px_rgba(204,255,0,0.1)]"
                  : "bg-deep-steel/30 border-white/5 hover:border-white/10 text-slate-400"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyber-lime shadow-[0_0_8px_#ccff00]" />
              )}
              <span className="block text-xxs font-mono text-slate-500 uppercase tracking-widest">
                {day.substring(0, 3)}
              </span>
              <span className="block font-bold text-xs sm:text-sm mt-0.5">{day}</span>
              <span className={`block text-xxs mt-1.5 font-mono truncate ${
                event.socialBatteryCost === 0 ? "text-slate-600" :
                event.socialBatteryCost <= 2 ? "text-cyan-400" : "text-cyber-lime"
              }`}>
                {event.socialBatteryCost === 0 ? "RECHARGE" : `COST: ${event.socialBatteryCost}/5`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Event Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 relative overflow-hidden transition-all duration-500">
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-cyber-lime/5 blur-3xl" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Event Core Info */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-mono border border-white/10 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                {currentEvent.dayName} Club Activity
              </div>
              
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {currentEvent.eventName}
              </h3>
              
              <p className="text-sm font-medium text-cyber-lime mt-1 leading-snug">
                {currentEvent.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-soft-gray leading-relaxed">
              {currentEvent.description}
            </p>

            {/* Social Logistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-cyber-dark/80 rounded-xl p-4 border border-white/5">
                <span className="block text-xxs font-mono text-slate-500 uppercase tracking-wider mb-1">Time Schedule</span>
                <span className="text-xs font-bold text-white">{currentEvent.time}</span>
              </div>
              <div className="bg-cyber-dark/80 rounded-xl p-4 border border-white/5">
                <span className="block text-xxs font-mono text-slate-500 uppercase tracking-wider mb-1">Event Location</span>
                <span className="text-xs font-bold text-white">{currentEvent.location}</span>
              </div>
            </div>

            {/* Why it helps paragraph */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30">
              <span className="block text-xxs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
                Neurodivergent Social Alignment
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentEvent.whyItHelps}
              </p>
            </div>
          </div>

          {/* Right Column: Social Demands & Accommodations */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Social Battery Meter */}
            <div className="bg-cyber-dark/80 rounded-xl p-5 border border-white/5 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="block text-xxs font-mono text-slate-500 uppercase tracking-wider">Social Battery Demand</span>
                <span className="text-xs font-bold text-slate-300">{currentEvent.socialBatteryLabel}</span>
              </div>

              {/* Energy bar visualizer */}
              {currentEvent.socialBatteryCost === 0 ? (
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-600 w-0 transition-all duration-500" />
                </div>
              ) : (
                <div className="flex gap-1.5 h-2.5">
                  {[1, 2, 3, 4, 5].map((level) => {
                    const active = level <= currentEvent.socialBatteryCost;
                    const isHigh = currentEvent.socialBatteryCost >= 4;
                    return (
                      <div
                        key={level}
                        className={`flex-1 rounded-sm transition-all duration-500 ${
                          active
                            ? isHigh
                              ? "bg-cyber-lime shadow-[0_0_6px_#ccff00]"
                              : "bg-cyan-400 shadow-[0_0_6px_#22d3ee]"
                            : "bg-slate-800"
                        }`}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accommodations Checklist */}
            <div className="space-y-3">
              <span className="block text-xxs font-mono text-slate-500 uppercase tracking-widest">Sensory Accommodations</span>
              <div className="space-y-2">
                {currentEvent.accommodations.map((acc, idx) => (
                  <div key={idx} className="flex gap-2.5 items-center">
                    <span className="w-5 h-5 rounded bg-white/5 border border-white/5 text-cyber-lime flex items-center justify-center text-xs font-bold shrink-0">
                      ✓
                    </span>
                    <span className="text-xs text-slate-300 font-semibold">{acc}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Clubhouse RSVP Button */}
            <div className="pt-2">
              <button 
                onClick={() => {
                  const el = document.getElementById("enrollment-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-3 rounded-xl bg-cyber-lime hover:bg-white text-black font-extrabold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer text-center"
              >
                Join Huddle Club & RSVP
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
