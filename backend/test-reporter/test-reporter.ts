import { Reporter, TestContext, TestResult } from '@jest/reporters';
import { AggregatedResult } from '@jest/test-result';
import { readFileSync, writeFileSync } from 'fs';

const systems = {
  studies: 'Studien-Management',
  health: 'Gesundheits-Management',
};

const version = 'basic';

type CustomReporter = Pick<Reporter, 'onRunComplete'>;

export default class TestReporter implements CustomReporter {
  constructor() {}

  onRunComplete(set: Set<TestContext>, results: AggregatedResult) {
    const systemTests: Record<
      string,
      { total: number; failed: number; succeeded: number; files: TestResult[] }
    > = {};

    results.testResults.forEach((testResult) => {
      const chunks1 = testResult.testFilePath.split('\\integration\\');
      if (chunks1.length != 2) throw new Error('chunks must be 2');
      const chunks2 = chunks1[1].split('\\');
      if (chunks2.length <= 1) throw new Error('chunks must be greater than 1');

      const system = systems[chunks2[0]];

      if (!systemTests[system]) {
        systemTests[system] = {
          total: 0,
          failed: 0,
          succeeded: 0,
          files: [],
        };
      }

      systemTests[system].total += testResult.testResults.length;
      systemTests[system].failed += testResult.numFailingTests;
      systemTests[system].succeeded += testResult.numPassingTests;

      systemTests[system].files.push(testResult);
    });

    const template = readFileSync(
      `./test-reporter/${version}/template.html`,
      'utf-8',
    );
    const systemTemplate = readFileSync(
      `./test-reporter/${version}/system.html`,
      'utf-8',
    );
    const suiteTemplate = readFileSync(
      `./test-reporter/${version}/suite.html`,
      'utf-8',
    );
    const testTemplate = readFileSync(
      `./test-reporter/${version}/test.html`,
      'utf-8',
    );

    let testData = '';

    Object.keys(systemTests).forEach((name) => {
      const { total, failed, succeeded, files } = systemTests[name];
      let systemData = systemTemplate;

      const status = failed === 0 ? 'succeeded' : 'failed';

      systemData = systemData.replace('{{name}}', name);
      systemData = systemData.replace('{{status}}', status);
      systemData = systemData.replace('{{total}}', total.toString());
      systemData = systemData.replace('{{failed}}', failed.toString());
      systemData = systemData.replace('{{succeeded}}', succeeded.toString());

      let suitesData = '';

      files.forEach((file, i) => {
        let suiteData = suiteTemplate;

        const status = file.numFailingTests === 0 ? 'succeeded' : 'failed';
        const name =
          file.testResults.length > 0 &&
          file.testResults[0].ancestorTitles.length > 0
            ? file.testResults[0].ancestorTitles[0]
            : 'Suite ' + (i + 1);

        suiteData = suiteData.replace('{{status}}', status);
        suiteData = suiteData.replace('{{name}}', name);
        suiteData = suiteData.replace(
          '{{total}}',
          file.testResults.length.toString(),
        );
        suiteData = suiteData.replace(
          '{{failed}}',
          file.numFailingTests.toString(),
        );
        suiteData = suiteData.replace(
          '{{succeeded}}',
          file.numPassingTests.toString(),
        );

        let testsData = '';

        file.testResults.forEach((test) => {
          let testData = testTemplate;

          const status = test.status === 'failed' ? 'failed' : 'succeeded';

          testData = testData.replace('{{name}}', test.title);
          testData = testData.replace('{{status}}', status);

          testsData += testData;
        });

        suiteData = suiteData.replace('{{data}}', testsData);

        suitesData += suiteData;
      });

      systemData = systemData.replace('{{data}}', suitesData);

      testData += systemData;
    });

    let report = template.replace('{{data}}', testData);

    report = report.replace(
      '{{timestamp}}',
      new Date().toLocaleDateString('de', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    );
    report = report.replace('{{total}}', results.numTotalTests.toString());
    report = report.replace('{{failed}}', results.numFailedTests.toString());
    report = report.replace('{{succeeded}}', results.numPassedTests.toString());

    writeFileSync('./reports/test-report.html', report, 'utf-8');
  }
}
