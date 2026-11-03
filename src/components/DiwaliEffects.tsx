"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/* -------------------------------------------------------------------------- */
/*  Diwali crackers — full-screen ambient layer.                              */
/*  Everything is pointer-events-none so rockets/anars/bursts never block     */
/*  clicks, form fields or the booking flow anywhere on the site.             */
/* -------------------------------------------------------------------------- */

const BURST_COLORS = ["#FFC145", "#F27A21", "#E2537E", "#FFFFFF", "#FFE082"];
const ANIYAR_COLORS = ["#FFC145", "#F27A21", "#E2537E", "#22C55E"];

type Burst = { id: number; x: number; y: number; c: string };
type Rocket = { id: number; x: number; y: number; c: string };
type Anar = { id: number; x: number; c: string };

/* ---------------- small bursting crackers (sky + mid) ---------------- */

function CrackerBursts() {
  const reduce = useReducedMotion();
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const spawn = () => {
      const id = ++idRef.current;
      setBursts((prev) => [
        ...prev.slice(-6),
        {
          id,
          x: 5 + Math.random() * 90,
          y: 8 + Math.random() * 78,
          c: BURST_COLORS[id % BURST_COLORS.length],
        },
      ]);
      setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 1400);
    };
    spawn();
    const timer = setInterval(spawn, 900);
    return () => clearInterval(timer);
  }, [reduce]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute"
          style={{ left: `${burst.x}%`, top: `${burst.y}%` }}
        >
          <motion.span
            key="center"
            className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: burst.c }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          {Array.from({ length: 16 }, (_, i: number) => {
            const angle = (i * 22.5) + (burst.id % 5) * 7;
            const rad = (angle * Math.PI) / 180;
            const dist = 24 + (i % 4) * 8;
            return (
              <motion.span
                key={`ray-${i}`}
                className="absolute h-1 w-1 rounded-full"
                style={{ backgroundColor: burst.c }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.round(Math.cos(rad) * dist),
                  y: Math.round(Math.sin(rad) * dist),
                  opacity: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: (i % 3) * 0.02,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ---------------- rockets shooting from bottom up ---------------- */

function Rockets() {
  const reduce = useReducedMotion();
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const launch = () => {
      const id = ++idRef.current;
      const x = 10 + Math.random() * 80;
      const c = BURST_COLORS[id % BURST_COLORS.length];
      setRockets((prev) => [...prev.slice(-5), { id, x, y: 100, c }]);
      setTimeout(() => setRockets((prev) => prev.filter((r) => r.id !== id)), 1800);
    };
    launch();
    const timer = setInterval(launch, 1400);
    return () => clearInterval(timer);
  }, [reduce]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {rockets.map((rocket) => (
        <div key={rocket.id} className="absolute pointer-events-none">
          {/* trail */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[1px] h-6 rounded-full bg-white/60 translate-x-[-50%]"
            initial={{ y: 40, opacity: 1 }}
            animate={{ y: -92, opacity: 0 }}
            transition={{ duration: 1.4, ease: "linear" }}
          />
          {/* rocket head */}
          <motion.div
            key="head"
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full translate-x-[-50%]"
            style={{ backgroundColor: rocket.c, boxShadow: `0 0 10px ${rocket.c}` }}
            initial={{ y: 40, opacity: 1 }}
            animate={{ y: -92, opacity: 0 }}
            transition={{ duration: 1.4, ease: "linear" }}
          />
          {/* burst at top */}
          {Array.from({ length: 12 }, (_, i: number) => {
            const angle = i * 30;
            const rad = (angle * Math.PI) / 180;
            return (
              <motion.span
                key={`burst-${i}`}
                className="absolute h-1 w-1 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: rocket.c }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.round(Math.cos(rad) * 16),
                  y: Math.round(Math.sin(rad) * 16) - 40,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 1.3 + (i % 2) * 0.05,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ---------------- anars — ground spinning crackers ---------------- */

function Anars() {
  const reduce = useReducedMotion();
  const [anars, setAnars] = useState<Anar[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const spawn = () => {
      const id = ++idRef.current;
      const x = 10 + Math.random() * 80;
      setAnars((prev) => [...prev.slice(-5), { id, x, c: ANIYAR_COLORS[id % ANIYAR_COLORS.length] }]);
      setTimeout(() => setAnars((prev) => prev.filter((a) => a.id !== id)), 2000);
    };
    spawn();
    const timer = setInterval(spawn, 1700);
    return () => clearInterval(timer);
  }, [reduce]);

  return (
    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 overflow-hidden" aria-hidden="true">
      {anars.map((anar) => (
        <div
          key={anar.id}
          className="absolute bottom-[8%]"
          style={{ left: `${anar.x}%` }}
        >
          {/* spinning base */}
          <motion.div
            key="base"
            className="absolute top-[-4px] left-[-4px] h-[10px] w-[10px] rounded-full border-[2px] border-white/20 translate-x-[-50%]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          {/* spinning sparks */}
          {Array.from({ length: 10 }, (i: number) => {
            const angle = i * 36;
            const rad = (angle * Math.PI) / 180;
            const dist = 6 + (i % 3) * 3;
            return (
              <motion.span
                key={`spark-${i}`}
                className="absolute top-[-2px] left-[-2px] h-1 w-1 rounded-full translate-x-[-50%] translate-y-[-50%]"
                style={{ backgroundColor: anar.c }}
                initial={{ rotate: angle, scale: 1, opacity: 1 }}
                animate={{ rotate: angle + 720, scale: 0, opacity: 0 }}
                transition={{ duration: 1.4, ease: "linear" }}
              />
            );
          })}
          {/* flash */}
          <motion.div
            key="flash"
            className="absolute top-[-6px] left-[-6px] h-[14px] w-[14px] rounded-full translate-x-[-50%] translate-y-[-50%]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      ))}
    </div>
  );
}

/* ---------------- global diwali effects layer ---------------- */

export default function DiwaliEffects() {
  const reduce = useReducedMotion();

  return (
    <div
      className="fixed inset-0 z-[60] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <CrackerBursts />
      <Rockets />
      <Anars />

      {reduce ? null : (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(2px 2px at 20px 30px, rgba(255,244,226,0.35), transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,193,69,0.25), transparent), radial-gradient(1px 1px at 90px 40px, rgba(255,244,226,0.3), transparent), radial-gradient(2px 2px at 160px 120px, rgba(255,193,69,0.2), transparent)",
            backgroundSize: "200px 200px",
          }}
        />
      )}
    </div>
  );
}
