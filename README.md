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

## AWS Backend Integration

The Cardinal app is designed to be deployed on AWS, utilizing a serverless architecture for scalability and cost efficiency.

### AWS Services Used

- **AWS Amplify**: Full-stack deployment platform
- **Amazon Cognito**: User authentication and authorization
- **AWS AppSync**: GraphQL API service
- **Amazon DynamoDB**: NoSQL database for storing survey data
- **AWS Lambda**: Serverless functions for analytics
- **Amazon S3**: Static file storage

### Backend Structure

1. **Authentication**: Amazon Cognito provides user pools for secure authentication
2. **Database**: DynamoDB tables for `User` and `Survey` data
3. **API Layer**: AppSync GraphQL API with secure resolvers
4. **Analytics**: Lambda functions for data aggregation and correlation analysis

### Deployment Instructions

#### Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- AWS Amplify CLI installed (`npm install -g @aws-amplify/cli`)

#### Step 1: Initialize Amplify

```bash
# Configure Amplify CLI
amplify configure

# Initialize Amplify in the project
cd cardinal-app
amplify init
```

Follow the prompts to configure your project:
- Choose your AWS profile
- Enter a name for your environment (e.g., `dev`)
- Choose your default editor
- Select your app type as `javascript`
- Set the framework as `react`
- Set the source directory path as `src`
- Set the distribution directory path as `.next`
- Set the build command as `npm run build`
- Set the start command as `npm run start`

#### Step 2: Add Authentication

```bash
amplify add auth
```

Choose the default configuration or customize based on your needs.

#### Step 3: Add API

```bash
amplify add api
```

Choose GraphQL, and use the existing schema provided in the repository.

#### Step 4: Add Lambda Functions

```bash
amplify add function
```

Name it `surveyAnalytics` and select Node.js for the runtime.

#### Step 5: Push Configuration to AWS

```bash
amplify push
```

This will provision all the necessary resources in your AWS account.

#### Step 6: Deploy the Application

```bash
amplify publish
```

This will build and deploy your application to AWS.

### Environment Variables

After deployment, Amplify will generate a set of environment variables that need to be added to your project. Create a `.env.local` file with the following (replace with actual values):

```
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_API_ENDPOINT=https://example.appsync-api.us-east-1.amazonaws.com/graphql
NEXT_PUBLIC_USER_POOL_ID=us-east-1_example
NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID=example
```

### Testing Locally with AWS Backend

To test the application locally with the AWS backend:

```bash
npm run dev
```

The application will connect to your AWS resources while running locally.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 