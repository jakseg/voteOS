# voteOS

A modern voting and governance platform built with Next.js, React, and Tailwind CSS. This project was initially generated using Vercel's v0 and provides a comprehensive interface for democratic participation and decision-making processes.

## Technology Stack

This project leverages several cutting-edge web technologies to deliver a robust voting experience:

- **Next.js 15.2.4** - The React framework that powers our application with server-side rendering and optimal performance
- **React 18** - The foundation for our interactive user interface components
- **Tailwind CSS** - Utility-first CSS framework for rapid, responsive design
- **Recharts** - Advanced charting library for data visualization and voting analytics
- **Shadcn/UI** - Modern component library providing accessible, customizable UI elements
- **TypeScript** - Type-safe JavaScript for improved development experience and code reliability

## Prerequisites

Before you begin setting up VoteOS locally, ensure you have the following installed on your development machine:

- **Node.js** (version 18.0 or higher recommended) - Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes bundled with Node.js) or **yarn** as your package manager
- **Git** for version control and repository management

You can verify your installations by running these commands in your terminal:

```bash
node --version
npm --version
git --version
```

## Local Development Setup

Follow these step-by-step instructions to get VoteOS running on your local machine. Each step has been tested to ensure a smooth setup experience.

### Step 1: Clone the Repository

Begin by cloning the VoteOS repository to your local development environment:

```bash
git clone https://github.com/jakseg/voteOS.git
cd voteOS
```

### Step 2: Install Dependencies

Install all required packages using npm. We use specific flags to handle dependency resolution effectively:

```bash
# Remove any existing installations to ensure a clean setup
rm -rf node_modules package-lock.json

# Install dependencies with legacy peer dependency resolution
npm install --legacy-peer-deps
```

**Important Note:** When npm asks whether to add `node_modules` to `.gitignore`, answer **yes**. The `node_modules` folder contains thousands of dependency files that should never be committed to your repository, as they can be regenerated from the `package.json` file.

### Step 3: Resolve Common Dependency Conflicts

VoteOS uses Recharts for data visualization, which requires a specific dependency that may not be automatically installed. Add this crucial package:

```bash
npm install react-is --legacy-peer-deps
```

This step prevents the common "Module not found: Can't resolve 'react-is'" error that occurs when accessing dashboard features with charts and graphs.

### Step 4: Environment Configuration

Check if your project requires environment variables by looking for configuration files:

```bash
ls .env*
```

If you find a `.env.example` file, copy it to create your local environment configuration:

```bash
cp .env.example .env.local
```

Open `.env.local` in your text editor and configure any necessary environment variables such as API keys, database connections, or authentication secrets that your specific VoteOS instance might require.

### Step 5: Start the Development Server

Launch the VoteOS application in development mode:

```bash
npm run dev
```

The application will start and display connection information:

```
▲ Next.js 15.2.4
- Local:        http://localhost:3000
- Network:      http://[your-ip]:3000
✓ Ready in 2.3s
```

Open your web browser and navigate to `http://localhost:3000` to access the VoteOS application. The development server provides hot reloading, meaning changes you make to the code will automatically refresh in your browser.

## Verifying Your Installation

To ensure everything is working correctly, test these key areas of the application:

**Homepage:** Visit `http://localhost:3000` to confirm the main interface loads properly.

**Dashboard:** Navigate to `http://localhost:3000/dashboard` to verify that charts and data visualizations render without errors.

**Login System:** Test `http://localhost:3000/login` to ensure authentication components function correctly.

## Troubleshooting Common Issues

### Dependency Resolution Errors

If you encounter errors related to package versions or peer dependencies, try these solutions:

**For React-related conflicts:**
```bash
npm install --legacy-peer-deps --force
```

**For persistent dependency issues:**
```bash
# Complete dependency reset
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

### Build Errors

If the application fails to compile, check for these common issues:

**Missing TypeScript configurations:** Ensure your `tsconfig.json` is properly configured for Next.js development.

**Tailwind CSS problems:** Verify that your `tailwind.config.js` includes all necessary paths and plugins.

**Component import errors:** Check that all Shadcn/UI components are properly installed and imported.

### Runtime Errors

**LocalStorage errors:** These typically occur when client-side code runs during server-side rendering. The solution involves wrapping such code in proper client-side checks.

**Chart rendering issues:** Ensure all Recharts dependencies are installed, particularly `react-is` as mentioned in the setup steps.

## Alternative Development Environment

If you continue experiencing dependency conflicts with npm, you can use the Vercel CLI for a development environment that closely mirrors the production environment:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Start development with Vercel's environment
vercel dev
```

This approach often resolves compatibility issues because it uses the same dependency resolution strategy as Vercel's deployment platform.

## Project Structure

Understanding the project structure will help you navigate and modify VoteOS:

```
voteOS/
├── app/                    # Next.js App Router pages and layouts
├── components/             # React components
│   └── ui/                # Shadcn/UI component library
├── lib/                   # Utility functions and configurations
├── public/                # Static assets (images, icons, etc.)
├── styles/                # Global CSS and Tailwind configurations
├── package.json           # Project dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Development Workflow

When working on VoteOS locally, follow this recommended workflow:

Make your changes in the appropriate files within the `app`, `components`, or `lib` directories. The development server will automatically detect changes and refresh your browser. Test your modifications thoroughly, especially if they involve the voting mechanism, user authentication, or data visualization components.

Before committing changes, ensure the application builds successfully by running:

```bash
npm run build
```

This command performs a production build and catches any errors that might not appear during development.


## Contributing

When contributing to VoteOS, please ensure your local environment follows the setup steps outlined in this README. This consistency helps maintain a smooth development experience for all contributors and ensures that features work reliably across different development environments.
