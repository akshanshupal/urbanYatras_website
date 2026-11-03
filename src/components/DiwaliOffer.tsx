"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Copy, Mail, Phone, Sparkles, Ticket, X } from "lucide-react";
import {
  DIWALI_OFFER_END,
  EMAIL_PATTERN,
  isDiwaliOfferActive,
  splitRemaining,
} from "@/lib/diwaliOffer";

/* ---------------------------------- data --------------------------------- */

const BURST_COLORS = ["#FFC145", "#F27A21", "#E2537E", "#FFF4E2"];

const RAYS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i * 360) / 14 + (i % 2 ? 8 : -6);
  const radius = 64 + (i % 4) * 16;
  const rad = (angle * Math.PI) / 180;
  return {
    dx: Math.round(Math.cos(rad) * radius),
    dy: Math.round(Math.sin(rad) * radius),
    t: (i % 7) * 0.05,
  };
});

const TICKET_SPARKS = [
  { dx: 95, dy: -8, t: 0.0, c: "#FFC145" },
  { dx: 82, dy: 52, t: 0.12, c: "#F27A21" },
  { dx: 42, dy: 88, t: 0.24, c: "#FFF4E2" },
  { dx: -6, dy: 104, t: 0.36, c: "#FFC145" },
  { dx: -58, dy: 84, t: 0.06, c: "#E2537E" },
  { dx: -92, dy: 46, t: 0.18, c: "#FFC145" },
  { dx: -102, dy: -12, t: 0.3, c: "#F27A21" },
  { dx: -78, dy: -62, t: 0.42, c: "#FFF4E2" },
  { dx: -34, dy: -96, t: 0.1, c: "#FFC145" },
  { dx: 14, dy: -108, t: 0.22, c: "#F27A21" },
  { dx: 62, dy: -86, t: 0.34, c: "#FFC145" },
  { dx: 98, dy: -44, t: 0.46, c: "#E2537E" },
];

type Burst = { id: number; x: number; y: number; c: string };

type ClaimState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "claimed"; code: string }
  | { status: "existing"; code: string }
  | { status: "error"; message: string };

/* -------------------------------- fireworks ------------------------------- */

