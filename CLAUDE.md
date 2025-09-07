# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Soil Analysis application - A Next.js web app for GPS-based soil analysis with data upload and sample management capabilities.

## Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture Notes

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom shadcn/ui components
- **Icons**: Lucide React

### Project Structure
```
/app           - Next.js app directory (pages and layouts)
/components    - React components
  /ui          - shadcn/ui base components
/lib           - Utility functions
```

### Key Components
- `Navbar` - Top navigation with app title and avatar
- `GpsInput` - GPS coordinate input with location summary display
- `MainTabs` - Tabbed interface for main content areas (Answer, Upload Data, Send Sample, Request Instrument)

## Common Tasks

### Adding New UI Components
Use existing shadcn/ui components in `/components/ui/` as templates. Follow the established pattern using class-variance-authority for variants.

### Modifying Tab Content
Edit `/components/main-tabs.tsx` to add content to the blank tab panels.

### GPS Coordinate Processing
The GPS input currently shows placeholder location data. To integrate real geocoding, update the `handleSubmit` function in `/components/gps-input.tsx`.