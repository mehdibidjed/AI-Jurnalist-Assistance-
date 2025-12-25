import { Pictures } from "../assets/Asset";

// DEBUG: Add this temporary line to see if the import is actually working
console.log("Pictures object:", Pictures);
export const newsCards = [
  {
    id: 1,
    category: "FAKE NEWS",
    label: "AI ALERT",
    title: "Viral Claim About Energy Crisis Proven False by AI Analysis",
    image: Pictures.FakeNews,
    type: "Fake",
    icon: "⚠️",
  },
  {
    id: 2,
    category: "TRENDY",
    label: "TRENDING NOW",
    title: "AI Journalism Tools Are Transforming Newsrooms Worldwide",
    image: Pictures.Trend,
    type: "Fake",
    icon: "📈",
  },
  {
    id: 3,
    category: "RECOMMENDED",
    label: "VERIFIED",
    title: "How AI Fact-Checking Improves Media Trust and Credibility",
    image: Pictures.Recommended,
    type: "Fake",
    icon: "🏅",
  },
];
export const newsList = {
  fake: [
    {
      id: 101,
      title: "Misleading Claim About Climate Policy Debunked",
      desc: "AI analysis reveals this viral claim contains false information and manipulated statistics...",
      tag: "FAKE NEWS",
      image: Pictures.FakeNews,
    },
    {
      id: 102,
      title: "Misleading Claim About Climate Policy Debunked",
      desc: "AI analysis reveals this viral claim contains false information and manipulated statistics...",
      tag: "FAKE NEWS",
      image: Pictures.FakeNews,
    },
    {
      id: 103,
      title: "Misleading Claim About Climate Policy Debunked",
      desc: "AI analysis reveals this viral claim contains false information and manipulated statistics...",
      tag: "FAKE NEWS",
      image: Pictures.FakeNews,
    },
  ],
  trendy: [
    {
      id: 201,
      title: "New AI Technology Revolutionizes Digital Media",
      desc: "This breakthrough in artificial intelligence is gaining massive attention across social platforms...",
      tag: "TRENDING",
      image:
        Pictures.Trend,
    },
    {
      id: 202,
      title: "New AI Technology Revolutionizes Digital Media",
      desc: "This breakthrough in artificial intelligence is gaining massive attention across social platforms...",
      tag: "TRENDING",
      image:
        Pictures.Trend,
    },
    {
      id: 203,
      title: "New AI Technology Revolutionizes Digital Media",
      desc: "This breakthrough in artificial intelligence is gaining massive attention across social platforms...",
      tag: "TRENDING",
      image:
        Pictures.Trend,
    },
  ],
  recommended:[
    {
      id: 201,
      title: "New AI Technology Revolutionizes Digital Media",
      desc: "This breakthrough in artificial intelligence is gaining massive attention across social platforms...",
      tag: "RECOMMENDED",
      image:
        Pictures.Recommended,
    },
    {
      id: 202,
      title: "New AI Technology Revolutionizes Digital Media",
      desc: "This breakthrough in artificial intelligence is gaining massive attention across social platforms...",
      tag: "RECOMMNENDED",
      image:
        Pictures.Recommended,
    },
    {
      id: 203,
      title: "New AI Technology Revolutionizes Digital Media",
      desc: "This breakthrough in artificial intelligence is gaining massive attention across social platforms...",
      tag: "RECOMMENDED",
      image:
        Pictures.Recommended, 
    },
  ]
};
// Using placeholder images for now. Replace with actual imports later if needed.
export const communityProfiles = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "USA",
    status: "Available", // or "In-Field"
    verified: true,
    rating: 4.9,
    stories: 127,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    skills: ["Conflict Zone", "OSINT", "Investigative"],
    equipment: [
      { type: "drone", label: "4K Drone" },
      { type: "phone", label: "Satellite Phone" }
    ]
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    location: "Algeria",
    status: "In-Field",
    verified: true,
    rating: 4.8,
    stories: 98,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    skills: ["Political Analyst", "Arabic", "MENA Region"],
    equipment: [
      { type: "camera", label: "4K Camera" },
      { type: "mic", label: "Audio Kit" }
    ]
  },
  {
    id: 3,
    name: "Marie Dubois",
    location: "France",
    status: "Available",
    verified: true,
    rating: 4.7,
    stories: 156,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    skills: ["Documentary", "Environmental", "EU Politics"],
    equipment: [
      { type: "drone", label: "4K Drone" },
      { type: "water", label: "Underwater Cam" }
    ]
  },
  // Add more profiles as needed to fill the grid...
];
export const jobPostings = [
  {
    id: 1,
    type: 'video',
    title: "Need 5-minute video montage for protest footage",
    desc: "Looking for an experienced video editor to create a compelling montage from 2 hours of raw footage.",
    price: 450,
    duration: "3 days",
    rating: "4.9/5"
  },
  {
    id: 2,
    type: 'photo',
    title: "Photo series color correction and enhancement",
    desc: "15 RAW photos from a humanitarian crisis that need professional color grading and enhancement.",
    price: 200,
    duration: "2 days",
    rating: "4.6/5"
  },
  {
    id: 3,
    type: 'audio',
    title: "Audio cleanup for interview recording",
    desc: "Remove background noise from field interview recorded in challenging conditions.",
    price: 150,
    duration: "1 day",
    rating: "5/5"
  },
  {
    id: 4,
    type: 'video',
    title: "Documentary footage editing - 20min segment",
    desc: "Edit raw footage into a cohesive 20-minute documentary segment with transitions and music.",
    price: 800,
    duration: "5 days",
    rating: "5/5"
  }
];