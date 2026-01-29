# Contributing to Tutti Quantum

Thank you for your interest in contributing to Tutti Quantum! This document provides guidelines for contributing to the project.

## Code of Conduct

Please be respectful and constructive in all interactions. We're building an educational game that brings people together to learn about particle physics.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/game.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Follow the [Setup Guide](SETUP.md) to get the project running locally

## Development Workflow

### Making Changes

1. **Write clear, descriptive commit messages**
   ```
   feat: add daily challenge leaderboard
   fix: correct vertex validation for Higgs bosons
   docs: update API documentation for WebSocket events
   ```

2. **Follow the code style**
   - Use TypeScript for all new code
   - Follow existing patterns in the codebase
   - Run `npm run lint` before committing

3. **Test your changes**
   - Add tests for new features
   - Ensure existing tests pass: `npm test`
   - Test manually in the browser

4. **Keep commits focused**
   - One feature/fix per commit
   - Break large changes into smaller commits

### Submitting a Pull Request

1. Push your changes to your fork
2. Open a Pull Request against the `main` branch
3. Fill out the PR template with:
   - Description of changes
   - Related issue number (if applicable)
   - Screenshots (for UI changes)
   - Testing performed

4. Wait for review and address feedback

## Project Areas

### High Priority

- **Multiplayer stability** - Improve WebSocket handling and reconnection
- **Game mechanics** - Complete vertex validation and loop detection
- **UI/UX** - Responsive design and accessibility
- **Testing** - Increase test coverage

### Feature Requests

Check the [Issues](https://github.com/dido739/game/issues) page for:
- 🐛 Bug reports
- ✨ Feature requests
- 📚 Documentation improvements
- 🎨 UI/UX enhancements

## Code Structure

```
/client    - React frontend (TypeScript + Tailwind)
/server    - Express backend (TypeScript + Prisma)
/shared    - Shared types and constants
/docs      - Documentation
```

## Coding Guidelines

### TypeScript

- Use strict typing (no `any` unless absolutely necessary)
- Define interfaces for all data structures
- Use enums for fixed sets of values

### React

- Use functional components with hooks
- Keep components focused and reusable
- Use TypeScript for props

### Backend

- Validate all input
- Use middleware for authentication
- Handle errors gracefully
- Log important events

### Database

- Use Prisma migrations for schema changes
- Add indexes for frequently queried fields
- Document complex queries

## Testing

### Unit Tests

- Test game logic thoroughly
- Test API endpoints
- Mock external dependencies

### Integration Tests

- Test full request/response cycles
- Test WebSocket events
- Test database operations

### E2E Tests (Future)

- Critical user flows
- Multiplayer scenarios

## Documentation

- Update README.md for major features
- Document API changes in docs/API.md
- Add JSDoc comments for complex functions
- Include examples in documentation

## Questions?

- Open an issue for discussion
- Check existing issues and PRs
- Review the documentation

Thank you for contributing! 🎮⚛️
