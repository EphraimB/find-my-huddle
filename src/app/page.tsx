"use client";

import TimelineWalkthrough from "@/components/TimelineWalkthrough";
import ComfortAdaptor from "@/components/ComfortAdaptor";
import PlaybookDrawBoard from "@/components/PlaybookDrawBoard";
import DoomscrollReplacement from "@/components/DoomscrollReplacement";
import ClubSocialCalendar from "@/components/ClubSocialCalendar";
import EnrollmentForm from "@/components/EnrollmentForm";

export default function Home() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex-1 bg-cyber-dark text-slate-100 flex flex-col font-sans relative selection:bg-cyber-lime selection:text-black">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-cyber-lime/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[350px] h-[350px] rounded-full bg-electric-blue/5 blur-3xl pointer-events-none" />

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyber-lime flex items-center justify-center text-black font-extrabold text-sm shadow-[0_0_12px_rgba(204,255,0,0.3)]">
              H
            </div>
            <div>
              <span className="font-mono text-xs text-slate-500 block leading-none">SPORTS CLUB</span>
              <span className="font-extrabold text-sm sm:text-base tracking-wider text-white">FIND MY HUDDLE</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection("timeline-section")}
              className="text-xs font-mono font-bold tracking-wider text-slate-400 hover:text-cyber-lime transition cursor-pointer"
            >
              ROADMAP
            </button>
            <button 
              onClick={() => scrollToSection("clubhouse-section")}
              className="text-xs font-mono font-bold tracking-wider text-slate-400 hover:text-cyber-lime transition cursor-pointer"
            >
              CLUBHOUSE CALENDAR
            </button>
            <button 
              onClick={() => scrollToSection("homework-section")}
              className="text-xs font-mono font-bold tracking-wider text-slate-400 hover:text-cyber-lime transition cursor-pointer"
            >
              DOOMSCROLL SWAP
            </button>
            <button 
              onClick={() => scrollToSection("comfort-section")}
              className="text-xs font-mono font-bold tracking-wider text-slate-400 hover:text-cyber-lime transition cursor-pointer"
            >
              COMFORT ADAPTOR
            </button>
            <button 
              onClick={() => scrollToSection("playbook-section")}
              className="text-xs font-mono font-bold tracking-wider text-slate-400 hover:text-cyber-lime transition cursor-pointer"
            >
              PLAYBOOK BOARD
            </button>
          </div>

          <button
            onClick={() => scrollToSection("enrollment-section")}
            className="px-4 py-2 rounded-lg bg-cyber-lime text-black font-bold text-xs tracking-wider uppercase hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.15)]"
          >
            Join Huddle Club
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Glow Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 text-cyan-400 text-xs font-mono border border-cyan-800/40 mb-6 tracking-wide animate-pulse">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          A SUPPORTIVE COMMUNITY & SPORTS CLUB
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
          A Structured, <span className="text-cyber-lime glow-text-lime">Weekly Sports Club</span> <br />
          For True Teammate Connection
        </h1>

        <p className="mt-6 text-base sm:text-lg text-soft-gray max-w-2xl leading-relaxed">
          More than just an athletic clinic. Find My Huddle is a neurodivergent social outlet combining low-stakes weekly flag football matches with online gaming lobbies, strategy board games, and quiet tailgates.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-md">
          <button
            onClick={() => scrollToSection("clubhouse-section")}
            className="px-6 py-3 rounded-lg bg-cyber-lime hover:bg-white text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer text-center"
          >
            View Weekly Socials
          </button>
          <button
            onClick={() => scrollToSection("timeline-section")}
            className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer text-center"
          >
            Our 12-Week Roadmap
          </button>
        </div>

        {/* Sensory Highlights Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full border-t border-b border-white/5 py-8 bg-white/[0.01]">
          <div className="p-3 text-center">
            <span className="block text-xl sm:text-2xl font-bold text-cyber-lime">Weekly Socials</span>
            <span className="block text-xxs sm:text-xs text-slate-400 uppercase tracking-widest mt-1 font-mono">Gaming & Tabletop Nights</span>
          </div>
          <div className="p-3 text-center">
            <span className="block text-xl sm:text-2xl font-bold text-cyber-lime">Consistent Cohorts</span>
            <span className="block text-xxs sm:text-xs text-slate-400 uppercase tracking-widest mt-1 font-mono">No Selection Anxiety</span>
          </div>
          <div className="p-3 text-center">
            <span className="block text-xl sm:text-2xl font-bold text-cyber-lime">Low-Pressure Drills</span>
            <span className="block text-xxs sm:text-xs text-slate-400 uppercase tracking-widest mt-1 font-mono">At-Home Screen Breaks</span>
          </div>
          <div className="p-3 text-center">
            <span className="block text-xl sm:text-2xl font-bold text-cyber-lime">Whistle-Free Play</span>
            <span className="block text-xxs sm:text-xs text-slate-400 uppercase tracking-widest mt-1 font-mono">Visual Buzzer Signals</span>
          </div>
        </div>

      </section>

      {/* Clubhouse Section (Social Calendar) */}
      <section id="clubhouse-section" className="py-16 border-t border-white/5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-white/[0.005]">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">The Huddle Clubhouse</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Weekly Social Outlets
          </h2>
          <p className="text-xs sm:text-sm text-soft-gray mt-3 leading-relaxed">
            Team bonding doesn't stop on the grass. We host structured, sensory-friendly off-field activities every week. Click on each day to reveal events, social battery meters, and accommodations.
          </p>
        </div>

        <ClubSocialCalendar />
      </section>

      {/* Predictability Section - 12-Week Roadmap */}
      <section id="timeline-section" className="py-16 border-t border-white/5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Structured Journey</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            The 12-Week Season Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-soft-gray mt-3 leading-relaxed">
            Building connections takes time. Our monthly phases gradually ease you from individual physics patterns to partner throwing routines, leading up to cooperative league huddles.
          </p>
        </div>

        <TimelineWalkthrough />
      </section>

      {/* Homework Section (Doomscroll Swap) */}
      <section id="homework-section" className="py-16 border-t border-white/5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-white/[0.005]">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">At-Home Preparation</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Doomscroll Alternatives
          </h2>
          <p className="text-xs sm:text-sm text-soft-gray mt-3 leading-relaxed">
            Swap phone screen scrolling for quick, low-pressure huddle homework. Complete physical coordination traps, playbook designs, or bedroom agility exercises to prep for Saturdays.
          </p>
        </div>

        <DoomscrollReplacement />
      </section>

      {/* Comfort Adaptor Section */}
      <section id="comfort-section" className="py-16 border-t border-white/5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Social Battery Customization</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            The Communication Adaptor
          </h2>
          <p className="text-xs sm:text-sm text-soft-gray mt-3 leading-relaxed">
            Whether you want to play silently using visual play cards, practice in structured pairs, or call plays in the huddle, we adjust player coordination to match your comfort levels.
          </p>
        </div>

        <ComfortAdaptor />
      </section>

      {/* Playbook Section */}
      <section id="playbook-section" className="py-16 border-t border-white/5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-white/[0.005]">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Rule-Based Coordination</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Playbook Design Task
          </h2>
          <p className="text-xs sm:text-sm text-soft-gray mt-3 leading-relaxed">
            Try drawing receiver patterns on our canvas field. When everyone runs pre-designed lines, coordination is predictable, repeatable, and completely logical—no social guessing required.
          </p>
        </div>

        <PlaybookDrawBoard />
      </section>

      {/* Sensory Guarantee Details */}
      <section className="py-16 border-t border-white/5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Accommodating Environment</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Sensory Safety Guarantees
          </h2>
          <p className="text-xs sm:text-sm text-soft-gray mt-3 leading-relaxed">
            We prioritize visual cues, predictable schedules, and structured off-field settings so you can play without feeling sensory or social strain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-cyber-lime/10 border border-cyber-lime/20 flex items-center justify-center text-cyber-lime mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Visual Buzzer Signals</h4>
            <p className="text-xs text-soft-gray leading-relaxed">
              Metal whistles can trigger auditory stress. Coaches coordinate using soft-frequency electronic handheld buzzers and visual flag signals instead.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-cyber-lime/10 border border-cyber-lime/20 flex items-center justify-center text-cyber-lime mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75-9.75-4.365-9.75-9.75ZM9 10.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Dedicated Quiet Tents</h4>
            <p className="text-xs text-soft-gray leading-relaxed">
              If sensory volume or physical effort feels too high, you can step off to our quiet tents. Soft lighting, cooling fans, and quiet seats are open at all times.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-cyber-lime/10 border border-cyber-lime/20 flex items-center justify-center text-cyber-lime mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Familiar Huddle Cohorts</h4>
            <p className="text-xs text-soft-gray leading-relaxed">
              Play with the same small group of 3-4 players for the duration of the league. Building trust takes time, and consistency reduces routine changes.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="py-16 border-t border-white/5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-white/[0.005]">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Real Stories</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Teammates Who Found Their Huddle
          </h2>
          <p className="text-xs sm:text-sm text-soft-gray mt-3 leading-relaxed">
            Read how other autistic young adults transitioned from screen isolation to finding active, weekly athletic connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 relative">
            <div className="absolute top-6 right-6 text-cyber-lime opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
              &ldquo;I spent 8 hours a day scrolling social media. The at-home homework gave me small, visual tasks to do instead—like Tennis Ball Drops. Over 12 weeks, playing with the same buddy made me comfortable enough to join huddle plays on-field. I'm actually excited for Saturdays now.&rdquo;
            </p>
            <div>
              <span className="block font-bold text-white text-sm">Marcus K.</span>
              <span className="block text-xxs font-mono text-slate-500 mt-0.5">MEMBER SINCE 2025 &bull; WEEKLY LEAGUE</span>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 relative">
            <div className="absolute top-6 right-6 text-cyber-lime opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
              &ldquo;The weekly routine consistency is what worked. Knowing I'd see the same coach and run the playbook with the same huddle partner made social dynamics predictable. Practicing the footwork patterns at home prepared me without the anxiety of a traditional gym environment.&rdquo;
            </p>
            <div>
              <span className="block font-bold text-white text-sm">Liam D.</span>
              <span className="block text-xxs font-mono text-slate-500 mt-0.5">MEMBER SINCE 2025 &bull; WEEKLY LEAGUE</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Enrollment Section */}
      <section id="enrollment-section" className="py-16 border-t border-white/5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <EnrollmentForm />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-cyber-dark/80 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="font-extrabold text-sm tracking-wider text-white">FIND MY HUDDLE</span>
            <p className="text-xxs text-slate-500 mt-1">
              &copy; {new Date().getFullYear()} Find My Huddle. All rights reserved. Designed for weekly progress and neuro-inclusion.
            </p>
          </div>
          <div className="flex gap-4 text-xxs font-mono text-slate-400">
            <span className="hover:text-cyber-lime cursor-pointer">Sensory Policy</span>
            <span>&bull;</span>
            <span className="hover:text-cyber-lime cursor-pointer">Weekly Quests</span>
            <span>&bull;</span>
            <span className="hover:text-cyber-lime cursor-pointer">League Support</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
