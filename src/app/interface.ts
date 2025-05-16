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

export interface GeolocationInfo {
  state: string;
  country: string;
}

export interface Competitors {
  name: string;
  description: string;
  website: string;
  logoDescription: string;
  competition: string;
  competitionType: string;
  competitionSize: string;
  competitionLocation: string;
  differenciator: string;
}

export interface BuyerPersona {
  name: string;
  demographicData: string;
  behaviorMotivations: string;
  needs: string;
}

export interface Budget {
  budget: {
    [concept: string]: number;
  };
  considerations: string;
}

// Local storage
export interface Emprende25LocalStorage {
  geoLocationCoords: GeoLocationCoords;
  geoLocationInfo: GeolocationInfo
  businessIdea: BusinessIdea;
  businessPlan: GetBusinessPlanData;
  competitors: Competitors[];
  buyerPersonas: BuyerPersona[];
  budget: Budget;
}