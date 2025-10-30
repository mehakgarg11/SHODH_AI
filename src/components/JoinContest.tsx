import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

export default function JoinContest() {
  const [contestId, setContestId] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoinContest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contestId || !username) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store user info in sessionStorage
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('contestId', contestId);
      
      toast.success('Successfully joined contest!');
      navigate(`/contest/${contestId}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4 shadow-lg shadow-green-600/20">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-green-900 mb-2">
            Shodh-a-Code
          </h1>
          <p className="text-green-700">
            Real-Time Coding Contest Platform
          </p>
        </div>

        {/* Join Form */}
        <div className="bg-white rounded-2xl shadow-xl shadow-green-600/5 border border-green-100 p-8">
          <h2 className="text-green-900 mb-6">
            Join a Contest
          </h2>
          
          <form onSubmit={handleJoinContest} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="contestId" className="text-green-900">
                Contest ID
              </Label>
              <Input
                id="contestId"
                type="text"
                placeholder="Enter contest ID"
                value={contestId}
                onChange={(e) => setContestId(e.target.value)}
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-green-900">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
            >
              {loading ? (
                'Joining...'
              ) : (
                <>
                  Join Contest
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-green-600">
            Powered by Shodh AI
          </p>
        </div>
      </div>
    </div>
  );
}
