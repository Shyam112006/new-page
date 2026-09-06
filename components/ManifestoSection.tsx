"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ManifestoSection() {
  return <section className="px-6 py-24 sm:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-5"><p className="text-sm text-stone-500">Real people, shared curiosity.</p><h2 className="mt-5 font-display text-6xl leading-[0.88] tracking-[-0.04em] sm:text-8xl">More hands,<br />more ideas.</h2></div><p className="max-w-md text-base leading-8 text-stone-600 lg:col-span-4 lg:col-start-8">IoTronics is a place for students to make, ask questions, share what went wrong, and try again. The best part is building alongside one another.</p></div><div className="mt-16 grid gap-5 md:grid-cols-12"><motion.figure whileHover={{ y: -5 }} className="md:col-span-8"><div className="relative aspect-[16/8] overflow-hidden"><Image src="/images/team-group.png" alt="IoTronics club group" fill sizes="(max-width: 768px) 100vw, 65vw" className="object-cover" /></div><figcaption className="mt-3 text-xs text-stone-500">A club made of students who enjoy the process.</figcaption></motion.figure><motion.figure whileHover={{ rotate: 1, y: -5 }} className="mt-10 md:col-span-4 md:mt-24"><div className="relative aspect-[4/3] overflow-hidden"><Image src="/images/award-ceremony.png" alt="IoTronics students at an event" fill sizes="(max-width: 768px) 100vw, 32vw" className="object-cover" /></div></motion.figure></div></div></section>;
}
