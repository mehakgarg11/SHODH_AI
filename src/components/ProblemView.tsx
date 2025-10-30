import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { problemTestCases } from '../data/testCases';

interface Problem {
  id: number;
  title: string;
  difficulty: string;
  description: string;
  constraints: string[];
  inputFormat: string;
  outputFormat: string;
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
}

interface ProblemViewProps {
  problem: Problem;
}

export default function ProblemView({ problem }: ProblemViewProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <Card className="h-full bg-white border-green-200 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-green-900">
            {problem.id}. {problem.title}
          </h3>
          <Badge className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="description" className="h-[calc(100%-80px)]">
        <div className="px-6 pt-4 border-b border-green-100">
          <TabsList className="bg-green-50">
            <TabsTrigger value="description" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Description
            </TabsTrigger>
            <TabsTrigger value="input" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Input
            </TabsTrigger>
            <TabsTrigger value="output" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Output
            </TabsTrigger>
            <TabsTrigger value="constraints" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Constraints
            </TabsTrigger>
            <TabsTrigger value="testcases" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Test Cases
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="p-6">
            <TabsContent value="description" className="mt-0 space-y-4">
              <div>
                <h4 className="text-green-900 mb-2">Problem Statement</h4>
                <p className="text-gray-700 leading-relaxed">{problem.description}</p>
              </div>

              <div>
                <h4 className="text-green-900 mb-3">Examples</h4>
                <div className="space-y-4">
                  {problem.examples.map((example, index) => (
                    <div key={index} className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <p className="text-green-900 mb-2">Example {index + 1}:</p>
                      
                      <div className="mb-3">
                        <p className="text-green-700 mb-1">Input:</p>
                        <pre className="bg-white rounded-lg p-3 border border-green-200 text-gray-800 overflow-x-auto">
                          {example.input}
                        </pre>
                      </div>

                      <div className="mb-3">
                        <p className="text-green-700 mb-1">Output:</p>
                        <pre className="bg-white rounded-lg p-3 border border-green-200 text-gray-800 overflow-x-auto">
                          {example.output}
                        </pre>
                      </div>

                      <div>
                        <p className="text-green-700 mb-1">Explanation:</p>
                        <p className="text-gray-700">{example.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="input" className="mt-0">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="text-green-900 mb-2">Input Format</h4>
                <pre className="text-gray-700 whitespace-pre-wrap">{problem.inputFormat}</pre>
              </div>
            </TabsContent>

            <TabsContent value="output" className="mt-0">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="text-green-900 mb-2">Output Format</h4>
                <pre className="text-gray-700 whitespace-pre-wrap">{problem.outputFormat}</pre>
              </div>
            </TabsContent>

            <TabsContent value="constraints" className="mt-0">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="text-green-900 mb-3">Constraints</h4>
                <ul className="space-y-2">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span className="text-gray-700">{constraint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="testcases" className="mt-0">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="text-green-900 mb-3">Submission Test Cases (10 Fixed)</h4>
                <p className="text-gray-700 mb-4">Your submission will be evaluated against these 10 test cases:</p>
                
                <div className="space-y-4">
                  {problemTestCases[problem.id]?.submit.map((testCase, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                      <p className="text-green-900 mb-3">Test Case {index + 1}:</p>
                      
                      <div className="mb-3">
                        <p className="text-green-700 mb-1">Input:</p>
                        <pre className="bg-green-50 rounded-lg p-3 border border-green-200 text-gray-800 overflow-x-auto whitespace-pre-wrap break-words">
                          {testCase.input}
                        </pre>
                      </div>

                      <div>
                        <p className="text-green-700 mb-1">Expected Output:</p>
                        <pre className="bg-green-50 rounded-lg p-3 border border-green-200 text-gray-800 overflow-x-auto whitespace-pre-wrap break-words">
                          {testCase.expectedOutput}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </Card>
  );
}
