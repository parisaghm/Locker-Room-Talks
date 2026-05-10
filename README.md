# Locker Room Talks

A documentary video-podcast website featuring long-form conversations with voices from different backgrounds living in Finland.

## About

Locker Room Talks is a documentary video-podcast shaped around long-form conversation. Each episode brings together voices from different backgrounds living in Finland, opening space for thoughtful dialogue shaped by lived experience, cultural context, and reflection. Through conversation and carefully curated visual inserts, the series offers perspectives worth listening to — not to explain, but to understand.

This is not a commentary about immigration. It is a space for lived experience, reflection, and exchange.

## Tech Stack

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **React Router** - Client-side routing
- **shadcn-ui** - High-quality component library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Query** - Data fetching and state management
- **Vitest** - Testing framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd locker-room-talk-unfold-main
```

2. Install dependencies:
```sh
npm install
# or
bun install
```

3. Start the development server:
```sh
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/        # React components
│   ├── sections/     # Page sections (Hero, Team, Contact, etc.)
│   └── ui/           # shadcn-ui components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── assets/           # Images and static assets
```

## Deployment

This project is configured for deployment on Netlify. The `netlify.toml` file contains the deployment configuration.

To deploy:

1. Build the project:
```sh
npm run build
```

2. Deploy to Netlify (via CLI, GitHub integration, or drag-and-drop)

The build output will be in the `dist/` directory.

## Development

### Code Style

- ESLint is configured for code quality
- TypeScript strict mode is enabled
- Follow React best practices and hooks rules

### Testing

Tests are located in the `src/test/` directory. Run tests with:

```sh
npm run test
```

## License

[Add your license here]

## Contact

[Add contact information here]
