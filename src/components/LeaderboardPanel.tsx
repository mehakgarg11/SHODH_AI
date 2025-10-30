import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Loader2 } from 'lucide-react';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  time: string;
  submissions: number;
}

interface LeaderboardPanelProps {
  contestId: string;
  compact?: boolean;
}

// Mock leaderboard data generator
const generateLeaderboard = (): LeaderboardEntry[] => {
  const names = [
    'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 
    'Henry', 'Isabella', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 
    'Olivia', 'Peter', 'Quinn', 'Rachel', 'Sam', 'Tara'
  ];
  
  return names.map((name, index) => ({
    rank: index + 1,
    username: name,
    score: Math.max(0, 500 - index * 25 + Math.floor(Math.random() * 30)),
    time: `${Math.floor(Math.random() * 59)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    submissions: Math.floor(Math.random() * 10) + 1
  })).sort((a, b) => b.score - a.score);
};

export default function LeaderboardPanel({ contestId, compact = false }: LeaderboardPanelProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Simulate fetching leaderboard data
  useEffect(() => {
    const fetchLeaderboard = () => {
      setLoading(true);
      setTimeout(() => {
        const data = generateLeaderboard();
        setLeaderboard(data);
        setLastUpdate(new Date());
        setLoading(false);
      }, 500);
    };

    // Initial fetch
    fetchLeaderboard();

    // Poll every 15 seconds
    const interval = setInterval(fetchLeaderboard, 15000);

    return () => clearInterval(interval);
  }, [contestId]);

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600';
    if (rank === 2) return 'text-gray-500';
    if (rank === 3) return 'text-amber-700';
    return 'text-green-700';
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="w-4 h-4 text-yellow-600" />;
    if (rank === 2) return <Trophy className="w-4 h-4 text-gray-500" />;
    if (rank === 3) return <Trophy className="w-4 h-4 text-amber-700" />;
    return null;
  };

  const displayLeaderboard = compact ? leaderboard.slice(0, 10) : leaderboard;

  return (
    <Card className="h-full bg-white border-green-200 rounded-2xl shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center justify-between">
          <h3 className="text-green-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-green-600" />
            Live Leaderboard
          </h3>
          {loading && <Loader2 className="w-4 h-4 animate-spin text-green-600" />}
        </div>
      </div>

      {/* Leaderboard Table */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {loading && leaderboard.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
          ) : (
            <div className="space-y-2">
              {displayLeaderboard.map((entry, index) => (
                <div
                  key={entry.username}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl transition-all
                    ${entry.rank <= 3 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                      : 'bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-200'
                    }
                  `}
                  style={{
                    animation: `fadeIn 0.3s ease-in-out ${index * 0.05}s both`
                  }}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-8">
                    {getRankBadge(entry.rank) || (
                      <span className={getRankColor(entry.rank)}>
                        {entry.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar & Username */}
                  <Avatar className="w-8 h-8 border-2 border-green-600">
                    <AvatarFallback className="bg-green-600 text-white text-xs">
                      {getUserInitials(entry.username)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-green-900 truncate">
                      {entry.username}
                    </p>
                    {!compact && (
                      <p className="text-green-600">
                        {entry.submissions} submissions
                      </p>
                    )}
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-green-900">
                        {entry.score}
                      </span>
                    </div>
                    <p className="text-green-600">
                      {entry.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer for compact view */}
      {compact && leaderboard.length > 10 && (
        <div className="p-3 border-t border-green-100 bg-green-50 text-center">
          <p className="text-green-700">
            Showing top 10 of {leaderboard.length} participants
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  );
}
