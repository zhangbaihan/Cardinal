# Cardinal - Stanford Community Survey

Cardinal is a web application inspired by the Harvard Crimson's annual freshman class survey. It collects and visualizes data about the background, interests, and lifestyle of the Stanford community through interactive graphs and charts.

## Features

- User registration and authentication
- Comprehensive survey covering demographics, politics, academics, and lifestyle
- Interactive data visualizations and insights
- Modern, responsive UI built with Next.js and Tailwind CSS
- Serverless backend with AWS Lambda, API Gateway, DynamoDB, and Cognito

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
  - `apiConfig.js`: Backend API configuration
  - `apiService.js`: Frontend API service for backend communication
- `/public`: Static assets including images
- `/backend`: Serverless backend code (AWS SAM)
  - `/src/functions`: Lambda function handlers
  - `template.yaml`: Infrastructure as Code for AWS resources

### Key Files

- `src/app/survey/page.tsx`: Contains the multi-section survey form with validation logic
- `src/app/dashboard/page.tsx`: Dashboard with interactive charts organized by category
- `src/lib/surveyData.ts`: Generates 200 synthetic user responses for testing
- `src/components/SurveyChart.tsx`: Reusable chart component that supports multiple chart types
- `src/lib/chartConfig.ts`: Global Chart.js configuration with Stanford branding
- `backend/template.yaml`: AWS SAM template defining backend infrastructure

## Backend Architecture

The application uses a serverless backend built with AWS services:

- **AWS Lambda**: Serverless functions that handle API requests
- **Amazon API Gateway**: RESTful API endpoints
- **Amazon DynamoDB**: NoSQL database for storing survey responses and user data
- **Amazon Cognito**: User authentication and authorization

See the [backend README](./backend/README.md) for more details on the backend architecture and deployment.

## Temporary/Development Elements

### Synthetic Data

The application currently uses synthetic data for development and testing purposes:

- **Location**: `src/lib/surveyData.ts`
- **Purpose**: Provides realistic test data for the dashboard visualizations
- **Implementation**: 
  - Generates 200 random survey responses
  - Includes correlations between certain fields (e.g., income and financial aid)
  - Contains helper functions for data processing and chart preparation
- **Future Plans**: Will be replaced with real database queries from the DynamoDB backend

### Authentication

- Currently uses a placeholder login/register flow
- Will be integrated with Cognito for proper authentication

### Database Integration

- The backend is configured to use DynamoDB for data storage
- Currently synthetic data is used on the frontend during development
- Full integration will connect the frontend to the backend API

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
- AWS account (for backend deployment)
- AWS CLI configured locally
- AWS SAM CLI (for backend development)

### Frontend Installation

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

### Backend Deployment

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Deploy to AWS:
   ```bash
   npm run deploy
   ```

4. Update frontend environment variables with the outputs from the deployment

## Development Roadmap

### Immediate Next Steps

1. Connect frontend to the serverless backend
2. Implement proper authentication with Cognito
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
- AWS SAM for serverless backend deployment

## Deployment

### Frontend Deployment

The frontend can be deployed to platforms like Vercel or Netlify with minimal configuration.

### Backend Deployment

The backend is deployed to AWS using the SAM CLI. The deployment process creates:
- Lambda functions
- API Gateway endpoints
- DynamoDB tables
- Cognito user pools

## License

This project is licensed under the MIT License - see the LICENSE file for details. 