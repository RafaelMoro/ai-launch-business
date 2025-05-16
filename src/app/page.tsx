'use client'
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import GetPosition from "./GetPosition";
import UserForm from "./UserForm";
import { GetBusinessPlanData } from "./interface";
import ShowBusinessPlan from "./components/ShowBusinessPlan";
import CompetitorsInfo from "./components/CompetitorsInfo";

const queryClient = new QueryClient()

export default function Home() {
  const [businessIdea, setBusinessIdea] = useState("")
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [businessPlan, setBusinessPlan] = useState<GetBusinessPlanData | null>(null);

  const addBusinessPlan = (data: GetBusinessPlanData) => {
    setBusinessPlan(data);
  };
  const addLatitude = (lat: number) => setLatitude(lat);
  const addLongitude = (long: number) => setLongitude(long);
  const updateBusinessIdea = (idea: string) => setBusinessIdea(idea);
  const resetBusinessIdea = () => setBusinessIdea("");

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
          <CompetitorsInfo latitude={latitude} longitude={longitude} />
        )}
      </main>
    </QueryClientProvider>
  );
}
