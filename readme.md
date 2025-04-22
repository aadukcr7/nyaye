# Nyaye - Digital Petition Management System

Nyaye is a comprehensive digital petition management system designed to streamline the process of filing, tracking, and resolving legal petitions and cases. The platform is built with modern web technologies to provide an efficient, user-friendly interface for legal professionals, administrators, and citizens.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Key Components](#key-components)
- [Data Models](#data-models)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Nyaye (meaning "justice" in Nepali) is a digital platform that modernizes the traditional petition filing and case management system. It provides a comprehensive solution for managing legal cases from submission through resolution, with features tailored for the Nepali legal context. The system supports both English and Nepali languages to ensure accessibility to all users.

## Features

### Dashboard
- Visual overview of case metrics and statistics
- Recent case activity tracking
- Status distribution charts and analytics
- Quick access to priority items

### Case Management
- Digital petition filing with multi-step forms
- Case tracking and status updates
- Document management and evidence tracking
- Timeline visualization of case progress
- Multilingual support (English/Nepali)

### People Registry
- Comprehensive database of all involved parties
- Categorization as complainants, defendants, witnesses, or lawyers
- Contact information and case associations
- Activity timeline for each individual
- Advanced filtering and sorting

### Calendar System
- Hearing schedule management
- Deadline tracking and reminders
- Meeting coordination
- Multiple calendar views (month, day, list)
- Event categorization by type

### Reporting
- Detailed analytics and statistics
- Case resolution time analysis
- Performance metrics by officer
- Geographic distribution of cases
- Custom date range filtering
- Exportable reports

### User Interface
- Responsive design for desktop and mobile
- Intuitive navigation and workflows
- Status indicators with consistent color coding
- Accessibility features

## Technology Stack

- **Frontend**: React, TypeScript
- **UI Components**: Custom components with Tailwind CSS
- **Data Visualization**: Recharts, Chart.js
- **State Management**: React hooks
- **Styling**: TailwindCSS with custom theme
- **Icons**: Lucide React icons
- **Date Handling**: date-fns

## Project Structure

The project follows a feature-based structure:

```
nyaye/
├── src/
│   ├── components/
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── layout/          # Layout components like AppLayout
│   │   ├── petitions/       # Petition-related components
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Main page components
│   └── styles/              # Global styles
└── public/                  # Static assets
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/your-organization/nyaye.git
cd nyaye

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

## Configuration

### Theme Configuration

The project uses a custom theme defined in `tailwind.config.ts`. Key color schemes include:

```typescript
nepal: {
    blue: '#D3E4FD',
    gray: '#8E9196',
    lightgray: '#F1F0FB',
    charcoal: '#403E43',
    mediumgray: '#8A898C',
    silver: '#9F9EA1',
    skyblue: '#33C3F0',
    darkgray: '#F6F6F7',
    lightbg: '#F1F1F1'
},
status: {
    pending: '#FFC107',
    investigation: '#3498DB',
    resolved: '#2ECC71',
    action: '#E74C3C'
}
```

### Language Support

The system supports both English and Nepali languages. Nepali text is styled using a custom font class:

```css
.nepali-text {
    @apply font-nepali;
}
```

## Usage

### Dashboard

The dashboard provides an overview of the system with key metrics:
- Case distribution by type and status
- Recent case activity
- Resolution rates
- Priority items requiring attention

### Filing a New Petition

1. Navigate to the Petitions page
2. Click on "New Petition"
3. Complete the multi-step form:
   - Complainant details
   - Defendant details
   - Case details
   - Evidence and witnesses
4. Submit the petition to register in the system

### Managing Cases

- View all cases from the Petitions page
- Use filters to sort by status, type, or date
- Click on a case to view detailed information
- Update case status through the Actions tab
- Attach documents and evidence as needed

### People Management

- Add and track all individuals related to cases
- Filter by person type (complainant, defendant, etc.)
- View related cases for each individual
- Track activity timeline

### Scheduling

- Use the Calendar to manage hearings and deadlines
- Add events with associated case information
- View schedule by month, day, or as a list
- Track completion status of events

## Key Components

### CaseChart

Visualization component for displaying case statistics in chart form:

```typescript
interface CaseChartProps {
  data: ChartData[];
  className?: string;
}
```

The component uses Recharts to render bar charts showing case distributions.

### CaseTable

Displays tabular data of cases with filterable columns:

```typescript
interface CaseTableProps {
  cases: Case[];
  className?: string;
}
```

### PetitionForm

Multi-step form component for filing new petitions:

```typescript
export function PetitionForm() {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Steps include:
  // - Complainant details
  // - Defendant details
  // - Case information
  // - Evidence and witnesses
}
```

### CaseViewer

Detailed view of a specific case with tabs for different information categories:

```typescript
interface CaseViewerProps {
  caseData: {
    caseNumber: string;
    petitionerName: string;
    defendantName: string;
    filingDate: string;
    caseType: string;
    status: "pending" | "investigation" | "resolved" | "action";
    description: string;
    location: string;
    officer: string;
  };
  className?: string;
}
```

## Data Models

### Case

```typescript
interface Case {
  id: string;
  caseNumber: string;
  petitionerName: string;
  defendantName: string;
  date: string;
  type: string;
  status: "pending" | "investigation" | "resolved" | "action";
  location: string;
}
```

### Person

```typescript
interface Person {
  id: string;
  name: string;
  nepaliName?: string;
  type: "complainant" | "defendant" | "witness" | "lawyer";
  gender: "male" | "female" | "other";
  age?: number;
  address: string;
  district: string;
  contact?: string;
  email?: string;
  idNumber?: string;
  idType?: string;
  relatedCases: number;
  occupation?: string;
  photo?: string;
  lastActivity: string;
}
```

### Event

```typescript
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "hearing" | "meeting" | "deadline" | "other";
  location: string;
  caseId?: string;
  caseNumber?: string;
  description: string;
  participants: string[];
  completed: boolean;
}
```

## Status Indicators

The system uses consistent color coding for case statuses:

- **Pending** (Yellow): Cases awaiting initial processing
- **Investigation** (Blue): Cases currently under investigation
- **Resolved** (Green): Successfully resolved cases
- **Legal Action** (Red): Cases requiring legal intervention

## Contributing

Contributions to Nyaye are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.