import { NextResponse } from "next/server";
import clientPromise, { memoryStore } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, branch, year, eventName, teamName, teamMembers, additionalInfo } = body;

    if (!name || !email || !eventName) {
      return NextResponse.json(
        { error: "Name, email, and event selection are required." },
        { status: 400 }
      );
    }

    const registrationDoc = {
      id: `reg-${Date.now()}`,
      eventName,
      name,
      email,
      phone: phone || "N/A",
      branch: branch || "N/A",
      year: year || "N/A",
      teamName: teamName || "Single Participant",
      teamMembers: teamMembers || "",
      additionalInfo: additionalInfo || "",
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
    };

    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db("iotronics");
        await db.collection("registrations").insertOne(registrationDoc);
      } catch (err) {
        console.warn("MongoDB connection fallback to memory store:", err);
        memoryStore.registrations.unshift(registrationDoc);
      }
    } else {
      memoryStore.registrations.unshift(registrationDoc);
    }

    return NextResponse.json({
      success: true,
      message: "YOU'RE IN. Registration confirmed.",
      data: registrationDoc,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db("iotronics");
        const registrations = await db
          .collection("registrations")
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        return NextResponse.json({ registrations });
      } catch (err) {
        console.warn("MongoDB fetch fallback:", err);
        return NextResponse.json({ registrations: memoryStore.registrations });
      }
    }
    return NextResponse.json({ registrations: memoryStore.registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json({ registrations: memoryStore.registrations });
  }
}
