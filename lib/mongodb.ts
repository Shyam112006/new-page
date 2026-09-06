import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (uri) {
    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  }
} else if (uri) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Server-side in-memory store fallback for instant testing when MONGODB_URI is not set
interface MemoryStore {
  registrations: Array<Record<string, unknown>>;
  subscribers: Array<Record<string, unknown>>;
}

const globalStore = global as typeof globalThis & {
  _iotronicsMemoryStore?: MemoryStore;
};

if (!globalStore._iotronicsMemoryStore) {
  globalStore._iotronicsMemoryStore = {
    registrations: [
      {
        id: "reg-1",
        eventName: "Nirmith '26 Hackathon",
        name: "Rounak Sharma",
        email: "rounak@nmit.ac.in",
        phone: "+91 80058 63350",
        branch: "EEE",
        year: "3rd Year",
        teamName: "CircuitBreakers",
        status: "CONFIRMED",
        createdAt: "2026-04-10T10:30:00Z",
      },
      {
        id: "reg-2",
        eventName: "Nirmith '26 Ideathon",
        name: "Rohit Kumar",
        email: "rohit@nmit.ac.in",
        phone: "+91 63549 59448",
        branch: "ECE",
        year: "4th Year",
        teamName: "IoT Innovators",
        status: "CONFIRMED",
        createdAt: "2026-04-12T14:15:00Z",
      },
    ],
    subscribers: [
      {
        id: "sub-1",
        name: "Aarav Patel",
        email: "aarav.ee@nmit.ac.in",
        branch: "EEE",
        year: "2nd Year",
        createdAt: "2026-03-01T08:00:00Z",
      },
      {
        id: "sub-2",
        name: "Ananya Rao",
        email: "ananya.cs@nmit.ac.in",
        branch: "CSE",
        year: "3rd Year",
        createdAt: "2026-03-05T12:20:00Z",
      },
    ],
  };
}

export const memoryStore = globalStore._iotronicsMemoryStore;
