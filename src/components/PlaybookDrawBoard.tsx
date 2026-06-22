"use client";

import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

export default function PlaybookDrawBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [routePoints, setRoutePoints] = useState<Point[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [playResult, setPlayResult] = useState<string | null>(null);
  const [wrPos, setWrPos] = useState<Point>({ x: 300, y: 220 });
  const [dbPos, setDbPos] = useState<Point>({ x: 300, y: 150 });
  const [ballPos, setBallPos] = useState<Point>({ x: 200, y: 250 });
  const [ballVisible, setBallVisible] = useState(false);

  // Constants for starting positions
  const qbStart = { x: 200, y: 250 };
  const wrStart = { x: 300, y: 220 };
  const dbStart = { x: 300, y: 150 };

  // Preset Routes
  const applyPresetRoute = (type: "slant" | "out" | "post") => {
    resetBoard();
    const points: Point[] = [];
    const steps = 40;
    if (type === "slant") {
      // Go straight up, then diagonal inward
      for (let i = 0; i <= 20; i++) {
        points.push({ x: wrStart.x, y: wrStart.y - i * 4 });
      }
      const lastPt = points[points.length - 1];
      for (let i = 1; i <= 20; i++) {
        points.push({ x: lastPt.x - i * 4, y: lastPt.y - i * 2.5 });
      }
    } else if (type === "out") {
      // Go straight up, then sharp outward
      for (let i = 0; i <= 20; i++) {
        points.push({ x: wrStart.x, y: wrStart.y - i * 5 });
      }
      const lastPt = points[points.length - 1];
      for (let i = 1; i <= 20; i++) {
        points.push({ x: lastPt.x + i * 4, y: lastPt.y });
      }
    } else if (type === "post") {
      // Go straight up, then diagonal inward long
      for (let i = 0; i <= 15; i++) {
        points.push({ x: wrStart.x, y: wrStart.y - i * 5 });
      }
      const lastPt = points[points.length - 1];
      for (let i = 1; i <= 25; i++) {
        points.push({ x: lastPt.x - i * 5, y: lastPt.y - i * 3 });
      }
    }
    setRoutePoints(points);
  };

  // Reset board state
  const resetBoard = () => {
    setRoutePoints([]);
    setIsRunning(false);
    setPlayResult(null);
    setWrPos(wrStart);
    setDbPos(dbStart);
    setBallPos(qbStart);
    setBallVisible(false);
  };

  // Handle Drawing Input
  const getCoordinates = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Scale coordinates correctly matching canvas internal size
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isRunning) return;
    const pt = getCoordinates(e.nativeEvent);
    if (!pt) return;

    // Check if click is near WR starting position (within 35 pixels)
    const dist = Math.hypot(pt.x - wrStart.x, pt.y - wrStart.y);
    if (dist < 35) {
      setIsDrawing(true);
      setRoutePoints([wrStart]);
      setPlayResult(null);
    }
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isRunning) return;
    // Prevent default scrolling on mobile touch actions
    if (e.cancelable) e.preventDefault();
    
    const pt = getCoordinates(e.nativeEvent);
    if (!pt) return;

    // Boundary check inside canvas
    const canvas = canvasRef.current;
    if (canvas) {
      if (pt.x < 10 || pt.x > canvas.width - 10 || pt.y < 10 || pt.y > canvas.height - 10) {
        setIsDrawing(false);
        return;
      }
    }

    // Prevent duplicate consecutive points
    const lastPt = routePoints[routePoints.length - 1];
    if (!lastPt || Math.hypot(pt.x - lastPt.x, pt.y - lastPt.y) > 3) {
      setRoutePoints((prev) => [...prev, pt]);
    }
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  // Run the Play simulation
  const runPlay = async () => {
    if (routePoints.length < 5 || isRunning) return;
    setIsRunning(true);
    setPlayResult(null);

    let step = 0;
    const totalSteps = routePoints.length;

    // Helper animation loop
    const animate = () => {
      if (step < totalSteps) {
        // Move WR along the route points
        const currentWr = routePoints[step];
        setWrPos(currentWr);

        // DB follows with a delay (shading behind the WR)
        const dbIndex = Math.max(0, step - 12);
        const currentDb = routePoints[dbIndex];
        // Shift defender slightly to simulate coverage spacing
        setDbPos({
          x: currentDb.x + 8,
          y: currentDb.y - 12,
        });

        step += 1;
        requestAnimationFrame(animate);
      } else {
        // Route complete, QB throws the football
        throwBall();
      }
    };

    animate();
  };

  const throwBall = () => {
    setBallVisible(true);
    let t = 0;
    const finalWr = routePoints[routePoints.length - 1];

    const animateBall = () => {
      if (t <= 1) {
        // Interpolate ball path from QB to WR
        setBallPos({
          x: qbStart.x + (finalWr.x - qbStart.x) * t,
          y: qbStart.y + (finalWr.y - qbStart.y) * t,
        });
        t += 0.05;
        requestAnimationFrame(animateBall);
      } else {
        // Ball arrives
        setBallPos(finalWr);
        
        // Evaluate coverage. If DB is too close, it's covered. Otherwise, touchdown!
        const finalDb = dbPos;
        const distToDb = Math.hypot(finalWr.x - finalDb.x, finalWr.y - finalDb.y);
        
        if (distToDb < 22) {
          setPlayResult("INTERCEPTED! The defender covered the route closely. Tip: Draw a sharper cut or try the 'Out' preset to shake the defender!");
        } else {
          setPlayResult("TOUCHDOWN! Caught in open space! Play executed successfully. Predictable routes create clear, stress-free teamwork.");
        }
        setIsRunning(false);
      }
    };

    animateBall();
  };

  // Draw the Canvas Content
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Football Field Background
    ctx.fillStyle = "#0c1322";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Yard Lines & Grid
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let y = 30; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Hash Marks & Side Lines
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 0); ctx.lineTo(10, canvas.height);
    ctx.moveTo(canvas.width - 10, 0); ctx.lineTo(canvas.width - 10, canvas.height);
    ctx.stroke();

    // Line of Scrimmage (Red Line)
    ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(10, 220);
    ctx.lineTo(canvas.width - 10, 220);
    ctx.stroke();
    ctx.setLineDash([]);

    // Line of Scrimmage Text Label
    ctx.fillStyle = "rgba(239, 68, 68, 0.6)";
    ctx.font = "bold 9px monospace";
    ctx.fillText("SCRIMMAGE LINE", 15, 214);

    // End Zone Line
    ctx.strokeStyle = "rgba(6, 182, 212, 0.3)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, 40);
    ctx.lineTo(canvas.width - 10, 40);
    ctx.stroke();

    // End Zone Fill Pattern
    ctx.fillStyle = "rgba(6, 182, 212, 0.03)";
    ctx.fillRect(10, 0, canvas.width - 20, 40);
    
    ctx.fillStyle = "rgba(6, 182, 212, 0.4)";
    ctx.font = "bold 10px monospace";
    ctx.fillText("END ZONE", canvas.width / 2 - 25, 25);

    // 2. Draw the Route Points (Receiver Path)
    if (routePoints.length > 0) {
      ctx.strokeStyle = "#ccff00";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(routePoints[0].x, routePoints[0].y);
      for (let i = 1; i < routePoints.length; i++) {
        ctx.lineTo(routePoints[i].x, routePoints[i].y);
      }
      ctx.stroke();

      // Draw route arrow at the end
      if (routePoints.length > 1) {
        const last = routePoints[routePoints.length - 1];
        const prev = routePoints[routePoints.length - 2];
        const angle = Math.atan2(last.y - prev.y, last.x - prev.x);
        
        ctx.fillStyle = "#ccff00";
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(
          last.x - 10 * Math.cos(angle - Math.PI / 6),
          last.y - 10 * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          last.x - 10 * Math.cos(angle + Math.PI / 6),
          last.y - 10 * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
      }
    }

    // 3. Draw Players
    // QB - Quarterback (Yellow/Cyan)
    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = "#06b6d4";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(qbStart.x, qbStart.y, 11, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("QB", qbStart.x, qbStart.y);

    // WR - Wide Receiver (Lime)
    const currentWr = isRunning ? wrPos : wrStart;
    ctx.fillStyle = "#080c14";
    ctx.strokeStyle = "#ccff00";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(currentWr.x, currentWr.y, 11, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ccff00";
    ctx.fillText("WR", currentWr.x, currentWr.y);

    // DB - Defender (Red)
    const currentDb = isRunning ? dbPos : dbStart;
    ctx.fillStyle = "#1e1b1b";
    ctx.strokeStyle = "#f87171";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(currentDb.x, currentDb.y, 11, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f87171";
    ctx.fillText("DB", currentDb.x, currentDb.y);

    // 4. Draw Football (if thrown)
    if (ballVisible) {
      ctx.fillStyle = "#f59e0b"; // Orange/Brown ball
      ctx.strokeStyle = "#f8fafc";
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Draw ball as oval
      ctx.ellipse(ballPos.x, ballPos.y, 7, 4, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

  }, [routePoints, isRunning, wrPos, dbPos, ballPos, ballVisible]);

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Playbook Canvas (Left/Top) */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-lime shadow-[0_0_8px_#ccff00]" />
              <h3 className="font-bold text-white text-base">Interactive Playbook Designer</h3>
            </div>
            <span className="text-xxs font-mono text-slate-500 uppercase">Field Size: 400x300</span>
          </div>

          <div className="relative aspect-[4/3] max-w-[420px] mx-auto bg-cyber-dark rounded-xl border border-white/10 overflow-hidden shadow-inner touch-none">
            {/* Canvas Element */}
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              className="w-full h-full cursor-crosshair block"
            />

            {/* Tap Helper Overlay */}
            {routePoints.length === 0 && !isDrawing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center bg-black/40">
                <div className="w-12 h-12 rounded-full border border-cyber-lime/40 flex items-center justify-center text-cyber-lime animate-bounce mb-3 bg-cyber-dark/80">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.303.197-1.591 1.591M21 12h-2.25m-.197 5.303-1.591-1.591M12 19.5V21.75M6.697 17.303l-1.591 1.591M3 12h2.25m.197-5.303 1.591 1.591" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-white drop-shadow">
                  Drag from the green <span className="text-cyber-lime uppercase font-mono">WR</span> node to draw a route path!
                </p>
                <p className="text-xxs text-slate-400 mt-1">
                  Or select a preset playbook pattern below
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Playbook Sidebar (Right/Bottom) */}
        <div className="w-full lg:w-[280px] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-electric-blue">
              Playbook Controls
            </h4>
            <p className="text-xs text-soft-gray leading-relaxed">
              Autistic-friendly sports focus on <strong>tactical certainty</strong>. When everyone runs an exact visual route, there is no guesswork, leaving zero room for social anxiety.
            </p>

            {/* Presets Grid */}
            <div className="space-y-2">
              <span className="block text-xxs font-bold text-slate-500 uppercase tracking-widest">Preset Route Paths</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => applyPresetRoute("slant")}
                  disabled={isRunning}
                  className="px-2 py-1.5 rounded bg-white/5 border border-white/5 hover:border-cyber-lime/40 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer text-center"
                >
                  Slant
                </button>
                <button
                  onClick={() => applyPresetRoute("out")}
                  disabled={isRunning}
                  className="px-2 py-1.5 rounded bg-white/5 border border-white/5 hover:border-cyber-lime/40 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer text-center"
                >
                  Out
                </button>
                <button
                  onClick={() => applyPresetRoute("post")}
                  disabled={isRunning}
                  className="px-2 py-1.5 rounded bg-white/5 border border-white/5 hover:border-cyber-lime/40 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer text-center"
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            {/* Run & Reset Buttons */}
            <div className="flex gap-2">
              <button
                onClick={runPlay}
                disabled={routePoints.length < 5 || isRunning}
                className="flex-1 py-2.5 rounded-lg bg-cyber-lime hover:bg-white text-black font-bold text-sm disabled:opacity-30 disabled:hover:bg-cyber-lime transition duration-300 cursor-pointer disabled:cursor-not-allowed text-center"
              >
                Run Play
              </button>
              <button
                onClick={resetBoard}
                disabled={isRunning}
                className="px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition duration-300 cursor-pointer"
                title="Reset Board"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>
            
            {/* Feedback Message */}
            {playResult && (
              <div className={`p-3 rounded-lg border text-xxs font-medium leading-relaxed animate-fadeIn ${
                playResult.includes("TOUCHDOWN")
                  ? "bg-cyber-lime/10 border-cyber-lime/20 text-cyber-lime"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}>
                {playResult}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
