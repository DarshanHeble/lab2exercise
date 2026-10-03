# Lab 2: Basic Continuous Integration Using GitHub Actions

## 1. Title

**Design and implement a basic CI workflow triggered by commits using GitHub Actions**

## 2. Objective

The objective of this lab is to design and implement a Continuous Integration (CI)
workflow for a web application. The workflow is triggered when changes are pushed
to the repository. It automatically installs dependencies, tests the backend,
checks the frontend code, and builds the frontend application.

This helps detect errors early and ensures that new commits do not break the
application.

## 3. Technologies Used

- GitHub Actions
- Node.js 20
- npm
- Express.js backend
- React and Vite frontend
- GitHub-hosted Ubuntu runner

## 4. Project Structure

```text
Lab2/
├── .github/
│   └── workflows/
│       └── Lab2.yaml
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── server.test.js
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   └── vite.config.js
└── LAB2-CI-DOCUMENTATION.md
```

## 5. CI Workflow Design

The workflow is defined in:

```text
.github/workflows/Lab2.yaml
```

The workflow is triggered by:

1. A commit pushed to the repository that changes files under `Lab2/`.
2. A pull request that changes files under `Lab2/`.
3. A manual run using the **Run workflow** button in GitHub Actions.

The workflow contains two independent jobs:

### Backend job

- Checks out the repository.
- Sets up Node.js 20.
- Restores the npm cache.
- Installs exact dependency versions with `npm ci`.
- Runs the backend test suite with `npm test`.

### Frontend job

- Checks out the repository.
- Sets up Node.js 20.
- Restores the npm cache.
- Installs exact dependency versions with `npm ci`.
- Runs frontend linting with `npm run lint`.
- Creates a production build with `npm run build`.

If any step fails, the corresponding job is marked as failed by GitHub Actions.

## 6. Workflow Implementation

```yaml
name: Lab 2 CI

on:
  push:
    paths:
      - "Lab2/**"
      - ".github/workflows/Lab2.yaml"
  pull_request:
    paths:
      - "Lab2/**"
      - ".github/workflows/Lab2.yaml"
  workflow_dispatch:

jobs:
  backend:
    name: Test backend
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: Lab2/backend

    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: Lab2/backend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

  frontend:
    name: Lint and build frontend
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: Lab2/frontend

    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: Lab2/frontend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Lint frontend
        run: npm run lint

      - name: Build frontend
        run: npm run build
```

## 7. Local Verification Commands

The same checks can be run locally before pushing a commit.

### Backend

```bash
cd Lab2/backend
npm ci
npm test
```

### Frontend

```bash
cd Lab2/frontend
npm ci
npm run lint
npm run build
```

## 8. How to Demonstrate the CI Workflow

1. Open the GitHub repository: <https://github.com/DarshanHeble/lab2exercise/tree/main/Lab2>
2. Open the workflow file: <https://github.com/DarshanHeble/lab2exercise/blob/main/.github/workflows/lab2-ci.yml>
3. Select the **Actions** tab.
4. Select **Lab 2 CI** from the workflow list.
5. Open the successful workflow run:
   <https://github.com/DarshanHeble/lab2exercise/actions/runs/37100764609>
6. Show the successful **Test backend** job.
7. Show the successful **Lint and build frontend** job.
8. Expand the steps to show `npm test`, `npm run lint`, and `npm run build`.

The green check marks prove that commit `96a6db7` passed the CI checks.

For evaluation, capture three screenshots: the successful workflow overview,
the passed backend test, and the passed frontend lint and build steps.

## 9. Expected Result

After a valid commit is pushed:

- GitHub Actions starts automatically.
- The backend test passes.
- The frontend lint check passes.
- The frontend production build completes successfully.
- The workflow is shown as successful in the GitHub Actions tab.

If a test, lint check, dependency installation, or build fails, GitHub Actions
marks the workflow as failed and displays the failed step for troubleshooting.

## 10. Conclusion

A basic commit-triggered CI pipeline was designed and implemented using GitHub
Actions. The pipeline validates both major parts of the application by testing
the backend and linting/building the frontend. This provides immediate feedback
on every relevant commit and improves the reliability of the development process.
