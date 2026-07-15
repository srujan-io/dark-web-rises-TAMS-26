/**
 * Placeholder data — swap with API responses when backend is ready.
 * All values here are FRONTEND-ONLY demo state.
 */

import type { Challenge } from "@/components/dwr/ChallengeCard";
import type { LeaderboardEntry } from "@/components/dwr/Leaderboard";

export const currentTeam = {
  id: "TEAM-042",
  name: "Null_Pointer",
  members: [
    { id: "p1", name: "Aditi Rao", role: "Player 1" },
    { id: "p2", name: "Vikram Singh", role: "Player 2" },
    { id: "p3", name: "Neha Iyer", role: "Player 3" },
    { id: "p4", name: "Rohan Das", role: "Player 4" },
  ],
};

export const round1State = {
  currentImageSet: 2,
  totalImageSets: 5,
  currentPlayerIndex: 2, // 0-indexed
  totalPlayers: 4,
  score: 1_240,
  lastSimilarity: 0.78,
  lastPointsAwarded: 320,
};

export const round1Results = {
  score: 3_820,
  rank: 7,
  totalTeams: 32,
  status: "qualified" as const,
  breakdown: [
    { set: 1, similarity: 0.82, points: 820 },
    { set: 2, similarity: 0.71, points: 710 },
    { set: 3, similarity: 0.88, points: 880 },
    { set: 4, similarity: 0.65, points: 650 },
    { set: 5, similarity: 0.76, points: 760 },
  ],
};

export const round2Challenges: Challenge[] = [
  { id: "c1", title: "Whispers in the Wire", category: "Network", difficulty: "easy", status: "solved", points: 100, solves: 22 },
  { id: "c2", title: "Base of Operations", category: "Crypto", difficulty: "easy", status: "solved", points: 150, solves: 18 },
  { id: "c3", title: "The Broken Cipher", category: "Crypto", difficulty: "medium", status: "open", points: 300, solves: 9 },
  { id: "c4", title: "Ghost in the Machine", category: "Forensics", difficulty: "medium", status: "open", points: 350, solves: 6 },
  { id: "c5", title: "Reverse Engineered", category: "Reverse", difficulty: "hard", status: "open", points: 500, solves: 2 },
  { id: "c6", title: "Signal Lost", category: "Stego", difficulty: "hard", status: "locked", points: 500, solves: 0 },
  { id: "c7", title: "Kernel Panic", category: "Pwn", difficulty: "insane", status: "locked", points: 800, solves: 0 },
  { id: "c8", title: "The Final Firewall", category: "Web", difficulty: "insane", status: "locked", points: 1000, solves: 0 },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, teamId: "TEAM-007", teamName: "Segfault_Sirens", score: 6_420, round1: 4_120, round2: 2_300, status: "active" },
  { rank: 2, teamId: "TEAM-013", teamName: "Kernel_Kittens", score: 6_180, round1: 3_980, round2: 2_200, status: "active" },
  { rank: 3, teamId: "TEAM-021", teamName: "0xDEADBEEF", score: 5_910, round1: 3_760, round2: 2_150, status: "active" },
  { rank: 4, teamId: "TEAM-004", teamName: "Recursive_Rebels", score: 5_540, round1: 3_640, round2: 1_900, status: "active" },
  { rank: 5, teamId: "TEAM-018", teamName: "Buffer_Overload", score: 5_220, round1: 3_520, round2: 1_700, status: "active" },
  { rank: 6, teamId: "TEAM-029", teamName: "Bit_Benders", score: 4_890, round1: 3_390, round2: 1_500, status: "active" },
  { rank: 7, teamId: "TEAM-042", teamName: "Null_Pointer", score: 4_720, round1: 3_820, round2: 900, status: "active" },
  { rank: 8, teamId: "TEAM-011", teamName: "Race_Condition", score: 4_310, round1: 3_210, round2: 1_100, status: "active" },
  { rank: 9, teamId: "TEAM-035", teamName: "Syntax_Errors", score: 3_980, round1: 3_180, round2: 800, status: "active" },
  { rank: 10, teamId: "TEAM-002", teamName: "Void_Runners", score: 3_640, round1: 2_940, round2: 700, status: "active" },
];

export const adminTeams = [
  { id: "TEAM-007", name: "Segfault_Sirens", status: "live", progress: "R2 — 4/8", score: 6_420 },
  { id: "TEAM-013", name: "Kernel_Kittens", status: "live", progress: "R2 — 4/8", score: 6_180 },
  { id: "TEAM-021", name: "0xDEADBEEF", status: "live", progress: "R2 — 3/8", score: 5_910 },
  { id: "TEAM-042", name: "Null_Pointer", status: "live", progress: "R2 — 2/8", score: 4_720 },
  { id: "TEAM-011", name: "Race_Condition", status: "paused", progress: "R2 — 2/8", score: 4_310 },
  { id: "TEAM-055", name: "Off_By_One", status: "offline", progress: "R1 — 3/5", score: 1_820 },
] as const;
