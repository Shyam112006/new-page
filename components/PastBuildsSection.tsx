"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PastBuildsSection() {
  return <section id="lab" className="px-6 py-24 sm:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-12"><div className="lg:col-span-4"><p className="text-sm text-stone-500">Live from the lab</p><h2 className="mt-5 font-display text-6xl leading-[0.88] tracking-[-0.04em] sm:text-8xl">Made<br />together.</h2></div><div className="lg:col-span-7 lg:col-start-6"><motion.figure whileHover={{ scale: 1.01 }} className="relative"><div className="relative aspect-[16/8] overflow-hidden"><Image src="/images/team-members.png" alt="Students gathered at an IoTronics event" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" /></div></motion.figure><p className="mt-6 max-w-md text-base leading-8 text-stone-600">The work is only part of it. We show up for the shared experiments, the late fixes, and the satisfaction of seeing an idea take shape.</p></div></div></div></section>;
}
