import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Code2, Download, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import LeaderboardPanel from './LeaderboardPanel';

export default function Leaderboard() {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const handleBackToContest = () => {
    navigate(`/contest/${contestId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-xl">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-green-900">
                  Contest Leaderboard
                </h1>
                <p className="text-green-600">
                  Contest ID: {contestId}
                </p>
              </div>
            </div>

            <Button
              onClick={handleBackToContest}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Contest
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Card className="bg-white border-green-200 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-green-900 mb-2">
                  Spring Coding Championship 2025
                </h2>
                <p className="text-green-600">
                  3 Problems • 90 Minutes • Live rankings
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-48 border-green-200 focus:border-green-500 focus:ring-green-500">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Problems</SelectItem>
                    <SelectItem value="1">Problem 1: Two Sum</SelectItem>
                    <SelectItem value="2">Problem 2: Valid Parentheses</SelectItem>
                    <SelectItem value="3">Problem 3: Longest Common Subsequence</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-lg p-6 text-white">
            <p className="opacity-90 mb-1">Total Participants</p>
            <p className="text-4xl">324</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-0 shadow-lg p-6 text-white">
            <p className="opacity-90 mb-1">Total Submissions</p>
            <p className="text-4xl">1,247</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 shadow-lg p-6 text-white">
            <p className="opacity-90 mb-1">Average Score</p>
            <p className="text-4xl">287</p>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 border-0 shadow-lg p-6 text-white">
            <p className="opacity-90 mb-1">Problems Solved</p>
            <p className="text-4xl">856</p>
          </Card>
        </div>

        {/* Leaderboard Table */}
        <div className="h-[600px]">
          <LeaderboardPanel contestId={contestId || ''} compact={false} />
        </div>

        {/* Additional Info */}
        <Card className="mt-6 bg-green-50 border-green-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl flex-shrink-0">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-green-900 mb-2">About This Contest</h3>
              <p className="text-green-700 mb-3">
                The Spring Coding Championship 2025 is a real-time coding contest where participants 
                solve algorithmic problems. Rankings are based on score and submission time. The contest 
                features live leaderboard updates and instant feedback on submissions. Each problem has 
                a time allocation of 30 minutes.
              </p>
              <div className="flex items-center gap-6 text-green-600">
                <div>
                  <span>Duration:</span> 90 minutes
                </div>
                <div>
                  <span>Problems:</span> 3
                </div>
                <div>
                  <span>Time per Problem:</span> 30 mins
                </div>
                <div>
                  <span>Max Score:</span> 500 points
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 py-6">
          <p className="text-green-600">
            Powered by Shodh AI
          </p>
        </div>
      </div>
    </div>
  );
}
