"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface RegistrationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEvent?: string;
}

export default function RegistrationDrawer({
  isOpen,
  onClose,
  defaultEvent = "Nirmith '26 Hackathon",
}: RegistrationDrawerProps) {
  const [eventName, setEventName] = useState(defaultEvent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("EEE");
  const [year, setYear] = useState("3rd Year");
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (defaultEvent) {
      setEventName(defaultEvent);
    }
  }, [defaultEvent]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName,
          name,
          email,
          phone,
          branch,
          year,
          teamName,
          teamMembers,
          additionalInfo,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        try {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch {
          // Ignore canvas errors
        }
      } else {
        setErrorMsg(data.error || "Failed to submit registration.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-[#ECEAE4] border border-[#C8C4BC] focus:border-[#121214] text-[#121214] font-mono text-sm outline-none transition-colors placeholder:text-[#A8A4A0]";
  const labelClass = "block font-mono text-xs text-[#52525B] uppercase mb-1.5 tracking-widest";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#121214]/70 backdrop-blur-sm flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-xl bg-[#E5E2DC] border-l border-[#121214] h-full overflow-y-auto flex flex-col justify-between shadow-2xl">
        <div className="p-6 sm:p-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#C8C4BC]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF4D00]">
              <span className="h-2 w-2 rounded-full bg-[#FF4D00] animate-pulse" />
              <span className="uppercase tracking-widest">REGISTRATION_PROTOCOL_V1</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#52525B] hover:text-[#121214] hover:bg-[#D8D4CC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {success ? (
            <div className="py-16 text-center space-y-6">
              <div className="w-16 h-16 border border-[#FF4D00] flex items-center justify-center mx-auto text-[#FF4D00]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-4xl font-bold text-[#121214] uppercase tracking-tight">
                  YOU&apos;RE IN<span className="text-[#FF4D00]">.</span>
                </h3>
                <p className="font-sans text-base text-[#52525B]">
                  Your registration for{" "}
                  <span className="text-[#121214] font-semibold">{eventName}</span> has been confirmed.
                </p>
                <p className="font-mono text-xs text-[#52525B] pt-2">
                  Confirmation sent to <span className="text-[#121214]">{email}</span>.
                </p>
              </div>
              <button
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="mt-6 px-8 py-3 bg-[#121214] text-[#E5E2DC] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#FF4D00] hover:text-[#121214] transition-all"
              >
                RETURN TO WEBSITE
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="font-mono text-xs text-[#52525B] uppercase tracking-widest">
                  NMIT BENGALURU // EVENT ENTRY
                </p>
                <h3 className="font-display text-3xl font-bold text-[#121214] uppercase tracking-tight">
                  REGISTER FOR {eventName.toUpperCase()}
                </h3>
              </div>

              {errorMsg && (
                <div className="p-3 border border-red-400 bg-red-50 text-red-700 font-mono text-xs">
                  ⚠️ {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelClass}>SELECT EVENT / TRACK *</label>
                  <select
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Nirmith '26 Hackathon">Nirmith &apos;26 Hackathon (28th April, 5 PM)</option>
                    <option value="Nirmith '26 Ideathon">Nirmith &apos;26 Ideathon (28th April, 9:15 AM)</option>
                    <option value="Both Hackathon & Ideathon">Both Hackathon &amp; Ideathon</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>FULL NAME *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rounak Sharma"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rounak@nmit.ac.in"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>PHONE NUMBER *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 80058 63350"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>BRANCH / DEPARTMENT *</label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className={inputClass}
                    >
                      <option value="EEE">EEE (Electrical &amp; Electronics)</option>
                      <option value="ECE">ECE (Electronics &amp; Comm)</option>
                      <option value="CSE">CSE (Computer Science)</option>
                      <option value="ISE">ISE (Info Science)</option>
                      <option value="AIML">AI &amp; ML</option>
                      <option value="MECH">Mechanical Engg</option>
                      <option value="EXTERNAL">External Institute</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>ACADEMIC YEAR *</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className={inputClass}
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>TEAM NAME (IF ANY)</label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="CircuitBreakers"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>TEAM MEMBERS &amp; ROLES</label>
                  <textarea
                    rows={2}
                    value={teamMembers}
                    onChange={(e) => setTeamMembers(e.target.value)}
                    placeholder="Member 1 (Hardware), Member 2 (Firmware)..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>PROJECT IDEA / ADDITIONAL INFO</label>
                  <textarea
                    rows={2}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Brief description of hardware tools or idea..."
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#121214] hover:bg-[#FF4D00] hover:text-[#121214] text-[#E5E2DC] font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      SUBMITTING REGISTRATION...
                    </>
                  ) : (
                    <>
                      CONFIRM REGISTRATION
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="px-6 sm:px-10 py-4 border-t border-[#C8C4BC] font-mono text-[11px] text-[#52525B] flex items-center justify-between bg-[#ECEAE4]">
          <span>IOTRONICS NMIT</span>
          <span>ROOM 302, F BLOCK</span>
        </div>
      </div>
    </div>
  );
}
