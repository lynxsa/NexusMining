# Nexus Mining - Deployment Guide

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm package manager
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/lynxsa/NexusMining.git
cd NexusMining

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
NexusMining/
├── packages/
│   └── frontend/           # React frontend application
│       ├── src/
│       │   ├── components/ # Reusable UI components
│       │   ├── modules/    # Feature modules
│       │   ├── contexts/   # React contexts
│       │   ├── hooks/      # Custom hooks
│       │   └── services/   # API services
│       ├── public/         # Static assets
│       └── dist/           # Built application
├── docs/                   # Documentation
└── README.md
```

## 🛠 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm type-check       # Run TypeScript checks

# Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format code with Prettier
```

### Environment Variables

Create a `.env.local` file in `packages/frontend/`:

```env
VITE_THINGSBOARD_URL=your-thingsboard-url
VITE_API_URL=your-api-url
VITE_CESIUM_ACCESS_TOKEN=your-cesium-token
```

## 🌐 Production Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --cwd packages/frontend
```

### Deploy to Netlify

```bash
# Build
pnpm build

# Upload dist/ folder to Netlify
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "preview"]
```

## 🔧 Configuration

### Theme Customization

Edit `packages/frontend/tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### Adding New Modules

1. Create component in `src/modules/[module-name]/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/navigation/Sidebar.tsx`

## 📊 Monitoring & Analytics

### Performance Monitoring

- Bundle analyzer: `pnpm build --analyze`
- Lighthouse audits for performance optimization
- Core Web Vitals tracking

### Error Tracking

Integration points for:

- Sentry for error tracking
- LogRocket for session recording
- Google Analytics for usage metrics

## 🔒 Security

### Best Practices

- Environment variables for sensitive data
- HTTPS only in production
- Content Security Policy headers
- Regular dependency updates

### Authentication

- JWT-based authentication
- Role-based access control (RBAC)
- Session management
- Password security policies

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage report
pnpm test:coverage
```

## 📱 Mobile Deployment

### Progressive Web App (PWA)

- Offline functionality
- Push notifications
- App-like experience on mobile

### React Native (Future)

- Shared components with web
- Native mobile performance
- Device-specific features

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm build
      - run: pnpm deploy
```

## 📈 Scaling

### Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- CDN integration

### Infrastructure

- Load balancing
- Database optimization
- Caching strategies
- Monitoring and alerting

## 🆘 Troubleshooting

### Common Issues

1. **Build Errors**: Check TypeScript version compatibility
2. **Port Conflicts**: Use different ports with `--port` flag
3. **Memory Issues**: Increase Node.js heap size
4. **Dependencies**: Clear node_modules and reinstall

### Getting Help

- GitHub Issues: Report bugs and feature requests
- Documentation: Check comprehensive guides
- Community: Join discussions and get support

## 📞 Support

For technical support and questions:

- Email: <support@lynxsa.com>
- GitHub: <https://github.com/lynxsa/NexusMining>
- Documentation: See README.md and docs/
