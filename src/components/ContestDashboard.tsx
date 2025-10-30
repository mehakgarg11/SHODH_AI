import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code2, LogOut, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import ProblemView from './ProblemView';
import CodeEditor from './CodeEditor';
import LeaderboardPanel from './LeaderboardPanel';
import ContestTimer from './ContestTimer';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

// Mock contest data with 3 problems
const mockContest = {
  id: 'CONTEST-2025',
  title: 'Spring Coding Championship 2025',
  totalMinutes: 90, // 3 problems × 30 minutes each
  problems: [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists'
      ],
      inputFormat: 'First line contains n (size of array)\nSecond line contains n integers\nThird line contains target',
      outputFormat: 'Two space-separated integers representing indices',
      examples: [
        {
          input: '4\n2 7 11 15\n9',
          output: '0 1',
          explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
        },
        {
          input: '3\n3 2 4\n6',
          output: '1 2',
          explanation: 'nums[1] + nums[2] = 2 + 4 = 6'
        }
      ]
    },
    {
      id: 2,
      title: 'Valid Parentheses',
      difficulty: 'Medium',
      description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.',
      constraints: [
        '1 <= s.length <= 10^4',
        's consists of parentheses only \'()[]{}\'',
      ],
      inputFormat: 'Single line containing the string s',
      outputFormat: 'Print "true" if valid, "false" otherwise',
      examples: [
        {
          input: '()',
          output: 'true',
          explanation: 'The string contains valid matching parentheses'
        },
        {
          input: '()[]{}',
          output: 'true',
          explanation: 'All brackets are properly matched'
        },
        {
          input: '(]',
          output: 'false',
          explanation: 'Mismatched bracket types'
        }
      ]
    },
    {
      id: 3,
      title: 'Longest Common Subsequence',
      difficulty: 'Hard',
      description: 'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.',
      constraints: [
        '1 <= text1.length, text2.length <= 1000',
        'text1 and text2 consist of only lowercase English characters'
      ],
      inputFormat: 'First line contains text1\nSecond line contains text2',
      outputFormat: 'Single integer representing the length of longest common subsequence',
      examples: [
        {
          input: 'abcde\nace',
          output: '3',
          explanation: 'The longest common subsequence is "ace" which has length 3'
        },
        {
          input: 'abc\nabc',
          output: '3',
          explanation: 'The longest common subsequence is "abc" which has length 3'
        },
        {
          input: 'abc\ndef',
          output: '0',
          explanation: 'There is no common subsequence'
        }
      ]
    }
  ]
};

export default function ContestDashboard() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [selectedProblem, setSelectedProblem] = useState(mockContest.problems[0]);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (!storedUsername) {
      navigate('/');
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  useEffect(() => {
    setSelectedProblem(mockContest.problems[selectedProblemIndex]);
  }, [selectedProblemIndex]);

  const handleLeaveContest = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleViewFullLeaderboard = () => {
    navigate(`/leaderboard/${contestId}`);
  };

  const handleTimeUp = () => {
    toast.error('Contest time is up!', {
      description: 'The contest has ended. Your submissions are being finalized.',
    });
  };

  const handlePreviousProblem = () => {
    if (selectedProblemIndex > 0) {
      setSelectedProblemIndex(selectedProblemIndex - 1);
    }
  };

  const handleNextProblem = () => {
    if (selectedProblemIndex < mockContest.problems.length - 1) {
      setSelectedProblemIndex(selectedProblemIndex + 1);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-xl">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-green-900">
                  {mockContest.title}
                </h1>
                <p className="text-green-600">
                  Contest ID: {contestId} • 3 Problems • 90 Minutes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ContestTimer totalMinutes={mockContest.totalMinutes} onTimeUp={handleTimeUp} />

              <Button
                onClick={handleViewFullLeaderboard}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Full Leaderboard
              </Button>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-xl">
                <Avatar className="w-8 h-8 border-2 border-green-600">
                  <AvatarFallback className="bg-green-600 text-white">
                    {getUserInitials(username)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-green-900">{username}</span>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Leave
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Leave Contest?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to leave this contest? Your progress will be saved but you'll need to rejoin to continue.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLeaveContest}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Leave Contest
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 3 Panel Layout */}
      <div className="container mx-auto p-4">
        {/* Problem Navigation */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {mockContest.problems.map((problem, index) => (
              <Button
                key={problem.id}
                onClick={() => setSelectedProblemIndex(index)}
                variant={selectedProblemIndex === index ? 'default' : 'outline'}
                className={
                  selectedProblemIndex === index
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'border-green-300 text-green-700 hover:bg-green-50'
                }
              >
                Problem {problem.id}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handlePreviousProblem}
              disabled={selectedProblemIndex === 0}
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              onClick={handleNextProblem}
              disabled={selectedProblemIndex === mockContest.problems.length - 1}
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-50 disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ height: 'calc(100vh - 200px)' }}>
          {/* Left Panel - Problem View */}
          <div className="h-full overflow-hidden">
            <ProblemView problem={selectedProblem} />
          </div>

          {/* Right Panel - Code Editor */}
          <div className="h-full overflow-hidden">
            <CodeEditor problem={selectedProblem} username={username} />
          </div>
        </div>
      </div>
    </div>
  );
}
