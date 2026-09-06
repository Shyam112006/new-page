import { NextResponse } from "next/server";
import { memoryStore } from "@/lib/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "registrations";

  if (type === "subscribers") {
    const data = memoryStore.subscribers;
    const header = "ID,Name,Email,Branch,Year,Date\n";
    const rows = data
      .map(
        (s) =>
          `"${s.id}","${s.name}","${s.email}","${s.branch}","${s.year}","${s.createdAt}"`
      )
      .join("\n");

    return new Response(header + rows, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="iotronics-subscribers-${Date.now()}.csv"`,
      },
    });
  }

  const data = memoryStore.registrations;
  const header =
    "ID,Event,Name,Email,Phone,Branch,Year,Team,Status,Date\n";
  const rows = data
    .map(
      (r) =>
        `"${r.id}","${r.eventName}","${r.name}","${r.email}","${r.phone}","${r.branch}","${r.year}","${r.teamName}","${r.status}","${r.createdAt}"`
    )
    .join("\n");

  return new Response(header + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="iotronics-registrations-${Date.now()}.csv"`,
    },
  });
}
