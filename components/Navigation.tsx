"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
interface NavigationProps { onOpenDrawer: (eventTitle?: string) => void; }
export default function Navigation({ onOpenDrawer }: NavigationProps) {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-stone-300/70 bg-[#f5f2ec]/90 px-6 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between py-4"><Link href="/" className="font-display text-3xl tracking-[-0.04em]">IoTronics</Link><nav className="hidden gap-7 text-sm text-stone-600 md:flex"><a href="#activities" className="hover:text-[#1c1b1a]">Explore</a><a href="#lab" className="hover:text-[#1c1b1a]">From the lab</a><a href="#nirmith" className="hover:text-[#1c1b1a]">Nirmith &apos;26</a></nav><button onClick={() => onOpenDrawer()} className="hidden text-sm font-semibold md:block">Join us</button><button onClick={() => setOpen(!open)} className="md:hidden">{open ? <X /> : <Menu />}</button></div>{open && <div className="mx-auto max-w-7xl border-t border-stone-300/70 py-5 text-sm md:hidden"><div className="flex flex-col gap-4"><a onClick={() => setOpen(false)} href="#activities">Explore</a><a onClick={() => setOpen(false)} href="#lab">From the lab</a><button onClick={() => { setOpen(false); onOpenDrawer(); }} className="text-left font-semibold">Join us</button></div></div>}</header>;
}
