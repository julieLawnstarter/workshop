# WebdriverIO Hands On

This little course will help you to get up and running with WebdriverIO v7. It will walk you through different steps that will explain how to setup and use the project successfully.

## Prerequisites

In order to go through the course the following software is required to be installed on your system:

- Node.js (v14 or higher)
- NPM (v7 or higher)
- Python (2.7 or higher)
- An updated browser (e.g. Chrome, Firefox etc.)

If you don't have this installed go to [chapter 1](./chapter_01.md) where we walk through all install steps.

## Chapters

1. [Setup Environment](./chapter_01.md)
1. [Writing an automation script using Standalone Mode](./chapter_02.md)
1. [WDIO Testrunner](./chapter_03.md)
1. [Use of Reporter and Services](./chapter_04.md)
1. [Performance Testing](./chapter_05.md)
1. [PWA Testing](./chapter_06.md)
1. [Custom Reporters and Services](./chapter_07.md)
1. [CI/CD Integration](./chapter_08.md)
1. [Sauce Labs Integration](./chapter_09.md)
1. [Page Objects](./chapter_10.md)
1. [Visual Regression Testing](./chapter_11.md)
1. [TypeScript](./chapter_12.md)
1. [Go Pro](./chapter_13.md)

## Running tests

to run in node: node test.js
to run in webdriver: npx wdio run test.js

to start chromedriver: chromedriver --port=4444 --verbose
