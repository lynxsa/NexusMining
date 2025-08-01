# Nexus Mining System

A comprehensive, cloud-native mining management system that integrates IoT, 3D visualization, AI-driven insights, and safety management to transform mining operations.

![Nexus Mining Dashboard](https://via.placeholder.com/800x400/2563eb/ffffff?text=Nexus+Mining+Dashboard)

## 🌟 Overview

Nexus Mining addresses the multifaceted challenges of South African mining operations by combining:
- **Real-time IoT telemetry** via ThingsBoard integration
- **3D Digital Twin** powered by CesiumJS
- **AI-driven predictive maintenance** with machine learning models
- **Advanced safety management** through computer vision and mobile reporting
- **Modern, responsive UI** with dark/light mode support

## 🚀 Key Features

### 🏭 Core Modules

- **AssetTrack AI**: Equipment health monitoring with predictive maintenance
- **HazardVision™**: Computer vision-based safety monitoring
- **ThibaAlert**: Mobile hazard reporting system
- **Digital Twin Hub**: 3D mine visualization and scenario simulation
- **SmartOps Insights**: Analytics dashboard with real-time KPIs
- **ConnectedWorker**: Wearable device integration and workforce tracking
- **Energy & ESG Hub**: Sustainability metrics and carbon footprint tracking
- **WorkshopOps**: Supply chain and maintenance management

### 💡 Technology Highlights

- **Modular Architecture**: Independently deployable microservices
- **Real-time Updates**: WebSocket-based live data streaming
- **Scalable Backend**: GraphQL API with PostgreSQL database
- **Modern Frontend**: React 18 + TypeScript + Tailwind CSS
- **3D Visualization**: CesiumJS integration for immersive experiences
- **Theme Support**: Elegant blue/navy design with dark mode

## 🏗️ Architecture

```
nexus-mining/
├── packages/
│   ├── frontend/          # React + TypeScript + Vite
│   ├── backend/           # NestJS + GraphQL + PostgreSQL
│   ├── cesium-module/     # 3D visualization components
│   ├── thingsboard-integration/  # IoT data connectors
│   └── shared/            # Common types and utilities
├── thingsboard/           # IoT platform (submodule)
├── cesium/               # 3D engine (submodule)
└── docker-compose.yml    # Development environment
```

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite | Responsive web interface |
| **Backend** | NestJS, GraphQL, PostgreSQL, TimescaleDB | API and data management |
| **IoT Platform** | ThingsBoard, MQTT, Apache Kafka | Device management and telemetry |
| **3D Engine** | CesiumJS, WebGL, Deck.gl | Digital twin and visualization |
| **AI/ML** | Python, TensorFlow, MLflow | Predictive analytics |
| **DevOps** | Docker, Kubernetes, GitHub Actions | Deployment and CI/CD |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm 8+
- Docker and Docker Compose
- Git with LFS support

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/nexus-mining.git
cd nexus-mining

# Install dependencies
pnpm install

# Start development environment
pnpm run setup
pnpm run dev
```

### Development Servers

```bash
# Frontend (React + Vite)
cd packages/frontend
pnpm run dev

# Backend (NestJS)
cd packages/backend
pnpm run start:dev

# ThingsBoard (IoT Platform)
cd thingsboard
docker-compose up -d

# CesiumJS (3D Visualization)
cd cesium
npm start
```

## 📱 User Interfaces

### Executive Dashboard
- Real-time KPI monitoring
- 3D mine site overview
- Equipment status tracking
- Safety metrics display

### Digital Twin Hub
- Interactive 3D mine model
- Scenario simulation tools
- Asset positioning and tracking
- Environmental monitoring

### Mobile Apps (ThibaAlert)
- Hazard reporting with photo capture
- Two-way communication with safety teams
- Geolocation-based incident logging
- Offline mode support

## 🔧 Configuration

### Environment Variables

```bash
# Frontend (.env)
VITE_API_URL=http://localhost:3000/graphql
VITE_CESIUM_ACCESS_TOKEN=your_cesium_token
VITE_THINGSBOARD_URL=http://localhost:8080

# Backend (.env)
DATABASE_URL=postgresql://user:pass@localhost:5432/nexus
THINGSBOARD_URL=http://localhost:8080
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
```

### Theme Customization

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3b82f6',  // Light blue
          600: '#2563eb',  // Primary blue
          700: '#1d4ed8',  // Navy blue
        }
      }
    }
  }
}
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Frontend tests
cd packages/frontend
pnpm run test

# Backend tests
cd packages/backend
pnpm run test:e2e

# Visual regression tests
pnpm run test:visual
```

## 📊 Performance Metrics

- **Load Time**: < 2 seconds for dashboard
- **Real-time Updates**: < 100ms latency
- **3D Rendering**: 60 FPS on modern hardware
- **Offline Support**: 48 hours of cached data
- **Scalability**: 10,000+ concurrent users

## 🔒 Security Features

- **Zero-Trust Architecture**: RBAC with MFA
- **Data Encryption**: AES-256 encryption at rest
- **Network Security**: mTLS for service communication
- **Compliance**: SOC 2, ISO 27001 ready
- **Audit Logging**: Comprehensive activity tracking

## 🌍 Deployment

### Production Deployment

```bash
# Build for production
pnpm run build

# Deploy to Kubernetes
kubectl apply -f k8s/

# Monitor deployment
kubectl get pods -n nexus-mining
```

### Docker Compose (Development)

```yaml
version: '3.8'
services:
  frontend:
    build: ./packages/frontend
    ports:
      - "3000:80"
  
  backend:
    build: ./packages/backend
    ports:
      - "4000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/nexus
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=nexus
      - POSTGRES_PASSWORD=password
```

## 📈 Roadmap

### Phase 1 (Current - Q3 2025)
- [x] Core dashboard and KPI tracking
- [x] Basic 3D visualization
- [x] Theme system with dark mode
- [ ] ThingsBoard integration
- [ ] Mobile hazard reporting

### Phase 2 (Q4 2025)
- [ ] AI-powered predictive maintenance
- [ ] Advanced safety monitoring
- [ ] Scenario simulation tools
- [ ] Energy management dashboard

### Phase 3 (Q1 2026)
- [ ] Machine learning model deployment
- [ ] Advanced 3D features
- [ ] Multi-site management
- [ ] Custom dashboard builder

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

```bash
# Fork the repository
git clone https://github.com/your-username/nexus-mining.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m 'Add amazing feature'

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.nexusmining.com](https://docs.nexusmining.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/nexus-mining/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/nexus-mining/discussions)
- **Email**: support@nexusmining.com

## 🙏 Acknowledgments

- [ThingsBoard](https://thingsboard.io/) for IoT platform foundation
- [CesiumJS](https://cesium.com/) for 3D visualization capabilities
- [React](https://reactjs.org/) and [TypeScript](https://typescriptlang.org/) communities
- South African mining industry for requirements and feedback

---

**Built with ❤️ for the mining industry by the Nexus Mining Team**
