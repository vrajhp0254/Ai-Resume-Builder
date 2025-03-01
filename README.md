# AI Resume Builder

An intelligent resume builder that uses AI to help create professional resumes with customizable themes and automated content suggestions.

## Features

- 🤖 AI-powered content suggestions for summaries and skills
- 📝 Multiple resume themes
- 💼 Professional experience and education sections
- 🎯 Skills management with AI suggestions
- 📄 PDF generation with theme support
- 🔒 Secure authentication with Clerk

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- MongoDB
- Google's Gemini AI
- Clerk Authentication
- TailwindCSS
- jsPDF

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or later
- MongoDB instance
- Google AI (Gemini) API key
- Clerk account and credentials

## Environment Variables

Create a `.env.local` file in the root directory with:

- MONGODB_URL=your_mongodb_connection_string
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
- CLERK_SECRET_KEY=your_clerk_secret_key
- GEMINI_API_KEY=your_gemini_api_key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (root)/
│   │   └── resume/
│   │       ├── page.tsx         # Resume creation form
│   │       └── view/
│   │           └── [_id]/
│   │               └── page.tsx # Resume viewer/PDF generator
│   ├── api/
│   │   ├── create-resume/
│   │   ├── suggest-skills/
│   │   └── suggest-summary/
│   ├── components/
│   │   ├── SkillSuggestions.tsx
│   │   └── ThemeSelector.tsx
│   └── themes/
│       └── resumeThemes.ts
├── models/
│   └── resume.model.ts
└── db/
    └── resumedb.ts
```

## Usage

1. Sign in using your account
2. Fill in your personal information
3. Use AI suggestions for professional summary and skills
4. Add your experience and education
5. Choose a theme
6. Generate and download your PDF resume

## Known Issues

- PDF generation might require adjustments for very long content
- Theme customization is limited to predefined options
- Skills suggestions might need refinement based on specific industries

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit with meaningful messages
5. Push to your fork
6. Create a Pull Request

### Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

## Bug Reports

If you find a bug, please create an issue with:

1. Bug description
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Environment details

## Feature Requests

For feature requests, create an issue with:

1. Feature description
2. Use case
3. Proposed implementation (optional)
4. Additional context

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Acknowledgments

- Thanks to Google's Gemini AI for powering our content suggestions
- Clerk for authentication
- All contributors who have helped improve this project

---

Made with ❤️ by Vraj