export type GeoPosition = 'granted' | 'denied' | 'prompt';

export interface GetBusinessPlanData {
  businessStrategy: string;
  inversionPlan: string;
  businessGoals: string;
  possibleRisks: string;
}