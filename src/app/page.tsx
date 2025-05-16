'use client'
import { useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import GetPosition from "./GetPosition";
import UserForm from "./UserForm";
import { Emprende25LocalStorage, GeolocationInfo, GetBusinessPlanData } from "./interface";
import ShowBusinessPlan from "./components/ShowBusinessPlan";
import CompetitorsInfo from "./components/CompetitorsInfo";
import { getLocalStorageInfo } from "./utils/getLocalStorageInfo";

const queryClient = new QueryClient()

export default function Home() {
  const [businessIdea, setBusinessIdea] = useState("")
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [businessPlan, setBusinessPlan] = useState<GetBusinessPlanData | null>(null);
  const [locationInfo, setLocationInfo] = useState<GeolocationInfo | null>(null)
  console.log('locationInfo', locationInfo)

  const addBusinessPlan = (data: GetBusinessPlanData) => {
    setBusinessPlan(data);
  };
  const addLocationInfo = (data: GeolocationInfo) => setLocationInfo(data);
  const addLatitude = (lat: number) => setLatitude(lat);
  const addLongitude = (long: number) => setLongitude(long);
  const updateBusinessIdea = (idea: string) => setBusinessIdea(idea);
  const resetBusinessIdea = () => setBusinessIdea("");

  // Set local storage
  useEffect(() => {
    const localStorageInfo: Emprende25LocalStorage = getLocalStorageInfo();
    const IsEmptyLocalStorage = Object.keys(localStorageInfo).length < 1;

    if (IsEmptyLocalStorage) {
      return;
    }

    const { geoLocationCoords: { latitude, longitude } } = localStorageInfo;
    if (latitude && longitude) {
      addLatitude(Number(latitude))
      addLongitude(Number(longitude))
    }

  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <main className="max-w-7xl mx-auto min-h-screen flex flex-col gap-4 p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">Emprende 25+</h1>
        <p className="text-xl text-gray-900 dark:text-white text-pretty">Obten toda la información necesaria para comenzar con tu emprendimiento. Para ello, necesitamos contar con tu ubicación para ofrecerte información más precisa.</p>
        <GetPosition addLatitude={addLatitude} addLongitude={addLongitude} />
        <UserForm
          addBusinessPlan={addBusinessPlan}
          businessIdea={businessIdea}
          updateBusinessIdea={updateBusinessIdea}
          resetBusinessIdea={resetBusinessIdea}
          />
        { businessPlan && (
          <ShowBusinessPlan businessPlan={businessPlan} />
        )}
        { businessPlan && (
          <CompetitorsInfo
            latitude={latitude}
            longitude={longitude}
            locationInfo={locationInfo}
            addLocationInfo={addLocationInfo}
          />
        )}
      </main>
    </QueryClientProvider>
  );
}
