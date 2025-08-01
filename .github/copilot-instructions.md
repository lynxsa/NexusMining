# Nexus Mining System - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a comprehensive mining management system called Nexus Mining that integrates:
- IoT data collection via ThingsBoard
- 3D visualization with CesiumJS
- Real-time asset tracking
- Safety management (HazardVision & ThibaAlert)
- Digital twin capabilities
- AI-driven predictive maintenance

## Architecture
- **Frontend**: React + TypeScript + Tailwind CSS + Vite
- **Backend**: Node.js/NestJS + GraphQL + PostgreSQL
- **IoT Platform**: ThingsBoard integration
- **3D Engine**: CesiumJS for digital twin
- **Package Manager**: pnpm (monorepo)

## Code Style Guidelines
1. Use functional components with TypeScript
2. Follow the blue/navy theme colors (primary, navy, secondary)
3. Implement dark mode support in all components
4. Use Tailwind CSS classes for styling
5. Create reusable components in `/components` directory
6. Organize modules by feature in `/modules` directory
7. Use custom hooks for shared logic
8. Implement proper error handling
9. Add loading states for async operations
10. Ensure accessibility (ARIA labels, keyboard navigation)

## Color Palette
- **Primary**: Blue shades (#3b82f6 to #1d4ed8)
- **Navy**: Dark blue shades (#0ea5e9 to #082f49)
- **Secondary**: Gray shades for backgrounds
- **Status Colors**: Green (success), Yellow (warning), Red (error)

## Component Structure
```
src/
├── components/
│   ├── navigation/    # Sidebar, TopBar
│   └── data-viz/      # Charts, KPIs, Maps
├── modules/
│   ├── dashboard/     # Executive dashboard
│   ├── asset-track/   # Equipment management
│   ├── safety/        # HazardVision & ThibaAlert
│   └── twin/          # Digital twin hub
├── layouts/           # Page layouts
├── providers/         # Context providers
├── hooks/             # Custom hooks
└── contexts/          # React contexts
```

## Key Features to Implement
1. **AssetTrack AI**: Equipment monitoring with predictive maintenance
2. **HazardVision**: Computer vision safety alerts
3. **ThibaAlert**: Mobile hazard reporting
4. **Digital Twin Hub**: 3D mine visualization
5. **SmartOps Insights**: Analytics dashboard
6. **ConnectedWorker**: Wearable device integration
7. **Energy & ESG Hub**: Sustainability metrics
8. **WorkshopOps**: Supply chain management

## Integration Points
- ThingsBoard for IoT device management
- CesiumJS for 3D earth/terrain rendering
- MQTT for real-time telemetry
- WebSockets for live updates
- GraphQL for API communication

## Development Patterns
- Use React Query for data fetching
- Implement optimistic updates
- Create loading skeletons
- Add error boundaries
- Use React.lazy for code splitting
- Implement proper TypeScript types
- Add unit tests for utilities
- Create Storybook stories for components

When generating code, ensure it follows these patterns and integrates well with the existing codebase structure.
