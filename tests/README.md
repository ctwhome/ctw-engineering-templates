# Testing

Testing applications should accelerate the process by detecting possible pitfalls that could occur in the future. Once the TDD (test Development Driven) strategy is intrinsically rooted in your habits, the development process can also benefit by forcing developers to think and structure the code before developing it. 

To avoid "bulletproofing" everything, it is important to go step by step and cover immediate cases, rather than to try to cover all, possibly never used, cases in the future. 

Tests should occur on the CI, but it is important to have a set of development tools that are fast and allows testing in development fast and responsive.

When writing JavasCript applications, the use of Types and Linters that warn in real-time execution errors is also a good practice to have. Specially linter with format rules that ensures best practices and format standards.

### What is needed to run all the tests:

*   Test runners: Jest
*   Assertion libraries: Jest is a 2 in one)
*   Headless Browsers: Puppetier

### Type of tests: 

<table><tbody><tr><th>Unit Tests (Fully Isolated)</th><td>&nbsp;</td></tr><tr><th>Integration Tests (With dependencies)</th><td>&nbsp;</td></tr><tr><th>End2end Test (Full flow - DOM actions)</th><td>&nbsp;</td></tr></tbody></table>