function Fireworks({ celebrate }: { celebrate: number }) {
  const reduce = useReducedMotion();
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);

  // Ambient crackers while the popup is open.
  useEffect(() => {
    if (reduce) return;
    const spawn = () => {
      const id = ++idRef.current;
      setBursts((prev) => [
        ...prev.slice(-3),
        {
          id,
          x: 8 + Math.random() * 84,
          y: 6 + Math.random() * 50,
          c: BURST_COLORS[id % BURST_COLORS.length],
        },
      ]);
      setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 1500);
    };
    spawn();
    const timer = setInterval(spawn, 1900);
    return () => clearInterval(timer);
  }, [reduce]);

  // Extra salvo whenever a coupon is revealed.
  useEffect(() => {
    if (reduce || celebrate === 0) return;
    for (let i = 0; i < 3; i++) {
      const id = ++idRef.current;
      setTimeout(() => {
        setBursts((prev) => [
          ...prev.slice(-3),
          {
            id,
            x: 12 + ((id * 27) % 74),
            y: 8 + ((id * 17) % 48),
            c: BURST_COLORS[id % BURST_COLORS.length],
          },
        ]);
        setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 1500);
      }, i * 180);
    }
  }, [celebrate, reduce]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bursts.map((burst) => (
        <div key={burst.id} className="absolute" style={{ left: `${burst.x}%`, top: `${burst.y}%` }}>
          <motion.span
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: burst.c }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          {RAYS.map((ray, index) => (
            <motion.span
              key={index}
              className="absolute h-1 w-1 rounded-full"
              style={{ backgroundColor: burst.c }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: ray.dx, y: ray.dy, opacity: 0 }}
              transition={{ duration: 0.85, delay: ray.t, ease: "easeOut" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------- diya --------------------------------- */

function DiyaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="diya-flame" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#FFF4E2" />
          <stop offset="45%" stopColor="#FFC145" />
          <stop offset="100%" stopColor="#F27A21" />
        </radialGradient>
        <linearGradient id="diya-bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2537E" />
          <stop offset="100%" stopColor="#8E2D5B" />
        </linearGradient>
      </defs>
      {/* flame */}
      <path
        d="M32 6 C 35 14, 41 18, 38 26 C 36.5 30, 27.5 30, 26 26 C 23 18, 29 14, 32 6 Z"
        fill="url(#diya-flame)"
      />
      {/* bowl */}
      <path d="M10 34 Q 32 28 54 34 Q 52 46 32 50 Q 12 46 10 34 Z" fill="url(#diya-bowl)" />
      <ellipse cx="32" cy="34" rx="22" ry="4" fill="#FFC145" />
      {/* glow */}
      <circle cx="32" cy="22" r="16" fill="url(#diya-flame)" opacity="0.18" />
    </svg>
  );
}

/* ---------------------------------- popup --------------------------------- */

export default function DiwaliOffer() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [email, setEmail] = useState("");
  const [claim, setClaim] = useState<ClaimState>({ status: "idle" });
  const [copied, setCopied] = useState(false);
  const [celebrate, setCelebrate] = useState(0);
  const [claimedCount, setClaimedCount] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    setRemaining(DIWALI_OFFER_END.getTime() - Date.now());
    const timer = setInterval(
      () => setRemaining(DIWALI_OFFER_END.getTime() - Date.now()),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  // Auto-open the popup 3 seconds after page load.
  useEffect(() => {
    if (!isDiwaliOfferActive()) return;
    const timer = setTimeout(() => {
      setOpen(true);
      setClaimedCount(500);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Focus + Escape + scroll lock while open.
  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const active = isDiwaliOfferActive() && remaining > 0;

  if (!mounted) return null;
  if (!active) return null;

  const { days, hours, minutes, seconds } = splitRemaining(remaining);
  const tiles = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(value)) {
      setClaim({ status: "error", message: "Enter a valid email address." });
      return;
    }
    setClaim({ status: "loading" });
    try {
      const res = await fetch("/api/diwali-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json();
      if (data?.offerEnded) return;
      if (!res.ok || !data?.code) {
        setClaim({
          status: "error",
          message: data?.error || "Couldn't generate your coupon. Try again.",
        });
        return;
      }
      setClaim(
        data.alreadyClaimed
          ? { status: "existing", code: data.code }
          : { status: "claimed", code: data.code },
      );
      setCelebrate((value) => value + 1);
    } catch {
      setClaim({
        status: "error",
        message: "Couldn't generate your coupon. Check your connection and try again.",
      });
    }
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const revealDone = claim.status === "claimed" || claim.status === "existing";
  const revealCode =
    claim.status === "claimed" || claim.status === "existing" ? claim.code : "";

  return (
    <>
      {/* ------------------------------ floating diya ------------------------------ */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Diwali offer — extra 10% off"
        initial={reduce ? undefined : { scale: 0, rotate: -20 }}
        animate={reduce ? undefined : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1 }}
        whileHover={{ scale: 1.08, rotate: -4 }}
        whileTap={{ scale: 0.94 }}
        className="group fixed bottom-5 right-5 z-40 flex flex-col items-center drop-shadow-[0_10px_24px_rgba(226,83,126,0.45)]"
      >
        <span className="pointer-events-none absolute -inset-2 rounded-full bg-[#FFC145]/20 blur-xl transition-opacity group-hover:opacity-80 sm:opacity-50" />
        <DiyaIcon className="h-14 w-14 md:h-16 md:w-16" />
        <span className="mt-1 rounded-full bg-[#221238] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFC145] shadow-lg">
          10% off
        </span>
        {!reduce && (
          <motion.span
            className="pointer-events-none absolute -inset-3 rounded-full border-2 border-[#FFC145]/40"
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>

      {/* --------------------------------- popup ---------------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="diwali-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Diwali offer — extra 10% off on every package"
          >
            <div
              className="absolute inset-0 bg-[#12071f]/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 26, scale: 0.96 }}
              animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="relative my-auto w-full max-w-xl overflow-hidden rounded-[28px] border border-[#FFC145]/25 bg-[#221238] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
            >
              <Fireworks celebrate={celebrate} />

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close offer"
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative z-10 px-6 pb-8 pt-10 sm:px-9">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#FFC145]/30 bg-[#FFC145]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFC145]">
                  <Sparkles className="h-3.5 w-3.5" /> Diwali Dhamaka · Ends 8 Nov
                </span>

                <h2 className="mt-4 text-center text-3xl font-black leading-[1.08] tracking-tight text-[#FFF4E2] sm:text-4xl">
                  Extra{" "}
                  <span className="font-display inline-block align-baseline text-[3.2rem] leading-none text-[#FFC145] [text-shadow:0_0_28px_rgba(255,193,69,0.35)] sm:text-[4rem]">
                    10%
                  </span>{" "}
                  off
                  <span className="block">on every package.</span>
                </h2>

                <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-[#C9B4E9]">
                  Generate a personal coupon — one per email — and take an extra 10%
                  off any Urban Yatras package when you book before the offer ends.
                </p>

                {/* countdown */}
                <div className="mt-6">
                  <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9B4E9]">
                    Offer ends in
                  </p>
                  <div className="mt-3 flex gap-2.5 sm:gap-3">
                    {tiles.map((tile) => (
                      <div
                        key={tile.label}
                        className="min-w-[58px] flex-1 rounded-2xl border border-[#FFC145]/25 bg-white/[0.06] px-2 py-2.5 text-center"
                      >
                        {reduce ? (
                          <span className="block text-2xl font-black tabular-nums text-[#FFC145]">
                            {String(tile.value).padStart(2, "0")}
                          </span>
                        ) : (
                          <motion.span
                            key={tile.value}
                            initial={{ y: 6, opacity: 0.4 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            className="block text-2xl font-black tabular-nums text-[#FFC145]"
                          >
                            {String(tile.value).padStart(2, "0")}
                          </motion.span>
                        )}
                        <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#C9B4E9]">
                          {tile.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* social proof */}
                <div className="mt-5 flex items-center justify-center gap-3">
                  <div className="flex -space-x-2" aria-hidden="true">
                    {["#F27A21", "#FFC145", "#E2537E", "#C9B4E9"].map((color) => (
                      <span
                        key={color}
                        className="h-7 w-7 rounded-full border-2 border-[#221238]"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#FFF4E2]">
                    <strong className="font-black tabular-nums text-[#FFC145]">
                      {claimedCount}
                    </strong>{" "}
                    travellers have already availed this offer
                  </p>
                </div>

                {/* ------------------------------- ticket ------------------------------- */}
                <div className="relative mt-7 [filter:drop-shadow(0_18px_36px_rgba(0,0,0,0.45))]">
                  {revealDone && !reduce && (
                    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
                      {TICKET_SPARKS.map((spark, index) => (
                        <motion.span
                          key={index}
                          className="absolute left-1/2 top-[58%] h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: spark.c }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{ x: spark.dx, y: spark.dy, opacity: 0, scale: 0.4 }}
                          transition={{ duration: 0.9, delay: spark.t * 0.6, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                  )}

                  <div
                    className="rounded-[22px] bg-[#FFF4E2] px-5 py-5 sm:px-6"
                    style={{
                      maskImage:
                        "radial-gradient(circle 10px at left 58%, transparent 10px, black 10.5px), radial-gradient(circle 10px at right 58%, transparent 10px, black 10.5px)",
                      maskComposite: "intersect",
                      WebkitMaskImage:
                        "radial-gradient(circle 10px at left 58%, transparent 10px, black 10.5px), radial-gradient(circle 10px at right 58%, transparent 10px, black 10.5px)",
                    }}
                  >
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B4530F]">
                      <Ticket className="h-4 w-4" /> Urban Yatras · Diwali Coupon
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <span className="font-display text-4xl leading-none text-[#221238]">10%</span>
                      <span className="text-sm font-semibold text-[#221238]/70">extra off</span>
                      <span className="ml-auto rounded-full bg-[#F27A21]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C2410C]">
                        Till 8 Nov
                      </span>
                    </div>

                    <div className="relative my-4">
                      <div className="border-t border-dashed border-[#221238]/25" />
                    </div>

                    {revealDone ? (
                      <div aria-live="polite">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B4530F]">
                          {claim.status === "claimed"
                            ? "Your Diwali coupon is ready"
                            : "Coupon already generated for this email"}
                        </p>
                        {claim.status === "existing" && (
                          <p className="mt-1 text-xs text-[#221238]/60">
                            This email has already claimed its coupon — here it is again.
                          </p>
                        )}

                        <div className="mt-3 rounded-2xl bg-[#221238] px-4 py-3.5 text-center">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9B4E9]">
                            Coupon code
                          </p>
                          <p className="mt-1.5 font-display text-[clamp(1.5rem,5vw,2rem)] tracking-[0.12em] text-[#FFC145]">
                            {revealCode}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => copyCode(revealCode)}
                          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F27A21] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#e06512] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221238]"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" /> Copy code
                            </>
                          )}
                        </button>

                        <p className="mt-3 rounded-2xl border border-[#F27A21]/30 bg-[#F27A21]/10 px-4 py-3 text-center">
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F27A21] mb-1">
                            Book now with this coupon
                          </span>
                          <a
                            href="tel:+918860030886"
                            className="inline-flex items-center gap-2 rounded-full bg-[#221238] px-4 py-2 text-sm font-bold text-[#FFC145] hover:bg-[#F27A21] hover:text-white transition-colors"
                          >
                            <Phone className="w-4 h-4" /> Call travel advisor
                          </a>
                          <span className="block mt-1 text-[10px] text-[#C9B4E9]">
                            +91 8860030886 · Share your coupon code to avail the offer
                          </span>
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            setClaim({ status: "idle" });
                            setEmail("");
                            setCopied(false);
                          }}
                          className="mt-3 w-full text-xs font-semibold text-[#221238]/60 underline-offset-4 hover:text-[#221238] hover:underline"
                        >
                          Try another email
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={submit}>
                        <label
                          htmlFor="diwali-email"
                          className="block text-xs font-semibold text-[#221238]"
                        >
                          Email address
                        </label>
                        <div className="relative mt-1.5">
                          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#221238]/40" />
                          <input
                            id="diwali-email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => {
                              setEmail(event.target.value);
                              if (claim.status === "error") setClaim({ status: "idle" });
                            }}
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-[#221238]/15 bg-white py-3 pl-10 pr-4 text-sm text-[#221238] placeholder:text-[#221238]/35 focus:border-[#F27A21] focus:outline-none focus:ring-2 focus:ring-[#F27A21]/35"
                          />
                        </div>

                        <div aria-live="polite">
                          {claim.status === "error" && (
                            <p role="alert" className="mt-2 text-xs font-semibold text-[#C2410C]">
                              {claim.message}
                            </p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={claim.status === "loading"}
                          className="mt-3 w-full rounded-xl bg-[#F27A21] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#e06512] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {claim.status === "loading" ? "Generating…" : "Generate my coupon"}
                        </button>

                        <p className="mt-3 text-[11px] leading-relaxed text-[#221238]/55">
                          One coupon per email. Extra 10% off applies to all packages
                          when you book before 8 Nov 2026.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
