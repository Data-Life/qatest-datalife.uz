# DataLife — QA Portfolio

A practical QA workspace for testing the DataLife panel and documenting the results.

**Status:** The public website and panel have been included in the QA scope. A total of 8 tests have been executed: 7 Pass, 1 Fail. One bug report has been created. Internal panel functionality has not yet been tested; 4 related test cases remain unexecuted.

## Objective

Demonstrate a manual QA process: defining the testing scope, writing test cases, executing tests, documenting defects with evidence, and preparing a final test report.

## Files

* [Test Plan](docs/test-plan.md) — testing environment, scope, and workflow.
* [Initial Review](docs/initial-review.md) — initial HTTP and HTML inspection of the public website and its limitations.
* [Site Map](docs/site-map.md) — routes and areas identified on the website.
* [Intermediate Test Summary](docs/test-summary.md) — executed tests, results, and current limitations.
* [BUG-001](bug-reports/BUG-001.md) — footer legal links do not open the corresponding documents.
* [Test Cases](test-cases/test-cases.csv) — can be opened in Excel or another spreadsheet application.
* [Bug Report Template](bug-reports/BUG-TEMPLATE.md) — a separate copy is created for each confirmed defect.
* [Evidence Guide](evidence/README.md) — guidelines for storing screenshots and videos.

## Workflow

1. Identify the panel URL, purpose, available roles, and test environment.
2. Review the main user flows and complete the test plan.
3. Compare the initial test cases with the application's actual requirements and prepare them for execution.
4. Execute the tests and record the actual result, status, and supporting evidence.
5. Reproduce confirmed issues and document them in separate bug reports.
6. Retest fixed issues and prepare the final report based on the results and remaining limitations.

## Result Statuses

* `Not Run` — the test has not been executed yet.
* `Pass` — the actual result matches the confirmed expected result.
* `Fail` — the actual result does not match the confirmed expected result.
* `Blocked` — the test cannot be executed because of a blocking issue; the reason must be documented.
* `N/A` — the test is not applicable to this application; the reason must be documented.

The `Design Status` column indicates whether a test case has been validated against the application's requirements:

* `Draft` — the test case has not yet been compared with the actual requirements or application behavior.
* `Ready` — the test case has been reviewed and is ready for execution.

If a requirement is unclear, it is not automatically considered a defect.

## Data Privacy

Only materials with sensitive information removed will be used in this portfolio.

Passwords, tokens, session cookie values, and real user data must never be stored in this repository.
