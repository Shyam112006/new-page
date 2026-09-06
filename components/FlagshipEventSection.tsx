"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface FlagshipEventSectionProps { onOpenDrawer: (eventTitle?: string) => void; }
export default function FlagshipEventSection({ onOpenDrawer }: FlagshipEventSectionProps) {
  return <section className="bg-[#1c1b1a] px-6 py-24 text-[#f5f2ec] sm:py-32"><div className="mx-auto max-w-7xl"><p className="text-sm text-stone-400">Nirmith &apos;26</p><div className="mt-8 grid items-end gap-10 lg:grid-cols-12"><div className="lg:col-span-7"><h2 className="font-display text-7xl leading-[0.8] tracking-[-0.05em] sm:text-9xl">Make your<br />idea real.</h2><p className="mt-8 max-w-md leading-8 text-stone-300">Nirmith is where ideas come out of notebooks and into the room. Come with a team, a question, or simply the urge to build.</p><button onClick={() => onOpenDrawer("Nirmith '26 Hackathon")} className="mt-9 inline-flex items-center gap-3 border-b border-[#f5f2ec] pb-2 text-sm font-semibold hover:text-[#e78b68]">Register for Nirmith &apos;26 <ArrowRight className="h-4 w-4" /></button></div><figure className="lg:col-span-4 lg:col-start-9"><div className="relative aspect-[4/3] overflow-hidden"><Image src="/images/award-ceremony.png" alt="IoTronics students at Nirmith" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" /></div></figure></div></div></section>;
}
