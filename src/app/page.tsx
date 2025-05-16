'use client'
import { useState } from "react";
import GetPosition from "./GetPosition";
import UserForm from "./UserForm";
import { GetBusinessPlanData } from "./interface";
import ShowBusinessPlan from "./components/ShowBusinessPlan";

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
    </div>
  );
}
