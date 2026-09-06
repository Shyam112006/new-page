"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function Signal() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const opacity = useTransform(progress, [0, 0.1, 0.85, 1], [0.35, 0.75, 0.75, 0.25]);
  const scaleY = useTransform(progress, [0, 0.4, 0.75, 1], [1.45, 1, 0.6, 0.25]);

  return <motion.div style={{ opacity }} className="pointer-events-none fixed inset-y-0 left-1/2 z-30 hidden w-px -translate-x-1/2 lg:block"><motion.svg style={{ scaleY }} viewBox="0 0 16 1000" preserveAspectRatio="none" className="h-full w-20 overflow-visible"><path d="M8 0 C-4 35 20 62 8 100 S-4 165 8 205 S20 270 8 310 S-4 375 8 415 S20 480 8 520 S-4 585 8 625 S20 690 8 730 S-4 795 8 835 S20 900 8 1000" fill="none" stroke="#d05a3c" strokeWidth="0.7" className="signal-path" /><path d="M8 430 L8 675" fill="none" stroke="#d05a3c" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 8" />{[470, 510, 550, 590, 630].map((y) => <circle key={y} cx="8" cy={y} r="2" fill="#d05a3c" />)}</motion.svg></motion.div>;
}
