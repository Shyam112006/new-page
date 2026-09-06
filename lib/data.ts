export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: "IDEATHON" | "HACKATHON" | "WORKSHOP" | "EXHIBITION";
  date: string;
  time: string;
  venue: string;
  prizePool: string;
  description: string;
  longDescription: string;
  image: string;
  unstopLink?: string;
  tracks?: string[];
  status: "UPCOMING" | "LIVE" | "COMPLETED";
}

export interface ActivityItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
}

export interface PastBuildItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  highlights: string[];
}

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "nirmith-ideathon-2026",
    title: "Nirmith '26 Ideathon",
    subtitle: "National-Level Hardware & Systems Ideathon",
    category: "IDEATHON",
    date: "28th April 2026",
    time: "9:15 AM - 5:00 PM",
    venue: "Seminar Hall, F Block, NMIT Bengaluru",
    prizePool: "₹50,000",
    description:
      "Bring together innovators from across India to pitch groundbreaking solutions at the intersection of IoT, Embedded Systems, and AI.",
    longDescription:
      "Nirmith '26 Ideathon is NMIT's premier national-level problem-solving stage. Participants present architectural blueprints, circuit designs, and system flows to a panel of hardware industry experts and academic veterans.",
    image: "/images/award-ceremony.png",
    unstopLink: "https://unstop.com",
    tracks: ["Smart Cities & Automation", "Healthcare Electronics", "Agritech & Robotics", "Open Innovation"],
    status: "UPCOMING",
  },
  {
    id: "nirmith-hackathon-2026",
    title: "Nirmith '26 Hackathon",
    subtitle: "24-Hour Execution-Focused Hardware & Software Sprint",
    category: "HACKATHON",
    date: "28th April 2026",
    time: "5:00 PM Onwards",
    venue: "EEE Dept & IoT Labs, NMIT Bengaluru",
    prizePool: "₹1,00,000",
    description:
      "National-level execution-focused competition with parallel Hardware & Software tracks to build physical prototypes from scratch.",
    longDescription:
      "A high-octane 24-hour buildathon where teams design PCBs, program microcontrollers (ESP32, STM32, Raspberry Pi), connect cloud telemetry, and demonstrate working physical systems before live hardware testing benches.",
    image: "/images/team-members.png",
    unstopLink: "https://unstop.com",
    tracks: ["Hardware Track (Embedded Systems & IoT)", "Software Track (Firmware & Sensor Analytics)"],
    status: "UPCOMING",
  },
];

export const ACTIVITIES: ActivityItem[] = [
  {
    id: "workshops",
    number: "01",
    title: "WORKSHOPS",
    tagline: "Hands-on soldering, PCB design & microcontrollers",
    description:
      "From zero to firmware: practical bootcamps covering KiCAD circuit design, ESP32 RTOS, sensor interfacing, and MQTT networking.",
    image: "/images/team-group.png",
  },
  {
    id: "projects",
    number: "02",
    title: "PROJECTS",
    tagline: "Student-led hardware & autonomous systems",
    description:
      "Building real-world physical systems: smart energy grids, autonomous drones, environmental monitoring nodes, and robotic manipulators.",
    image: "/images/team-members.png",
  },
  {
    id: "hackathons",
    number: "03",
    title: "HACKATHONS",
    tagline: "24-hour sprints with real sensors and scope probes",
    description:
      "High-stakes engineering marathons where code meets copper: real-time telemetry, hardware debugging, and rapid prototyping under deadline pressure.",
    image: "/images/award-ceremony.png",
  },
  {
    id: "competitions",
    number: "04",
    title: "COMPETITIONS",
    tagline: "Representing NMIT at national innovation forums",
    description:
      "Pitting our systems against top technical institutes across India in robotics arenas, embedded design challenges, and IoT expos.",
    image: "/images/team-group.png",
  },
];

export const PAST_BUILDS: PastBuildItem[] = [
  {
    id: "nirmith-25",
    title: "Nirmith '25 Hardware Expo & Hackathon",
    category: "NATIONAL EVENT",
    date: "April 2025",
    image: "/images/team-group.png",
    highlights: ["450+ Student Participants", "35 Working Prototypes", "National Jury Award"],
  },
  {
    id: "award-ceremony-25",
    title: "State Robotics & Innovation Championship",
    category: "COMPETITION WINNERS",
    date: "November 2025",
    image: "/images/award-ceremony.png",
    highlights: ["1st Place Hardware Design", "Best Embedded Code Award"],
  },
  {
    id: "iot-bootcamp",
    title: "ESP32 & LoRaWAN Wireless Mesh Bootcamp",
    category: "HANDS-ON WORKSHOP",
    date: "February 2026",
    image: "/images/team-members.png",
    highlights: ["120+ Trainees", "15 Wireless Sensor Nodes Deployed"],
  },
];
