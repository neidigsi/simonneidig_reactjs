# CI/CD

The entire Continuous Integration and Continuous Deployment (CI/CD) infrastructure for this project is based on workflows written using [GitHub Actions](https://docs.github.com/en/actions). This leverages standard technologies and utilizes GitHub's cloud services for automation.

Two main workflows have been implemented, which are described below.

## Test

The `test.yaml` workflow is responsible for running automated tests on every push and pull request. This ensures that code changes do not break existing functionality and helps maintain code quality throughout the development process.

**Key features:**
- Runs on every push and pull request to the repository.
- Installs all dependencies.
- Executes the project's test suite (e.g., using `npm test` or a similar command).
- Reports the results directly in the GitHub interface.

## Build

The `build.yaml` workflow handles the build process for the application. This workflow ensures that the application can be built successfully and is ready for deployment.

**Key features:**
- Runs on every push to the main branch (or other specified branches).
- Installs all dependencies.
- Builds the application (e.g., using `npm run build`).
- Builds a Docker image for the application.
- Pushes the Docker image directly to the GitHub Container Registry (GHCR) for use in deployments or further automation.