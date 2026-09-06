import Link from "next/link";

export default function Footer() {
  return <footer className="border-t border-stone-300/70 px-6 py-14"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 sm:flex-row sm:items-end"><div><Link href="/" className="font-display text-5xl tracking-[-0.05em]">IoTronics</Link><p className="mt-4 max-w-sm text-sm leading-7 text-stone-500">A student technical society at NMIT.<br />Build. Experiment. Learn.</p></div><div className="text-sm leading-7 text-stone-500"><p>NMIT Bengaluru</p><a className="hover:text-[#1c1b1a]" href="mailto:iotronics@nmit.ac.in">iotronics@nmit.ac.in</a><p className="mt-5 text-xs">© {new Date().getFullYear()} IoTronics</p></div></div></footer>;
}
