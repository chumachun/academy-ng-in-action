# Contributing to Academy: Angular in Action

Thank you for your interest in contributing to this project! We welcome contributions from the community to help make this learning platform even better.

## 💡 Ways to Contribute

### 🐛 Reporting Bugs

If you find a bug, please [open an issue](https://github.com/chumachun/academy-ng-in-action/issues) on GitHub. Use the "Bug Report" template if available, and include as much detail as possible, such as:

- A clear and descriptive title.
- Steps to reproduce the problem.
- Expected vs. actual behavior.
- Screenshots or code snippets if applicable.

### ✨ Requesting Features or Sharing Ideas

For new feature requests, ideas, or architectural suggestions, please start a [Discussion](https://github.com/chumachun/academy-ng-in-action/discussions). This allows the community to weigh in before we move to an implementation phase.

### 🛠️ Pull Requests

We love Pull Requests! To contribute code:

1. **Fork the repository** to your own GitHub account.
2. Create a new branch from the most relevant base branch (e.g., `main`, `solution/basic`, or `solution/advanced`).
3. Make your changes and ensure tests and linting pass.
4. Submit a Pull Request targeting the corresponding branch in this repository.

---

## 🌳 Branching & Rebasing Strategy

This repository follows a specific branch-based structure designed for a sequential learning experience. Contributions must maintain this integrity.

### The Chain of Dependencies

Changes typically follow this path:

1. **`main`**: The base starting point for all students.
2. **`solution/basic`**: Contains the solutions for the basic course, built upon `main`.
3. **`solution/advanced`**: Contains the solutions for the advanced course, built upon `solution/basic`.

### Contribution Workflow

The target branch for your Pull Request depends on the nature of the change:

- **General Improvements:** Bug fixes, UI enhancements, or tool configurations that apply to the entire project should target **`main`**.
- **Course-Specific Content:** New exercises or solution updates should target the branch they first appear in (e.g., a new Advanced exercise targets **`solution/advanced`**).

#### Cascading Rebase

Once a change is merged into a branch, it must be propagated down the chain:

- If merged into `main`, it is rebased into `solution/basic`, and then into `solution/advanced`.
- If merged into `solution/basic`, it is rebased into `solution/advanced`.

*Note: Maintainers will typically handle these cascading rebases to keep the solution chain in sync.*

---

## 💻 Local Development

Before you start coding, please follow the [Setup Guide](./docs/setup.md) to get the environment running on your machine.

### Coding Standards

- **Linting:** Ensure your code passes linting rules. In the `ui` directory, run `npm run lint`.
- **Testing:** We aim for high test coverage. Add tests for new features and ensure all existing tests pass (`npm test`).
- **Commits:** Use clear and descriptive commit messages.

---

*Questions? Feel free to reach out via GitHub Discussions!*
