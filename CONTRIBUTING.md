# Contributing to AnimalCare Foundation

Thank you for your interest in contributing to the AnimalCare Foundation donation portal! Every contribution helps us save more animal lives. 🐾

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:
- 🐛 **Bug reports** and fixes
- ✨ **Feature requests** and implementations
- 📚 **Documentation** improvements
- 🎨 **UI/UX** enhancements
- 🧪 **Testing** and quality assurance
- 🌐 **Translations** and accessibility improvements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- Razorpay test account (for payment testing)

### Setup Development Environment
1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/yourusername/animalcare-foundation.git
   cd animalcare-foundation/charitylite-client
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Setup** environment files:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   ```
5. **Add your Razorpay test key** to `src/environments/environment.ts`
6. **Start** development server:
   ```bash
   npm start
   ```

## 📋 Development Guidelines

### Code Style
- Follow **Angular Style Guide**
- Use **TypeScript** for type safety
- Write **meaningful variable names**
- Add **comments** for complex logic
- Keep **functions small** and focused

### Code Formatting
We use Prettier for code formatting:
```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

### Linting
Ensure code quality with ESLint:
```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

## 🔧 Development Workflow

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/issue-description
```

### Branch Naming Convention
- `feature/` - New features
- `bugfix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests

### 2. Make Changes
- Write clean, well-documented code
- Add tests for new functionality
- Update documentation if needed
- Ensure all tests pass

### 3. Commit Guidelines
Use conventional commit messages:
```bash
git commit -m "feat: add UPI quick payment button"
git commit -m "fix: resolve PDF currency symbol issue"
git commit -m "docs: update payment integration guide"
```

#### Commit Types
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 4. Testing
Before submitting:
```bash
# Run all tests
npm test

# Build for production
npm run build:prod

# Test payment flow with test credentials
```

### 5. Submit Pull Request
1. **Push** your branch to your fork
2. **Create** a Pull Request
3. **Fill** in the PR template
4. **Wait** for review

## 🐛 Bug Reports

### Before Reporting
- Search existing issues
- Try to reproduce the bug
- Check if it's already fixed in latest version

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g. Chrome 91]
- Device: [e.g. iPhone 12]
- OS: [e.g. iOS 14.6]

**Additional context**
Any other context about the problem.
```

## ✨ Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context about the feature request.
```

## 🔒 Security Guidelines

### Important Security Rules
- **NEVER** commit API keys or secrets
- Use environment variables for sensitive data
- Follow the security guidelines in `SECURITY.md`
- Report security issues privately

### API Key Safety
- Use test keys for development
- Store actual keys in environment files (gitignored)
- Never hardcode keys in source code

## 🧪 Testing Guidelines

### Test Types
- **Unit Tests** - Test individual components
- **Integration Tests** - Test component interactions
- **E2E Tests** - Test complete user flows

### Running Tests
```bash
# Unit tests
npm test

# E2E tests
npm run e2e

# Test coverage
npm run test:coverage
```

### Writing Tests
- Test public APIs, not implementation details
- Write descriptive test names
- Cover edge cases and error scenarios
- Mock external dependencies

## 📚 Documentation

### Documentation Updates
- Update README for new features
- Add inline code comments
- Update API documentation
- Include examples for new functionality

### Documentation Style
- Use clear, simple language
- Include code examples
- Add screenshots for UI changes
- Keep documentation up-to-date

## 🎨 UI/UX Guidelines

### Design Principles
- **Animal-themed** - Use paw icons and animal imagery
- **Accessible** - Follow WCAG guidelines
- **Mobile-first** - Responsive design
- **Modern** - Clean, contemporary interface

### UI Components
- Use consistent spacing and colors
- Follow the existing design system
- Test on multiple screen sizes
- Ensure good contrast ratios

## 🌐 Internationalization

### Adding Translations
- Use Angular i18n for text internationalization
- Support RTL languages
- Consider cultural differences
- Test with different locales

## 📞 Getting Help

### Communication Channels
- 💬 **GitHub Issues** - Bug reports and feature requests
- 📧 **Email** - `contributors@animalcarefoundation.org`
- 💻 **Discord** - [Join our community](https://discord.gg/animalcare)

### Code Review Process
1. **Automated checks** run first
2. **Maintainer review** for code quality
3. **Testing** by reviewers
4. **Approval** and merge

## 🏆 Recognition

### Contributors
All contributors are recognized in:
- GitHub contributor list
- Project documentation
- Annual contributor appreciation
- Special mentions for significant contributions

### Contribution Levels
- 🌟 **First-time contributor** - Welcome badge
- 🚀 **Regular contributor** - Community recognition
- 🏆 **Core contributor** - Special privileges
- 💎 **Maintainer** - Project leadership

## 📋 Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] No API keys or secrets in code
- [ ] PR description explains changes
- [ ] Screenshots included for UI changes
- [ ] Breaking changes are documented

## 🎯 Priority Areas

We especially welcome contributions in:
- 🔧 **Payment gateway improvements**
- 📱 **Mobile responsiveness**
- ♿ **Accessibility features**
- 🌍 **Internationalization**
- 🧪 **Test coverage**
- 📊 **Analytics and reporting**

## 📄 Code of Conduct

### Our Pledge
We are committed to making participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Harassment of any kind
- Discriminatory language or actions
- Personal attacks
- Publishing private information without permission
- Other conduct which could reasonably be considered inappropriate

---

**Thank you for contributing to AnimalCare Foundation! Together, we can save more lives. 🐾❤️**
