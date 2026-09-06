"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps { onOpenDrawer: (eventTitle?: string) => void; }

export default function Navigation({ onOpenDrawer }: NavigationProps) {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-stone-300/70 bg-[#f5f2ec]/90 px-6 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between py-4"><Link href="/" className="font-display text-3xl tracking-[-0.04em]">IoTronics</Link><nav className="hidden items-center gap-7 text-sm text-stone-600 md:flex"><Link href="/" className="hover:text-[#1c1b1a]">Home</Link><Link href="/events" className="hover:text-[#1c1b1a]">Events</Link><button onClick={() => onOpenDrawer()} className="font-semibold text-[#1c1b1a]">Join us</button></nav><button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button></div>{open && <nav className="mx-auto max-w-7xl border-t border-stone-300/70 py-5 text-sm md:hidden"><div className="flex flex-col gap-4"><Link href="/" onClick={() => setOpen(false)}>Home</Link><Link href="/events" onClick={() => setOpen(false)}>Events</Link><button onClick={() => { setOpen(false); onOpenDrawer(); }} className="text-left font-semibold">Join us</button></div></nav>}</header>;
}
