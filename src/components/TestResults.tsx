import { CheckCircle2, XCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export interface TestResult {
  testCase: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
}

interface TestResultsProps {
  results: TestResult[];
  totalPassed: number;
  totalTests: number;
}

export default function TestResults({ results, totalPassed, totalTests }: TestResultsProps) {
  const allPassed = totalPassed === totalTests;

  return (
    <Card className="h-full border-green-200 rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className={`p-4 border-b flex-shrink-0 ${allPassed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {allPassed ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <h3 className={allPassed ? 'text-green-900' : 'text-red-900'}>
              Test Results
            </h3>
          </div>
          <Badge className={allPassed ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}>
            {totalPassed} / {totalTests} Passed
          </Badge>
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-3">
          {results.map((result) => (
            <div
              key={result.testCase}
              className={`rounded-xl border-2 overflow-hidden ${
                result.passed
                  ? 'border-green-200 bg-green-50/50'
                  : 'border-red-200 bg-red-50/50'
              }`}
            >
              {/* Test Case Header */}
              <div className={`px-4 py-2 flex items-center justify-between ${
                result.passed ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className={result.passed ? 'text-green-900' : 'text-red-900'}>
                  Test Case {result.testCase}
                </span>
                <Badge className={result.passed 
                  ? 'bg-green-600 text-white border-0' 
                  : 'bg-red-600 text-white border-0'
                }>
                  {result.passed ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Passed
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" />
                      Failed
                    </>
                  )}
                </Badge>
              </div>

              {/* Test Case Details */}
              <div className="p-4 space-y-3">
                {/* Input */}
                <div>
                  <p className="text-green-900 mb-1">Input:</p>
                  <pre className="bg-white rounded-lg p-3 border border-green-200 text-gray-800 overflow-x-auto whitespace-pre-wrap break-words">
                    {result.input}
                  </pre>
                </div>

                {/* Expected Output */}
                <div>
                  <p className="text-green-900 mb-1">Expected Output:</p>
                  <pre className="bg-white rounded-lg p-3 border border-green-200 text-gray-800 overflow-x-auto whitespace-pre-wrap break-words">
                    {result.expectedOutput}
                  </pre>
                </div>

                {/* Actual Output */}
                <div>
                  <p className={result.passed ? 'text-green-900 mb-1' : 'text-red-900 mb-1'}>
                    Your Output:
                  </p>
                  <pre className={`rounded-lg p-3 border overflow-x-auto whitespace-pre-wrap break-words ${
                    result.passed
                      ? 'bg-white border-green-200 text-gray-800'
                      : 'bg-red-50 border-red-300 text-red-900'
                  }`}>
                    {result.actualOutput}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
