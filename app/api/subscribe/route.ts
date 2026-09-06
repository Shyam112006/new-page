import { NextResponse } from "next/server";
import clientPromise, { memoryStore } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, branch, year } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const subscriberDoc = {
      id: `sub-${Date.now()}`,
      name: name || "Signal Subscriber",
      email,
      branch: branch || "N/A",
      year: year || "N/A",
      createdAt: new Date().toISOString(),
    };

    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db("iotronics");
        await db.collection("subscribers").insertOne(subscriberDoc);
      } catch (err) {
        console.warn("MongoDB connection fallback to memory store:", err);
        memoryStore.subscribers.unshift(subscriberDoc);
      }
    } else {
      memoryStore.subscribers.unshift(subscriberDoc);
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed to IoTronics Signal.",
      data: subscriberDoc,
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription." },
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
        const subscribers = await db
          .collection("subscribers")
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        return NextResponse.json({ subscribers });
      } catch (err) {
        console.warn("MongoDB fetch fallback:", err);
        return NextResponse.json({ subscribers: memoryStore.subscribers });
      }
    }
    return NextResponse.json({ subscribers: memoryStore.subscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json({ subscribers: memoryStore.subscribers });
  }
}
