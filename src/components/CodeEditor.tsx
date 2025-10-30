import { useState, useEffect } from 'react';
import { Play, Send, Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import TestResults, { TestResult } from './TestResults';
import { problemTestCases } from '../data/testCases';

interface Problem {
  id: number;
  title: string;
}

interface CodeEditorProps {
  problem: Problem;
  username: string;
}

type SubmissionStatus = 'idle' | 'pending' | 'running' | 'accepted' | 'wrong_answer' | 'error';

// Function templates for different problems and languages
const getFunctionTemplate = (problemId: number, language: string): string => {
  const templates: Record<number, Record<string, string>> = {
    1: { // Two Sum
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    \n}'
    },
    2: { // Valid Parentheses
      java: 'class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}',
      cpp: 'bool isValid(string s) {\n    \n}'
    },
    3: { // Longest Common Subsequence
      java: 'class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        \n    }\n}',
      cpp: 'int longestCommonSubsequence(string text1, string text2) {\n    \n}'
    }
  };

  return templates[problemId]?.[language] || '// Write your solution here';
};

export default function CodeEditor({ problem, username }: CodeEditorProps) {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(getFunctionTemplate(problem.id, 'cpp'));
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update code template when language or problem changes
  useEffect(() => {
    setCode(getFunctionTemplate(problem.id, language));
    setTestResults(null);
    setStatus('idle');
  }, [language, problem.id]);

  // Simulate running code on example test cases
  const handleRunCode = () => {
    if (!code.trim()) {
      toast.error('Please write some code first!');
      return;
    }

    setIsRunning(true);
    setTestResults(null);
    setStatus('idle');
    toast.info('Running example test cases...');

    // Simulate code execution delay
    setTimeout(() => {
      const testCases = problemTestCases[problem.id]?.examples || [];
      
      // Simulate code execution - for demo purposes, we'll use a simple heuristic
      // In real implementation, this would execute the actual code
      const results: TestResult[] = testCases.map((testCase, index) => {
        // Simulate: passes if code contains certain keywords (demo only)
        // You can change this logic to test actual code execution
        const codeLength = code.trim().length;
        const hasBasicStructure = codeLength > 50; // Basic check if user wrote some code
        
        const passed = hasBasicStructure; // For demo: all pass if code has substance
        return {
          testCase: index + 1,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: passed ? testCase.expectedOutput : 'Error: Your code did not produce the expected output',
          passed
        };
      });

      const totalPassed = results.filter(r => r.passed).length;
      setTestResults(results);
      setIsRunning(false);

      if (totalPassed === results.length) {
        toast.success(`All ${results.length} example test cases passed! ✓`);
      } else {
        toast.error(`${totalPassed}/${results.length} example test cases passed`);
      }
    }, 1500);
  };

  // Simulate submitting code on all test cases
  const handleSubmit = () => {
    if (!code.trim()) {
      toast.error('Please write some code first!');
      return;
    }

    setIsSubmitting(true);
    setTestResults(null);
    setStatus('pending');
    const newSubmissionId = `SUB-${Date.now()}`;
    setSubmissionId(newSubmissionId);
    toast.info('Submitting your code...');

    // Simulate code execution delay
    setTimeout(() => {
      const testCases = problemTestCases[problem.id]?.submit || [];
      
      // Simulate code execution - for demo purposes, we'll use a simple heuristic
      // In real implementation, this would execute the actual code against test cases
      const results: TestResult[] = testCases.map((testCase, index) => {
        // Simulate: passes if code contains certain keywords (demo only)
        const codeLength = code.trim().length;
        const hasBasicStructure = codeLength > 50; // Basic check if user wrote some code
        
        // For demo: make first 8 pass, last 2 fail if code is basic (showing partial correctness)
        // For production: this would actually run the code
        const passed = hasBasicStructure && index < 8;
        
        return {
          testCase: index + 1,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: passed ? testCase.expectedOutput : 'Error: Your code did not produce the expected output',
          passed
        };
      });

      const totalPassed = results.filter(r => r.passed).length;
      setTestResults(results);
      setIsSubmitting(false);

      if (totalPassed === results.length) {
        setStatus('accepted');
        toast.success('Submission Accepted! All test cases passed! 🎉');
      } else {
        setStatus('wrong_answer');
        toast.error(`Wrong Answer: ${totalPassed}/${results.length} test cases passed`);
      }
    }, 2500);
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-300">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'running':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Running
          </Badge>
        );
      case 'accepted':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-300">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      case 'wrong_answer':
        return (
          <Badge className="bg-red-100 text-red-700 border-red-300">
            <XCircle className="w-3 h-3 mr-1" />
            Wrong Answer
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-700 border-red-300">
            <XCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <Card className="bg-white border-green-200 rounded-2xl shadow-lg flex flex-col overflow-hidden" style={{ height: testResults ? '50%' : '100%' }}>
        {/* Header */}
        <div className="p-4 border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-green-900">Code Editor</h3>
            {getStatusBadge()}
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40 border-green-200 focus:border-green-500 focus:ring-green-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1" />

            <Button
              onClick={handleRunCode}
              disabled={isRunning || isSubmitting}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </>
              )}
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Code Input Area */}
        <div className="flex-1 p-4 overflow-hidden">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-full font-mono resize-none border-green-200 focus:border-green-500 focus:ring-green-500"
            placeholder="Write your code here..."
            spellCheck={false}
          />
        </div>

        {/* Status Area */}
        {submissionId && status !== 'idle' && !testResults && (
          <div className="p-4 border-t border-green-100 bg-green-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-900">
                  Submission ID: {submissionId}
                </p>
                <p className="text-green-600">
                  Status: {status.replace('_', ' ').toUpperCase()}
                </p>
              </div>
              {status === 'accepted' && (
                <div className="text-green-700">
                  <p>Runtime: 52ms</p>
                  <p>Memory: 42.1MB</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Test Results */}
      {testResults && (
        <div style={{ height: '48%' }}>
          <TestResults
            results={testResults}
            totalPassed={testResults.filter(r => r.passed).length}
            totalTests={testResults.length}
          />
        </div>
      )}
    </div>
  );
}
