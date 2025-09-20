# Application

This document provides an overview of the application's structure and testing strategy.  
It is intended to help developers quickly understand the organization of the codebase, the purpose of each main directory, and the approach to automated testing.  
By following these guidelines, contributors can efficiently navigate, maintain, and extend the project.

## Code Structure

The codebase is organized into several main directories, each serving a specific purpose to ensure maintainability, scalability, and clarity:

- **assets/**
  - **css/** – Contains all global and component-specific CSS files. The structure mirrors the `app` directory, and all styles are imported via `main.css`.
  - **images/** – Stores static image assets used throughout the application.
  - **locales/** – Holds translation files for multi-language support, organized by language code (e.g., `en`, `de`, `fr`).

- **components/** – Contains all reusable React components, grouped by feature or domain. Each component may have its own test and style files.

- **layouts/** – Defines layout components that structure the overall page, such as sidebars or wrappers for main content.

- **networking/** – Contains modules for API communication, including the central `http()` method that abstracts backend requests.

- **routes/** – Contains all route components, each representing a page or view in the application. These are mapped in the routing configuration.

- **store/** – Implements global state management using Redux Toolkit. Includes slices, hooks, and the store provider. See the [store README](./store/README.md) for details.

This modular structure allows for clear separation of concerns, making it easy to locate, maintain, and extend functionality as the application grows.

## Unit Tests

The goal is to provide comprehensive unit tests for every component in the application.  
Unit tests are written using [Testing Library](https://testing-library.com/) and [Jest](https://jestjs.io/), two popular frameworks for testing React applications.

**Test Organization:**
- Each component's unit tests are placed in the same directory as the component itself.
- The test file uses the same name as the component file, but ends with `.test.tsx` (e.g., `Button.tsx` and `Button.test.tsx`).
- This approach keeps tests close to the code they verify, making it easier to maintain and update tests alongside the components.

**Test Execution:**
- All unit tests can be executed using the following command:
  ```
  npm run test
  ```
- This command will run all test files in the project and provide a summary of the results.

**Best Practices:**
- Tests should cover all important logic and edge cases for each component.
- Aim for high test coverage, but prioritize meaningful and maintainable tests over simply increasing coverage numbers.
- Use Testing Library's philosophy of testing components from the user's perspective.

**CI/CD Integration:**
- Unit tests are integrated into the CI/CD pipeline (see [../.github/workflows/test.yaml](../.github/workflows/test.yaml)).
- This ensures that all tests are automatically run on every push and pull request, helping to catch errors early and maintain code quality.

By following these practices, the project ensures robust, reliable, and maintainable code through automated testing.