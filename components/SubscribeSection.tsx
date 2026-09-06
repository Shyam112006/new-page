"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function SubscribeSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("EEE");
  const [year, setYear] = useState("3rd Year");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, branch, year }),
      });

      if (res.ok) {
        setSubmitted(true);
        try {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
        } catch {
          // Ignore canvas confetti errors if unmounted
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full py-28 bg-[#ECEAE4] border-b border-[#C8C4BC]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Outer frame — architectural border box */}
        <div className="border border-[#121214] bg-[#E5E2DC] p-8 sm:p-14 relative">
          {/* Corner tag */}
          <div className="absolute top-0 right-0 translate-x-px -translate-y-px bg-[#121214] text-[#E5E2DC] font-mono text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
            SIGNAL_FEED_V1.0
          </div>

          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <p className="font-mono text-xs text-[#52525B] uppercase tracking-widest">
              05 // COMMUNITY DISPATCH
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-[#121214]">
              STAY CONNECTED<span className="text-[#FF4D00]">.</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#52525B]">
              Workshops. Builds. Competitions. <br className="hidden sm:inline" />
              The occasional beautiful mistake.
            </p>
          </div>

          {submitted ? (
            <div className="mt-10 p-8 border border-[#C8C4BC] bg-[#ECEAE4] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#FF4D00] mx-auto" />
              <h3 className="font-display text-2xl font-bold text-[#121214] uppercase">
                YOU&apos;RE ON THE SIGNAL STREAM.
              </h3>
              <p className="font-mono text-xs text-[#52525B]">
                Confirmation dispatch sent to <span className="text-[#121214] font-bold">{email}</span>.{" "}
                See you at Room 302, F Block.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#52525B] uppercase mb-2 tracking-widest">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rounak Sharma"
                    className="w-full px-4 py-3 bg-[#ECEAE4] border border-[#C8C4BC] focus:border-[#121214] text-[#121214] font-mono text-sm outline-none transition-colors placeholder:text-[#A8A4A0]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#52525B] uppercase mb-2 tracking-widest">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@nmit.ac.in"
                    className="w-full px-4 py-3 bg-[#ECEAE4] border border-[#C8C4BC] focus:border-[#121214] text-[#121214] font-mono text-sm outline-none transition-colors placeholder:text-[#A8A4A0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#52525B] uppercase mb-2 tracking-widest">
                    BRANCH / DEPT
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-4 py-3 bg-[#ECEAE4] border border-[#C8C4BC] focus:border-[#121214] text-[#121214] font-mono text-sm outline-none transition-colors"
                  >
                    <option value="EEE">EEE (Electrical &amp; Electronics)</option>
                    <option value="ECE">ECE (Electronics &amp; Comm)</option>
                    <option value="CSE">CSE (Computer Science)</option>
                    <option value="ISE">ISE (Info Science)</option>
                    <option value="AIML">AI &amp; ML</option>
                    <option value="MECH">Mechanical Engg</option>
                    <option value="OTHER">Other Branch</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#52525B] uppercase mb-2 tracking-widest">
                    ACADEMIC YEAR
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3 bg-[#ECEAE4] border border-[#C8C4BC] focus:border-[#121214] text-[#121214] font-mono text-sm outline-none transition-colors"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-[#121214] hover:bg-[#FF4D00] text-[#E5E2DC] hover:text-[#121214] font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    CONNECTING TO SIGNAL...
                  </>
                ) : (
                  <>
                    JOIN THE SIGNAL
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
