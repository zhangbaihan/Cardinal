# Cardinal - Stanford Community Survey

Cardinal is a web application inspired by the Harvard Crimson's annual freshman class survey. It collects and visualizes data about the background, interests, and lifestyle of the Stanford community through interactive graphs and charts.

## Features

- User registration and authentication
- Comprehensive survey covering demographics, politics, academics, and lifestyle
- Interactive data visualizations and insights
- Modern, responsive UI built with Next.js and Tailwind CSS

## Project Structure

### Core Directories

- `/src/app`: Next.js app router pages
  - `/app/dashboard`: Data visualization dashboard
  - `/app/survey`: Multi-section survey form
  - `/app/login` & `/app/register`: Authentication pages
  - `/app/page.tsx`: Landing page
- `/src/components`: Reusable React components
  - `Header.tsx`: Navigation header with login button
  - `SurveyChart.tsx`: Reusable chart component for data visualization
- `/src/lib`: Utility functions and helpers
  - `surveyData.ts`: Synthetic data generation and processing
  - `chartConfig.ts`: Chart.js configuration and setup
- `/public`: Static assets including images

### Key Files

- `src/app/survey/page.tsx`: Contains the multi-section survey form with validation logic
- `src/app/dashboard/page.tsx`: Dashboard with interactive charts organized by category
- `src/lib/surveyData.ts`: Generates 200 synthetic user responses for testing
- `src/components/SurveyChart.tsx`: Reusable chart component that supports multiple chart types
- `src/lib/chartConfig.ts`: Global Chart.js configuration with Stanford branding

## Temporary/Development Elements

### Synthetic Data

The application currently uses synthetic data for development and testing purposes:

- **Location**: `src/lib/surveyData.ts`
- **Purpose**: Provides realistic test data for the dashboard visualizations
- **Implementation**: 
  - Generates 200 random survey responses
  - Includes correlations between certain fields (e.g., income and financial aid)
  - Contains helper functions for data processing and chart preparation
- **Future Plans**: Will be replaced with real database queries when the backend is fully implemented

### Authentication

- Currently uses a placeholder login/register flow
- Will be integrated with NextAuth.js for proper authentication

### Database Integration

- Prisma is included in the dependencies but not fully implemented
- The database schema needs to be created in a future update
- Currently all data is generated on the client side

## Survey Structure

The survey is divided into four main sections:

1. **Demographics & Admissions** (17 questions)
   - Basic information like gender, ethnicity, age
   - Admissions details like financial aid, legacy status

2. **Politics & Beliefs** (4 questions)
   - Political views and party affiliation
   - Religious beliefs and religiosity

3. **Academics and Extracurriculars** (6 questions)
   - Study habits and academic interests
   - Extracurricular activities

4. **Lifestyle** (4 questions)
   - Personal lifestyle questions
   - Technology preferences

## Dashboard Visualization

The dashboard displays interactive charts for all survey questions, organized by category:

- Uses Chart.js and react-chartjs-2 for visualizations
- Supports multiple chart types (bar, pie, doughnut)
- Features a sticky sidebar for easy navigation between categories
- Displays Stanford branding colors and styling

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Development Roadmap

### Immediate Next Steps

1. Implement proper database integration with Prisma
2. Set up NextAuth.js for authentication
3. Create API endpoints for survey submission and data retrieval
4. Add user profile management

### Future Enhancements

1. Add more advanced data analysis and correlations
2. Implement year-over-year comparison features
3. Add admin dashboard for data management
4. Enhance mobile responsiveness

## Development

This project uses:
- TypeScript for type safety
- Next.js for server-side rendering and routing
- Tailwind CSS for styling
- Chart.js for data visualizations
- Prisma for database access (planned)

## Deployment

The application can be deployed to platforms like Vercel or Netlify with minimal configuration.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 