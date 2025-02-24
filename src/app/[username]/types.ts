export type User = {
  username: string;
  displayName: string;
  profileImageUrl: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  interests: string[];
  goals: string[];
  badges: { id: string; name: string; description: string }[];
  recentLogs: { id: string; title: string; content: string; date: string; learningTime: number }[];
  learningContributions: { date: string; count: number }[];
  totalLearningDays: number;
  totalLearningTime: number;
  averageLearningTimePerDay: number;
  longestStreak: number;
};
