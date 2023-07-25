const fs = require('fs');
const path = require('path');

const testFilesDir = './apps/admin/test'; // Your test directory
const outputFileName = 'allTests.txt';

fs.writeFileSync(outputFileName, ''); // Clear the output file if it exists

function isTestFile(file) {
  return file.endsWith('.test.ts'); // Adjust according to your test file naming convention
}

function readFiles(dir) {
    const files = fs.readdirSync(dir);
  
    for (const file of files) {
      const filePath = path.join(dir, file);
  
      if (fs.statSync(filePath).isDirectory()) {
        readFiles(filePath);  // Recurse if directory
      } else if (isTestFile(file)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { testSuites, testCases } = extractTestNames(fileContent);
  
        fs.appendFileSync(outputFileName, `File: ${filePath}\n`);
        for (const suite of testSuites) {
          fs.appendFileSync(outputFileName, `Test Suite: ${suite}\n`);
        }
        for (const testCase of testCases) {
          fs.appendFileSync(outputFileName, `    Test Case: ${testCase}\n`);
        }
        fs.appendFileSync(outputFileName, '\n');
      }
    }
  }

function extractTestNames(content) {
  const describeRegex = /describe\((['"`])(.*?)\1,/g;
  const itRegex = /it\((['"`])(.*?)\1,/g;

  const testSuites = [...content.matchAll(describeRegex)].map(
    (match) => match[2],
  );
  const testCases = [...content.matchAll(itRegex)].map((match) => match[2]);

  return { testSuites, testCases };
}

readFiles(testFilesDir);
