"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps { onOpenDrawer: (eventTitle?: string) => void; }

export default function HeroSection({ onOpenDrawer }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 text-xs font-semibold tracking-[0.16em] text-stone-500">IOTRONICS · NMIT BENGALURU</p>
        <div className="relative grid items-end gap-10 lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-8">
            <h1 className="max-w-4xl font-display text-[clamp(4.7rem,12vw,10rem)] leading-[0.78] tracking-[-0.06em] text-[#1c1b1a]">We learn<br />by building.</h1>
            <p className="mt-10 max-w-sm text-base leading-7 text-stone-600">A student technical society at NMIT, shaped by curiosity, long lab days, and things made together.</p>
            <button onClick={() => onOpenDrawer("Nirmith '26 Hackathon")} className="mt-8 inline-flex items-center gap-3 border-b border-[#1c1b1a] pb-2 text-sm font-semibold transition-colors hover:border-[#d05a3c] hover:text-[#d05a3c]">Join us <ArrowDown className="h-4 w-4" /></button>
          </div>
          <motion.figure initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative lg:col-span-4 lg:mb-3">
            <div className="relative aspect-[16/11] overflow-hidden">
              <Image
                src="/images/team-members.png"
                alt="IoTronics students together at NMIT"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <figcaption className="pt-3 text-xs text-stone-500">The people behind IoTronics.</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
