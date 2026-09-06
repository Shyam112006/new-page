"use client";

import { motion } from "framer-motion";

const explorations = ["Workshops", "Projects", "Hackathons", "Competitions"];
export default function ActivitiesSection() {
  return <section id="activities" className="bg-[#e9e4dc] px-6 py-24 sm:py-32"><div className="mx-auto max-w-7xl"><p className="text-sm text-stone-500">What we explore</p><div className="mt-10 grid gap-10 lg:grid-cols-12"><h2 className="font-display text-6xl leading-[0.88] tracking-[-0.04em] sm:text-8xl lg:col-span-6">There&apos;s always<br />something to try.</h2><div className="lg:col-span-5 lg:col-start-8"><p className="mb-10 max-w-sm leading-7 text-stone-600">We come together around ideas that need a little patience, a little practice, and a lot of conversation.</p><div className="border-t border-stone-400/60">{explorations.map((item, index) => <motion.div key={item} whileHover={{ x: 8 }} className="flex items-center justify-between border-b border-stone-400/60 py-5"><span className="font-display text-4xl">{item}</span><span className="text-sm text-stone-500">0{index + 1}</span></motion.div>)}</div></div></div></div></section>;
}
