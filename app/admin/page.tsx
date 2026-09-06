"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RegistrationDrawer from "@/components/RegistrationDrawer";
import {
  Users,
  UserCheck,
  Download,
  Search,
  Lock,
  Unlock,
  RefreshCw,
  SlidersHorizontal,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";

interface RegistrationRow {
  id: string;
  eventName: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  year: string;
  teamName: string;
  status: string;
  createdAt: string;
}

interface SubscriberRow {
  id: string;
  name: string;
  email: string;
  branch: string;
  year: string;
  createdAt: string;
}

export default function AdminControlRoom() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState(false);

  const [activeTab, setActiveTab] = useState<"registrations" | "subscribers">("registrations");
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("ALL");
  const [eventFilter, setEventFilter] = useState("ALL");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [regRes, subRes] = await Promise.all([
        fetch("/api/register"),
        fetch("/api/subscribe"),
      ]);
      const regData = await regRes.json();
      const subData = await subRes.json();
      setRegistrations(regData.registrations || []);
      setSubscribers(subData.subscribers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (["nmit2026", "admin", "iotronics"].includes(passcode.trim())) {
      setIsAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.teamName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = branchFilter === "ALL" || r.branch === branchFilter;
    const matchesEvent = eventFilter === "ALL" || r.eventName === eventFilter;
    return matchesSearch && matchesBranch && matchesEvent;
  });

  const filteredSubscribers = subscribers.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = branchFilter === "ALL" || s.branch === branchFilter;
    return matchesSearch && matchesBranch;
  });

  const handleExportCSV = (type: "registrations" | "subscribers") => {
    window.open(`/api/admin/export?type=${type}`, "_blank");
  };

  // Shared input style for the data section (dark contrast for legibility)
  const tableInputClass =
    "w-full px-3 py-2.5 bg-[#0F0F11] border border-[#2A2A2E] text-[#E5E2DC] font-mono text-xs outline-none focus:border-[#FF4D00] transition-colors";

  return (
    <div className="min-h-screen bg-[#E5E2DC] text-[#121214] flex flex-col justify-between selection:bg-[#121214] selection:text-[#E5E2DC]">
      <Navigation onOpenDrawer={() => setIsDrawerOpen(true)} />

      <main className="flex-1">
        {/* Top Control Room Header — stone paper */}
        <section className="py-12 bg-[#E5E2DC] border-b border-[#C8C4BC]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#FF4D00] mb-1">
                  <span className="h-2 w-2 rounded-full bg-[#FF4D00] animate-ping" />
                  <span className="uppercase tracking-widest">INTERNAL_ADMINISTRATION</span>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#121214]">
                  IOTRONICS / CONTROL ROOM<span className="text-[#FF4D00]">.</span>
                </h1>
              </div>

              {isAuthenticated && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchData}
                    disabled={loading}
                    className="p-2.5 border border-[#C8C4BC] text-[#52525B] hover:text-[#121214] hover:border-[#121214] transition-colors"
                    title="Refresh Data"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#FF4D00]" : ""}`} />
                  </button>
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="px-4 py-2 border border-[#C8C4BC] font-mono text-xs text-[#52525B] hover:text-[#121214] hover:border-[#121214] flex items-center gap-2 transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#FF4D00]" />
                    LOCK SESSION
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {!isAuthenticated ? (
          /* Authentication Screen — stone paper */
          <section className="py-24 bg-[#ECEAE4]">
            <div className="max-w-md mx-auto px-6">
              <div className="border border-[#121214] bg-[#E5E2DC] p-8 space-y-6">
                {/* Corner tag */}
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 border border-[#121214] bg-[#121214] flex items-center justify-center mx-auto text-[#E5E2DC]">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#121214] uppercase">
                    AUTHENTICATION REQUIRED
                  </h2>
                  <p className="font-mono text-xs text-[#52525B]">
                    Enter admin passkey to access registrations &amp; subscriber metrics.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {passError && (
                    <div className="p-3 border border-red-400 bg-red-50 text-red-700 font-mono text-xs text-center">
                      ⚠️ Invalid passcode. (Default: nmit2026)
                    </div>
                  )}

                  <div>
                    <label className="block font-mono text-xs text-[#52525B] uppercase mb-2 tracking-widest">
                      PASSKEY
                    </label>
                    <input
                      type="password"
                      required
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter passkey (e.g. nmit2026)..."
                      className="w-full px-4 py-3 bg-[#ECEAE4] border border-[#C8C4BC] focus:border-[#121214] text-[#121214] font-mono text-sm outline-none transition-colors placeholder:text-[#A8A4A0]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#121214] text-[#E5E2DC] font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#FF4D00] hover:text-[#121214] transition-all flex items-center justify-center gap-2"
                  >
                    UNLOCK CONTROL ROOM
                    <Unlock className="w-4 h-4" />
                  </button>
                </form>

                <div className="text-center pt-2 font-mono text-[11px] text-[#52525B]">
                  Default Demo Passkey: <code className="text-[#121214] font-bold">nmit2026</code>
                </div>
              </div>
            </div>
          </section>
        ) : (
          /* Admin Dashboard — dark contrast tables for data readability */
          <section className="py-12 bg-[#0F0F11]">
            <div className="max-w-7xl mx-auto px-6 space-y-10">
              {/* Overview Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
                <div className="p-6 bg-[#161618] border border-[#2A2A2E] space-y-2">
                  <div className="flex items-center justify-between text-[#52525B] text-xs">
                    <span>REGISTRATIONS</span>
                    <UserCheck className="w-4 h-4 text-[#FF4D00]" />
                  </div>
                  <p className="font-display font-bold text-4xl text-[#E5E2DC]">
                    {registrations.length}
                  </p>
                  <p className="text-[11px] text-[#FF4D00]">Confirmed Attendees</p>
                </div>

                <div className="p-6 bg-[#161618] border border-[#2A2A2E] space-y-2">
                  <div className="flex items-center justify-between text-[#52525B] text-xs">
                    <span>SUBSCRIBERS</span>
                    <Users className="w-4 h-4 text-[#FF4D00]" />
                  </div>
                  <p className="font-display font-bold text-4xl text-[#E5E2DC]">
                    {subscribers.length}
                  </p>
                  <p className="text-[11px] text-[#FF4D00]">Signal Email Subscribers</p>
                </div>

                <div className="p-6 bg-[#161618] border border-[#2A2A2E] space-y-2">
                  <div className="flex items-center justify-between text-[#52525B] text-xs">
                    <span>NIRMITH &apos;26 HACKATHON</span>
                    <Calendar className="w-4 h-4 text-[#FF4D00]" />
                  </div>
                  <p className="font-display font-bold text-4xl text-[#E5E2DC]">
                    {registrations.filter((r) => r.eventName.includes("Hackathon")).length}
                  </p>
                  <p className="text-[11px] text-[#52525B]">24-Hr Hardware Sprint</p>
                </div>

                <div className="p-6 bg-[#161618] border border-[#2A2A2E] space-y-2">
                  <div className="flex items-center justify-between text-[#52525B] text-xs">
                    <span>NIRMITH &apos;26 IDEATHON</span>
                    <Layers className="w-4 h-4 text-[#FF4D00]" />
                  </div>
                  <p className="font-display font-bold text-4xl text-[#E5E2DC]">
                    {registrations.filter((r) => r.eventName.includes("Ideathon")).length}
                  </p>
                  <p className="text-[11px] text-[#52525B]">National Stage</p>
                </div>
              </div>

              {/* Data Table Panel */}
              <div className="border border-[#2A2A2E] bg-[#161618] p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2A2A2E] font-mono text-xs">
                  {/* Tab Selectors */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab("registrations")}
                      className={`px-5 py-2.5 border transition-colors ${
                        activeTab === "registrations"
                          ? "border-[#FF4D00] text-[#121214] bg-[#FF4D00] font-bold"
                          : "border-[#2A2A2E] text-[#52525B] hover:text-[#E5E2DC]"
                      }`}
                    >
                      REGISTRATIONS ({filteredRegistrations.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("subscribers")}
                      className={`px-5 py-2.5 border transition-colors ${
                        activeTab === "subscribers"
                          ? "border-[#FF4D00] text-[#121214] bg-[#FF4D00] font-bold"
                          : "border-[#2A2A2E] text-[#52525B] hover:text-[#E5E2DC]"
                      }`}
                    >
                      SUBSCRIBERS ({filteredSubscribers.length})
                    </button>
                  </div>

                  {/* Export */}
                  <button
                    onClick={() => handleExportCSV(activeTab)}
                    className="px-5 py-2.5 bg-[#0F0F11] border border-[#2A2A2E] text-[#52525B] hover:text-[#E5E2DC] hover:border-[#FF4D00] transition-colors flex items-center gap-2 font-mono text-xs"
                  >
                    <Download className="w-4 h-4 text-[#FF4D00]" />
                    EXPORT {activeTab.toUpperCase()} CSV
                  </button>
                </div>

                {/* Filter Toolbar */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 font-mono text-xs">
                  <div className="md:col-span-6 relative">
                    <Search className="w-4 h-4 text-[#52525B] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, email, team name..."
                      className={`${tableInputClass} pl-10`}
                    />
                  </div>

                  <div className="md:col-span-3 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#52525B] shrink-0" />
                    <select
                      value={branchFilter}
                      onChange={(e) => setBranchFilter(e.target.value)}
                      className={`${tableInputClass} flex-1`}
                    >
                      <option value="ALL">All Branches</option>
                      <option value="EEE">EEE</option>
                      <option value="ECE">ECE</option>
                      <option value="CSE">CSE</option>
                      <option value="ISE">ISE</option>
                      <option value="AIML">AIML</option>
                    </select>
                  </div>

                  {activeTab === "registrations" && (
                    <div className="md:col-span-3">
                      <select
                        value={eventFilter}
                        onChange={(e) => setEventFilter(e.target.value)}
                        className={tableInputClass}
                      >
                        <option value="ALL">All Events</option>
                        <option value="Nirmith '26 Hackathon">Nirmith &apos;26 Hackathon</option>
                        <option value="Nirmith '26 Ideathon">Nirmith &apos;26 Ideathon</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto border border-[#2A2A2E]">
                  {activeTab === "registrations" ? (
                    <table className="w-full text-left font-mono text-xs">
                      <thead className="bg-[#0F0F11] text-[#52525B] border-b border-[#2A2A2E]">
                        <tr>
                          <th className="p-4 uppercase tracking-widest">EVENT</th>
                          <th className="p-4 uppercase tracking-widest">ATTENDEE NAME</th>
                          <th className="p-4 uppercase tracking-widest">EMAIL</th>
                          <th className="p-4 uppercase tracking-widest">PHONE</th>
                          <th className="p-4 uppercase tracking-widest">BRANCH &amp; YEAR</th>
                          <th className="p-4 uppercase tracking-widest">TEAM NAME</th>
                          <th className="p-4 uppercase tracking-widest">STATUS</th>
                          <th className="p-4 uppercase tracking-widest">DATE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2A2A2E]">
                        {filteredRegistrations.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="p-8 text-center text-[#52525B]">
                              NO REGISTRATION RECORDS FOUND.
                            </td>
                          </tr>
                        ) : (
                          filteredRegistrations.map((row) => (
                            <tr key={row.id} className="hover:bg-[#0F0F11] transition-colors">
                              <td className="p-4 font-semibold text-[#FF4D00]">{row.eventName}</td>
                              <td className="p-4 text-[#E5E2DC] font-bold">{row.name}</td>
                              <td className="p-4 text-[#A8A4A0]">{row.email}</td>
                              <td className="p-4 text-[#52525B]">{row.phone}</td>
                              <td className="p-4 text-[#52525B]">
                                {row.branch} · {row.year}
                              </td>
                              <td className="p-4 text-[#A8A4A0]">{row.teamName}</td>
                              <td className="p-4">
                                <span className="inline-flex items-center gap-1 text-[#FF4D00] font-bold">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  {row.status}
                                </span>
                              </td>
                              <td className="p-4 text-[#52525B] text-[11px]">
                                {new Date(row.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left font-mono text-xs">
                      <thead className="bg-[#0F0F11] text-[#52525B] border-b border-[#2A2A2E]">
                        <tr>
                          <th className="p-4 uppercase tracking-widest">SUBSCRIBER NAME</th>
                          <th className="p-4 uppercase tracking-widest">EMAIL ADDRESS</th>
                          <th className="p-4 uppercase tracking-widest">BRANCH</th>
                          <th className="p-4 uppercase tracking-widest">YEAR</th>
                          <th className="p-4 uppercase tracking-widest">SUBSCRIBED DATE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2A2A2E]">
                        {filteredSubscribers.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-[#52525B]">
                              NO SIGNAL SUBSCRIBERS FOUND.
                            </td>
                          </tr>
                        ) : (
                          filteredSubscribers.map((sub) => (
                            <tr key={sub.id} className="hover:bg-[#0F0F11] transition-colors">
                              <td className="p-4 text-[#E5E2DC] font-bold">{sub.name}</td>
                              <td className="p-4 text-[#A8A4A0]">{sub.email}</td>
                              <td className="p-4 text-[#52525B]">{sub.branch}</td>
                              <td className="p-4 text-[#52525B]">{sub.year}</td>
                              <td className="p-4 text-[#52525B] text-[11px]">
                                {new Date(sub.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <RegistrationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
