// Test cases for each problem
export interface TestCase {
  input: string;
  expectedOutput: string;
}

export const problemTestCases: Record<number, { examples: TestCase[], submit: TestCase[] }> = {
  1: { // Two Sum
    examples: [
      {
        input: '4\n2 7 11 15\n9',
        expectedOutput: '0 1'
      },
      {
        input: '3\n3 2 4\n6',
        expectedOutput: '1 2'
      }
    ],
    submit: [
      {
        input: '4\n2 7 11 15\n9',
        expectedOutput: '0 1'
      },
      {
        input: '3\n3 2 4\n6',
        expectedOutput: '1 2'
      },
      {
        input: '2\n3 3\n6',
        expectedOutput: '0 1'
      },
      {
        input: '5\n-1 -2 -3 -4 -5\n-8',
        expectedOutput: '2 4'
      },
      {
        input: '6\n0 4 3 0\n0',
        expectedOutput: '0 3'
      },
      {
        input: '4\n1 5 7 9\n14',
        expectedOutput: '1 3'
      },
      {
        input: '7\n10 20 30 40 50 60 70\n90',
        expectedOutput: '3 4'
      },
      {
        input: '3\n-5 5 0\n0',
        expectedOutput: '0 1'
      },
      {
        input: '5\n1 2 3 4 5\n9',
        expectedOutput: '3 4'
      },
      {
        input: '8\n100 200 300 400 500 600 700 800\n1100',
        expectedOutput: '3 6'
      }
    ]
  },
  2: { // Valid Parentheses
    examples: [
      {
        input: '()',
        expectedOutput: 'true'
      },
      {
        input: '()[]{}',
        expectedOutput: 'true'
      },
      {
        input: '(]',
        expectedOutput: 'false'
      }
    ],
    submit: [
      {
        input: '()',
        expectedOutput: 'true'
      },
      {
        input: '()[]{}',
        expectedOutput: 'true'
      },
      {
        input: '(]',
        expectedOutput: 'false'
      },
      {
        input: '([)]',
        expectedOutput: 'false'
      },
      {
        input: '{[]}',
        expectedOutput: 'true'
      },
      {
        input: '',
        expectedOutput: 'true'
      },
      {
        input: '((()))',
        expectedOutput: 'true'
      },
      {
        input: '((())',
        expectedOutput: 'false'
      },
      {
        input: '{[()]}',
        expectedOutput: 'true'
      },
      {
        input: '{{{{}}}}',
        expectedOutput: 'true'
      }
    ]
  },
  3: { // Longest Common Subsequence
    examples: [
      {
        input: 'abcde\nace',
        expectedOutput: '3'
      },
      {
        input: 'abc\nabc',
        expectedOutput: '3'
      },
      {
        input: 'abc\ndef',
        expectedOutput: '0'
      }
    ],
    submit: [
      {
        input: 'abcde\nace',
        expectedOutput: '3'
      },
      {
        input: 'abc\nabc',
        expectedOutput: '3'
      },
      {
        input: 'abc\ndef',
        expectedOutput: '0'
      },
      {
        input: 'abcdef\nacebdf',
        expectedOutput: '4'
      },
      {
        input: 'programming\ncontest',
        expectedOutput: '2'
      },
      {
        input: 'aaa\naa',
        expectedOutput: '2'
      },
      {
        input: 'hello\nworld',
        expectedOutput: '2'
      },
      {
        input: 'longest\nstone',
        expectedOutput: '3'
      },
      {
        input: 'abc\n',
        expectedOutput: '0'
      },
      {
        input: 'abcdefghij\nacegikm',
        expectedOutput: '5'
      }
    ]
  }
};
