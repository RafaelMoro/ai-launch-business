export type GeoPosition = 'granted' | 'denied' | 'prompt';

export interface GeoLocationCoords {
  latitude: string | null;
  longitude: string | null;
}

export interface BusinessIdea {
  idea: string;
}

export interface GetBusinessPlanData {
  businessStrategy: string;
  inversionPlan: string;
  businessGoals: string;
  possibleRisks: string;
}

export interface Emprende25LocalStorage {
  geoLocationCoords: GeoLocationCoords;
  businessIdea: BusinessIdea;
  businessPlan: GetBusinessPlanData;
}

export interface GeolocationInfo {
  state: string;
  country: string;
}