# 🚀 SwiftPay - Digital Wallet Frontend

> **Modern, Secure, and Fast Digital Wallet for Bangladesh**

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-blue.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-blue.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📖 Overview

SwiftPay is a cutting-edge digital wallet application designed to revolutionize digital payments in Bangladesh. Built with modern web technologies, it provides a secure, fast, and user-friendly platform for managing digital finances, sending money, and conducting transactions.

### ✨ Key Features

- 🔐 **Bank-Level Security** - SSL encryption, 2FA protection, and secure authentication
- 💳 **Multi-Role Support** - Personal users, agents, and administrators
- 💰 **Instant Transactions** - Lightning-fast money transfers and payments
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🌙 **Dark Mode** - Beautiful light and dark theme support
- 🎨 **Modern UI/UX** - Clean, professional interface with smooth animations

## 🏗️ Architecture

### Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 4 with custom design system
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router v7
- **UI Components**: shadcn/ui component library
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner toast notifications
- **Runtime**: Bun (JavaScript runtime)

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # Base UI components (shadcn/ui)
│   ├── fintech/       # Fintech-specific components
│   ├── layouts/       # Layout components
│   └── common/        # Common utility components
├── pages/             # Page components
│   ├── admin/         # Admin dashboard pages
│   ├── agent/         # Agent dashboard pages
│   └── user/          # User dashboard pages
├── redux/             # State management
│   └── features/      # Feature-specific slices
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
└── config/            # Configuration files
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **Bun**: 1.0.0 or higher (recommended)
- **Git**: For version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/swiftpay-frontend.git
   cd swiftpay-frontend
   ```

2. **Install dependencies**

   ```bash
   # Using Bun (recommended)
   bun install

   # Or using npm
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```env
   VITE_API_BASE_URL=your_api_base_url
   VITE_APP_NAME=SwiftPay
   ```

4. **Start the development server**

   ```bash
   # Using Bun
   bun dev

   # Or using npm
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Using Bun
bun run build

# Or using npm
npm run build
```

## 🎯 Features

### 🔐 Authentication & Security

- **Multi-Role Login**: Support for users, agents, and administrators
- **Secure Authentication**: JWT-based authentication with refresh tokens
- **Role-Based Access Control**: Different dashboards and permissions per role
- **2FA Protection**: Enhanced security for sensitive operations

### 💳 Digital Wallet

- **Balance Management**: Real-time balance tracking and updates
- **Transaction History**: Comprehensive transaction logs and analytics
- **Money Transfer**: Send money to other users instantly
- **Cash-In/Cash-Out**: Agent-assisted cash operations

### 👥 User Management

- **User Profiles**: Detailed user information and preferences
- **Agent Management**: Admin tools for managing agent accounts
- **Transaction Monitoring**: Real-time transaction tracking and reporting

### 🎨 User Interface

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Mode**: Beautiful light and dark theme support
- **Modern Components**: Professional UI components with smooth animations
- **Accessibility**: WCAG compliant design for inclusive access

## 🛠️ Development

### Available Scripts

```bash
# Development
bun dev              # Start development server
bun run dev          # Alternative command

# Building
bun run build        # Build for production
bun run preview      # Preview production build

# Code Quality
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint issues
bun run type-check   # TypeScript type checking

# Testing
bun run test         # Run tests
bun run test:watch   # Run tests in watch mode
```

### Code Style

This project follows modern React and TypeScript best practices:

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality

### Component Development

Components are built using a modular approach:

```tsx
// Example component structure
import { ComponentProps } from "@/types";
import { cn } from "@/lib/utils";

interface MyComponentProps extends ComponentProps {
  variant?: "default" | "primary";
  size?: "sm" | "md" | "lg";
}

export const MyComponent: React.FC<MyComponentProps> = ({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "base-styles",
        variant === "primary" && "primary-styles",
        size === "lg" && "large-styles",
        className
      )}
      {...props}>
      {children}
    </div>
  );
};
```

## 🔧 Configuration

### Environment Variables

| Variable            | Description          | Default                     |
| ------------------- | -------------------- | --------------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` |
| `VITE_APP_NAME`     | Application name     | `SwiftPay`                  |
| `VITE_APP_VERSION`  | Application version  | `1.0.0`                     |

### Tailwind Configuration

The project uses a custom Tailwind configuration with:

- **Custom Color Palette**: Fintech-specific colors
- **Component Variants**: Predefined component styles
- **Responsive Breakpoints**: Mobile-first responsive design
- **Dark Mode**: Automatic dark mode support

## 📱 Responsive Design

SwiftPay is built with a mobile-first approach:

- **Mobile**: Optimized for smartphones (320px+)
- **Tablet**: Responsive layouts for tablets (768px+)
- **Desktop**: Enhanced experiences for larger screens (1024px+)
- **Large Screens**: Optimized for wide displays (1280px+)

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🧪 Testing

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage

# Run specific test file
bun run test src/components/Button.test.tsx
```

## 📦 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `bun run build`
   - **Output Directory**: `dist`
   - **Install Command**: `bun install`

### Netlify

1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `dist`

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Team** - Amazing frontend framework
- **Vite Team** - Fast build tool
- **Bun Team** - Fast JavaScript runtime

## 📞 Support

- **Documentation**: [docs.swiftpay.com](https://docs.swiftpay.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/swiftpay-frontend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/swiftpay-frontend/discussions)
- **Email**: support@swiftpay.com

## 🔮 Roadmap

- [ ] **PWA Support** - Progressive Web App capabilities
- [ ] **Offline Mode** - Basic functionality without internet
- [ ] **Push Notifications** - Real-time transaction alerts
- [ ] **Multi-Language** - Internationalization support
- [ ] **Advanced Analytics** - Enhanced reporting and insights
- [ ] **API Documentation** - Comprehensive API docs
- [ ] **Performance Monitoring** - Real-time performance metrics

---

<div align="center">
  <p>Made with ❤️ by the SwiftPay Team</p>
  <p>Building the future of digital payments in Bangladesh</p>
</div>
