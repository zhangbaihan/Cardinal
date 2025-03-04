import { API, graphqlOperation } from 'aws-amplify';

/**
 * GraphQL operations for analytics data
 */
const aggregateSurveyDataQuery = /* GraphQL */ `
  query AggregateSurveyData($field: String!) {
    aggregateSurveyData(field: $field) {
      field
      counts {
        value
        count
      }
    }
  }
`;

const correlationAnalysisQuery = /* GraphQL */ `
  query CorrelationAnalysis($field1: String!, $field2: String!) {
    correlationAnalysis(field1: $field1, field2: $field2) {
      field1
      field2
      correlations {
        value1
        value2
        count
      }
    }
  }
`;

/**
 * Data analysis results types
 */
export interface CountResult {
  value: string;
  count: number;
}

export interface AggregateResult {
  field: string;
  counts: CountResult[];
}

export interface CorrelationPoint {
  value1: string;
  value2: string;
  count: number;
}

export interface CorrelationResult {
  field1: string;
  field2: string;
  correlations: CorrelationPoint[];
}

/**
 * Service for analyzing survey data
 */
export const analyticsService = {
  /**
   * Get aggregated data for a specific survey field
   * @param field The survey field to aggregate
   */
  async getAggregatedData(field: string): Promise<AggregateResult | null> {
    try {
      const result: any = await API.graphql(
        graphqlOperation(aggregateSurveyDataQuery, { field })
      );
      
      return result.data.aggregateSurveyData;
    } catch (error) {
      console.error(`Error getting aggregated data for ${field}:`, error);
      return null;
    }
  },
  
  /**
   * Get correlation analysis between two survey fields
   * @param field1 The first survey field to correlate
   * @param field2 The second survey field to correlate
   */
  async getCorrelationAnalysis(field1: string, field2: string): Promise<CorrelationResult | null> {
    try {
      const result: any = await API.graphql(
        graphqlOperation(correlationAnalysisQuery, { field1, field2 })
      );
      
      return result.data.correlationAnalysis;
    } catch (error) {
      console.error(`Error getting correlation between ${field1} and ${field2}:`, error);
      return null;
    }
  },
  
  /**
   * Get chart data for a specific field in format compatible with Chart.js
   * @param field The survey field to get chart data for
   */
  async getChartData(field: string): Promise<any> {
    try {
      const aggregateResult = await this.getAggregatedData(field);
      
      if (!aggregateResult) {
        return null;
      }
      
      // Process data for Chart.js
      const labels = aggregateResult.counts.map(item => item.value);
      const data = aggregateResult.counts.map(item => item.count);
      
      // Generate nice colors for the chart
      const backgroundColors = labels.map((_, i) => {
        return `hsl(${i * (360 / labels.length)}, 70%, 60%)`;
      });
      
      return {
        labels,
        datasets: [{
          label: field,
          data,
          backgroundColor: backgroundColors,
          borderWidth: 1
        }]
      };
    } catch (error) {
      console.error(`Error getting chart data for ${field}:`, error);
      return null;
    }
  }
}; 