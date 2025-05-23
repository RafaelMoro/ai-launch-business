'use client'
import { useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import GetPosition from "./GetPosition";
import UserForm from "./UserForm";
import { Budget, BuyerPersona, Competitors, Emprende25LocalStorage, GeolocationInfo, GetBusinessPlanData } from "./interface";
import ShowBusinessPlan from "./components/ShowBusinessPlan";
import CompetitorsInfo from "./components/CompetitorsInfo";
import { getLocalStorageInfo } from "./utils/getLocalStorageInfo";
import BuyerPersonaInfo from "./components/BuyerPersonaInfo";
import GetBudgetInfo from "./components/GetBudgetInfo";

const queryClient = new QueryClient()

export default function Home() {
  const [businessIdea, setBusinessIdea] = useState("")
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [businessPlan, setBusinessPlan] = useState<GetBusinessPlanData | null>(null);
  const [locationInfo, setLocationInfo] = useState<GeolocationInfo | null>(null)
  const [competitors, setCompetitors] = useState<Competitors[]>([])
  const [buyerPersonas, setBuyerPersonas] = useState<BuyerPersona[]>([])
  const [budget, setBudget] = useState<Budget | null>(null)

  const addBusinessPlan = (data: GetBusinessPlanData) => {
    setBusinessPlan(data);
  };
  const addBuyerPersona = (data: BuyerPersona[]) => {
    setBuyerPersonas(data)
  }
  const updateBudget = (data: Budget) => {
    setBudget(data)
  }
  const addLocationInfo = (data: GeolocationInfo) => setLocationInfo(data);
  const addLatitude = (lat: number) => setLatitude(lat);
  const addLongitude = (long: number) => setLongitude(long);
  const updateBusinessIdea = (idea: string) => setBusinessIdea(idea);
  const addCompetitors = (data: Competitors[]) => setCompetitors(data);

  const resetAllData = () => {
    setBusinessIdea("");
    setLatitude(null);
    setLongitude(null);
    setBusinessPlan(null);
    setLocationInfo(null);
    setCompetitors([]);
    setBuyerPersonas([]);
    setBudget(null);
  };

  // Set local storage
  useEffect(() => {
    const localStorageInfo: Emprende25LocalStorage = getLocalStorageInfo();
    const IsEmptyLocalStorage = Object.keys(localStorageInfo).length < 1;

    if (IsEmptyLocalStorage) {
      return;
    }

    const {
      geoLocationCoords = { latitude: null, longitude: null },
      businessPlan,
      businessIdea,
      geoLocationInfo,
      competitors,
      buyerPersonas,
    } = localStorageInfo;

    // Check if geoLocationCoords exists and has valid values
    if (geoLocationCoords?.latitude && geoLocationCoords?.longitude) {
      addLatitude(Number(geoLocationCoords.latitude))
      addLongitude(Number(geoLocationCoords.longitude))
    }

    if (businessPlan) {
      addBusinessPlan(businessPlan)
    }
    if (businessIdea) {
      updateBusinessIdea(businessIdea.idea)
    }
    if (geoLocationInfo) {
      addLocationInfo(geoLocationInfo)
    }
    if (competitors) {
      addCompetitors(competitors)
    }
    if (buyerPersonas) {
      addBuyerPersona(buyerPersonas)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <main className="max-w-7xl mx-auto min-h-screen flex flex-col p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">Emprende 25+</h1>
        <p className="text-xl text-gray-900 dark:text-white text-pretty">Obten toda la información necesaria para comenzar con tu emprendimiento. Para ello, necesitamos contar con tu ubicación para ofrecerte información más precisa.</p>
        <GetPosition longitude={longitude} latitude={latitude} addLatitude={addLatitude} addLongitude={addLongitude} />
        <UserForm
          addBusinessPlan={addBusinessPlan}
          businessIdea={businessIdea}
          updateBusinessIdea={updateBusinessIdea}
          businessPlan={businessPlan}
          resetAllData={resetAllData}
          />
        { businessPlan && (
          <ShowBusinessPlan businessPlan={businessPlan} businessIdea={businessIdea} />
        )}
        { businessPlan && (
          <CompetitorsInfo
            businessIdea={businessIdea}
            latitude={latitude}
            longitude={longitude}
            locationInfo={locationInfo}
            competitors={competitors}
            addLocationInfo={addLocationInfo}
            addCompetitors={addCompetitors}
          />
        )}
        { businessPlan && (
          <BuyerPersonaInfo
            businessIdea={businessIdea}
            locationInfo={locationInfo}
            buyerPersonas={buyerPersonas}
            addBuyerPersona={addBuyerPersona}
          />
        )}
        { businessPlan && (
          <GetBudgetInfo
            businessIdea={businessIdea}
            locationInfo={locationInfo}
            budget={budget}
            updateBudget={updateBudget}
          />
        )}
      </main>
    </QueryClientProvider>
  );
}
