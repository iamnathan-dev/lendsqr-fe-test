📘 Lendsqr Frontend Assessment with Next.js

This is a modern [Next.js](https://nextjs.org) project using the App Router, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🛠️ Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: SCSS, Tailwind CSS, ShadCN UI
- State Management: Zustand, React Query
- Data Visualization: Recharts
- Testing: Jest
- Component Design System: ShadCN (Radix UI + Tailwind-based)

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages and layouts
│   ├── login/             # Authentication page
│   ├── dashboard/         # Main dashboard
│   ├── users/            # Users listing page
│   └── profile/          # User profile pages
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form-related components
│   └── charts/           # Data visualization components
├── lib/                   # Utility functions and configurations
├── shared/               # Types, constants, and shared resources
└── styles/               # Global styles and SCSS modules
```

## 🚀 Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Running Tests

```bash
# Run unit tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

## 📦 Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🔧 Key Features

- **Authentication**: Secure login system with validation
- **Dashboard**: Interactive metrics and data visualization
- **User Management**: Complete user CRUD operations
- **Profile Management**: Detailed user profiles
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Code splitting and lazy loading
- **Type Safety**: Full TypeScript implementation
- **Automated Testing**: Comprehensive test coverage

## 🌐 API Integration

The project uses React Query for API data fetching with features like:

- Automatic caching
- Background updates
- Loading states
- Error handling
- Retry logic

## 📚 State Management

- **Zustand**: Manages local UI state (sidebar, filters, modals)
- **React Query**: Handles server state and data fetching

## 💅 Styling Architecture

- Tailwind CSS for utility-first styling
- SCSS modules for component-specific styles
- ShadCN UI for accessible base components
- Custom theme configuration

## 🔍 Code Quality Tools

- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks
- Jest for testing

## 📖 Learn More

To learn more about the tech stack:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [ShadCN UI](https://ui.shadcn.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query)
- [Recharts](https://recharts.org)

## 🚀 Deployment

Deploy on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy!

For more deployment options, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
